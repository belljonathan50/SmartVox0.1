class Conductor extends soundworks.BasicSharedController {
  constructor() {
    super();

    this.setGuiOptions('transport', { type: 'buttons' });
    this.setGuiOptions('playbackRate', { type: 'slider', size: 'large' });
    this.setGuiOptions('volume', { type: 'slider', size: 'large' });
    this.setGuiOptions('seek', { type: 'slider', size: 'large' });
    this.setGuiOptions('reload', { confirm: true });

    this.sharedConfig = this.require('shared-config');
  }

  start() {
    super.start();

    const sections = Object.keys(this.sharedConfig.get('score.sections'));

    // update current section name and trigger pause feedback
    sections.forEach((name) => {
      this._sharedParams.addParamListener(name, (value) => {
        this._sharedParams.update('currentSection', name, false);
        // @note - not working should be fixed in basic-controllers
        // this._sharedParams.update('transport', 'Pause');
      });
    });
  }
}
