// Import Soundworks server side Experience
import { Experience } from 'soundworks/server';

/**
 * Server-side 'player' experience.
 */
export default class SharedExperience extends Experience {
  constructor(clientType, score) {
    super(clientType);

    this.score = score;

    this.placer = this.require('placer');
    this.sync = this.require('sync');
    this.syncScheduler = this.require('sync-scheduler');
    this.sharedParams = this.require('shared-params');

    this.players = new Set();

    this.currentTransportTime = 0;
    this.lastSyncTime = null;

    this.state = 'Stop';
    this.tickId = null;
    this.tickPeriod = 1000; // 1 second

    this.propagationDelay = 0.2; //

    this.tick = this.tick.bind(this);
    this.updateTransport = this.updateTransport.bind(this);
  }

  // update logical time every `this.tickPeriod`
  tick() {
    // update current time
    const syncTime = this.sync.getSyncTime();
    const triggerTime = syncTime + this.propagationDelay;
    const dt = syncTime - this.lastSyncTime;
    this.currentTransportTime += dt;

    // console.log('tick', this.currentTransportTime);
    this.broadcast('player', null, 'updateTime', this.currentTransportTime, triggerTime);

    this.lastSyncTime = syncTime;

    this.tickId = setTimeout(this.tick, this.tickPeriod);
  }

  updateTransport(value) {
    // prevent multiple calls
    if (this.state === value)
      return;

    this.state = value;

    const syncTime = this.sync.getSyncTime();

    switch (value) {
      case 'Start':
        // currentTransportTime shouln't be updated here
        this.lastSyncTime = syncTime;
        this.tickId = setTimeout(this.tick, this.tickPeriod);
        break;
      case 'Pause':
        clearTimeout(this.tickId);

        if (this.lastSyncTime) {
          const dt = syncTime - this.lastSyncTime;
          this.currentTransportTime += dt;
        }
        break;
      case 'Stop':
        clearTimeout(this.tickId);

        this.currentTransportTime = 0;
        this.lastSyncTime = null;
        break;
    }

    console.log(this.state, this.currentTransportTime);

    const triggerTime = syncTime + this.propagationDelay;
    this.broadcast('player', null, 'transport', value, this.currentTransportTime, triggerTime);
    // this.osc.send('/transport', [value.toLowerCase(), delay]);
  }

  pauseAndSetTransportTime(time) {
    clearTimeout(this.tickId);

    this.state = 'Pause';
    this.currentTransportTime = time;

    const triggerTime = this.sync.getSyncTime() + this.propagationDelay;
    this.broadcast('player', null, 'transport', 'Pause', this.currentTransportTime, triggerTime);
  }

  start() {
    this.sharedParams.addParamListener('transport', this.updateTransport);

    Object.keys(this.score.sections).forEach(sectionName => {
      this.sharedParams.addParamListener(sectionName, () => {
        this.pauseAndSetTransportTime(this.score.sections[sectionName].time);
      });
    });

    this.sharedParams.addParamListener('seek', value => {
      this.pauseAndSetTransportTime(value);
    });
  }

  enter(client) {
    super.enter(client);

    if (client.type === 'player') {
      this.receive(client, 'ready', () => {
        this.players.add(client);

        // send current state of the application to the new client
        let currentTransportTime = this.currentTransportTime;
        const syncTime = this.sync.getSyncTime();
        const triggerTime = syncTime + this.propagationDelay;

        // give a proper currentTime as we are probably between two ticks
        if (this.state === 'Start') {
          const dt = syncTime - this.lastSyncTime;
          currentTransportTime = currentTransportTime + dt;
        }

        console.log('connection', currentTransportTime, triggerTime);
        this.send(client, 'transport', this.state, currentTransportTime, triggerTime);

        // update controller
        this.sharedParams.update('numClients', this.players.size);
      });
    }
  }

  exit(client) {
    super.exit(client);

    if (client.type === 'player') {
      this.players.delete(client);
      this.sharedParams.update('numClients', this.players.size);
    }
  }
}
