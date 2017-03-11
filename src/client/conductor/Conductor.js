import * as soundworks from 'soundworks/client';

class Conductor extends soundworks.BasicSharedController {
  constructor() {
    super();

    this.sharedConfig = this.require('shared-config');

    this.setGuiOptions('transport', { type: 'buttons' });
    this.setGuiOptions('playbackRate', { type: 'slider', size: 'large' });
    this.setGuiOptions('volume:performers', { type: 'slider', size: 'large' });
    this.setGuiOptions('volume:env', { type: 'slider', size: 'large' });
    this.setGuiOptions('seek', { type: 'slider', size: 'large' });
    this.setGuiOptions('reload', { confirm: true });
  }

  start() {
    super.start();

    const score = this.sharedConfig.get('score');

    // update current section name and trigger pause feedback
    for (let sectionName in score.sections) {
      this.sharedParams.addParamListener(sectionName, (value) => {
        this.sharedParams.update('currentSection', sectionName, false);
        // pause players on section changes
        this.sharedParams.update('seek', score.sections[sectionName].time, false);
        this.sharedParams.update('transport', 'Pause', false);
      });
    }

    // handle volumes
    this.sharedParams.addParamListener('volume:env', (value) => {
      for (let name in score.parts) {
        if (score.parts[name].type === 'env')
          this.sharedParams.update(`volume:env:${name}`, value);
      }
    });
  }
}

export default Conductor;
