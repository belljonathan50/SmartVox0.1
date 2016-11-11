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
    this.osc = this.require('osc');

    this.sharedConfig = this.require('shared-config');
    this.sharedConfig.share('score', 'player');
    this.sharedConfig.share('score.sections', 'conductor');

    const duration = this.sharedConfig.get('score.duration');
    // configure conductor
    this.sharedParams = this.require('shared-params');
    this.sharedParams.addText('numClients', 'Number Clients Ready', 0, 'conductor');
    this.sharedParams.addEnum('transport', 'Transport', ['Start', 'Pause', 'Stop'], 'Stop', ['player', 'conductor']);
    this.sharedParams.addText('currentSection', 'Current Section', '');

    const sections = this.sharedConfig.get('score.sections');

    for (let key in sections) {
      const section = sections[key];
      const min = parseInt(section.time / 60);
      const sec = section.time % 60;
      const label = `${section.label} - ${min}:${sec} (${section.time} sec)`;
      // send to 'dummy' client
      this.sharedParams.addTrigger(key, label, 'player');
    }

    // playback rate
    this.sharedParams.addNumber('playbackRate', 'Playback Rate', 0.5, 1.5, 0.01, 1, 'player');
    this.sharedParams.addNumber('volume', 'Volume', 0, 1, 0.01, 1, 'player');
    this.sharedParams.addNumber('seek', 'Seek', 0, duration, 1, 0, 'player');

    this.sharedParams.addTrigger('reload', 'reload', 'player');
    this.players = new Set();

    this.currentTime = 0;
    this.startTime = null;
  }

  start() {
    const sections = this.sharedConfig.get('score.sections');
    // added delay between a trigger and its execution
    const delay = this.sharedConfig.get('delay');
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
        this.osc.send('/section', [this.currentTime]);
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

      this.osc.send('/transport', [value.toLowerCase(), delay]);
    });
  }

  /**
   * If anything needs to happen when a client enters the performance (*i.e.*
   * starts the experience on the client side), write it in the `enter`
   * method.
   */
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
