import * as soundworks from 'soundworks/client';

class Conductor extends soundworks.ControllerExperience {
  constructor(score) {
    super();

    this.score = score;

    this.setGuiOptions('transport', { type: 'buttons' });
    this.setGuiOptions('playbackRate', { type: 'slider', size: 'large' });
    this.setGuiOptions('volume:performers', { type: 'slider', size: 'large' });
    this.setGuiOptions('volume:env', { type: 'slider', size: 'large' });
    this.setGuiOptions('seek', { type: 'slider', size: 'large' });
    this.setGuiOptions('reload', { confirm: true });

    for (let name in score.parts) {
      if (score.parts[name].type === 'env')
        this.setGuiOptions(`volume:env:${name}`, { type: 'slider', size: 'large' });
    }
  }

  start() {
    super.start();

    const score = this.score;

    // update current section name and trigger pause feedback
    for (let sectionName in score.sections) {
      this.sharedParams.addParamListener(sectionName, (value) => {
        console.log(sectionName, value);
        this.sharedParams.update('currentSection', sectionName, false);
        // pause players on section changes
        this.sharedParams.update('seek', score.sections[sectionName].time, false);
        this.sharedParams.update('transport', 'Pause', false);
      });
    }

    this.sharedParams.addParamListener('seek', value => {
      this.sharedParams.update('transport', 'Pause', false);
    });

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
