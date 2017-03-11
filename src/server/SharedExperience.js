// Import Soundworks server side Experience
import { Experience } from 'soundworks/server';

/**
 * Server-side 'player' experience.
 */
export default class SharedExperience extends Experience {
  constructor(clientType) {
    super(clientType);

    this.placer = this.require('placer');
    this.sync = this.require('sync');
    // this.osc = this.require('osc');
    this.sharedParams = this.require('shared-params');

    this.sharedConfig = this.require('shared-config');
    this.sharedConfig.share('score', 'player');
    this.sharedConfig.share('score', 'conductor');

    // configure conductor
    this.players = new Set();

    this.currentTime = 0;
    this.startTime = null;
  }

  start() {
    const sections = this.sharedConfig.get('score.sections');
    const delay = this.sharedConfig.get('conductorDelay');
    // added delay between a trigger and its execution
    // listen sections
    Object.keys(sections).forEach((sectionName) => {
      let calledOnce = false;

      this.sharedParams.addParamListener(sectionName, () => {
        // ignore trigger when listener added - bug to be fixed in soundworks
        if (!calledOnce) {
          calledOnce = true;
          return;
        }

        this.currentTime = sections[sectionName].time;
        this.broadcast('player', null, 'section', this.currentTime);
        console.log(sectionName, this.currentTime);
        // this.osc.send('/section', [this.currentTime]);
      });
    });

    this.sharedParams.addParamListener('transport', (value) => {
      const syncTime = this.sync.getSyncTime();

      switch (value) {
        case 'Start':
          this.startTime = syncTime;
          break;
        case 'Pause':
          if (!this.startTime) {
            this.currentTime = 0;
          } else {
            const dt = syncTime - this.startTime;
            this.currentTime += dt;
          }
          break;
        case 'Stop':
          this.currentTime = 0;
          this.startTime = null;
          break;
      }

      console.log(value, this.currentTime);
      const triggerTime = syncTime + delay;
      this.broadcast('player', null, 'transport', value, this.currentTime, triggerTime);
      // this.osc.send('/transport', [value.toLowerCase(), delay]);
    });
  }

  enter(client) {
    super.enter(client);

    if (client.type === 'player') {
      this.receive(client, 'ready', () => {
        this.players.add(client);
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
