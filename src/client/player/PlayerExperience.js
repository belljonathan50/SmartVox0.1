import { Experience, View, client } from 'soundworks/client';

const viewTemplate = `
  <div class="video-wrapper">
    <video id="video" controls></video>
  <div>
  <% if (!isEnv) { %>
  <button class="btn" id="reload">Reload</button>
  <p id="infos">
    <span id="part"><%= part %></span>
    &nbsp;-&nbsp;
    <span id="section-label"><%= sectionLabel %></span>
  </p>
  <% } %>
`;


class PlayerExperience extends Experience {
  constructor(score, fullScreen) {
    super();

    const features = fullScreen ? ['full-screen'] : [];
    this.platform = this.require('platform', { features });
    this.placer = this.require('placer');
    this.sharedParams = this.require('shared-params');
    this.sharedConfig = this.require('shared-config');
    this.sync = this.require('sync');
    this.scheduler = this.require('scheduler');
    this.videoLoader = this.require('video-loader');

    this.onVideoLoaded = this.onVideoLoaded.bind(this);
    this.onSectionChange = this.onSectionChange.bind(this);
    this.onTransportChange = this.onTransportChange.bind(this);
    this.updateLabel = this.updateLabel.bind(this);
    this.onFirstPlay = this.onFirstPlay.bind(this);
    this.reload = this.reload.bind(this);

    this.isEnv = false;
    this.isReady = false; // don't listen controls if not ready
  }

  init() {
    const score = this.sharedConfig.get('score');
    this.part = score.parts[client.label];
    this.sections = score.sections;

    if (this.part.type === 'env')
      this.isEnv = true;

    this.videoLoader
      .load(this.part.file)
      .then(this.onVideoLoaded);

    // initialize the view
    this.viewTemplate = viewTemplate;
    this.viewContent = {
      sectionLabel: `<span class="orange soft-blink">start the video and wait for the beginning</span>`,
      part: client.label,
      isEnv: this.isEnv,
    };
    this.viewEvents = {
      'touchstart #reload': () => this.reload(true),
    },
    this.viewCtor = View;
    this.view = this.createView();
  }

  onVideoLoaded(objectUrl) {
    this.$video.src = objectUrl;
  }

  start() {
    super.start();

    if (!this.hasStarted)
      this.init();

    this.show();

    this.$video = this.view.$el.querySelector('#video');

    this.receive('transport', this.onTransportChange);
    this.receive('section', this.onSectionChange);

    this.sharedParams.addParamListener('playbackRate', (value) => this.$video.playbackRate = value);
    this.sharedParams.addParamListener('seek', (value) => this.$video.currentTime = value);
    this.sharedParams.addParamListener('reload', () => this.reload(false));

    if (this.part.type !== 'env')
      this.sharedParams.addParamListener('volume:performers', (value) => this.$video.volume = value);
    else
      this.sharedParams.addParamListener(`volume:env:${client.label}`, (value) => this.$video.volume = value);

    // update label according to video current time
    this.$video.addEventListener('timeupdate', this.updateLabel);
    this.$video.addEventListener('play', this.onFirstPlay);
  }

  onFirstPlay() {
    this.$video.pause();
    // remove controls
    this.$video.removeAttribute('controls');

    if (!this.isEnv)
      alert('click "ok" and wait for the beggining...');

    this.isReady = true; // don't listen controls if not ready
    // feedback for the controller
    this.send('ready');
    this.$video.removeEventListener('play', this.onFirstPlay);
  }

  onSectionChange(time) {
    if (!this.$video.paused)
      this.$video.pause();

    this.$video.currentTime = time;
  }

  onTransportChange(value, time, triggerSyncTime) {
    if (!this.isReady) return;

    let currentSyncTime = this.sync.getSyncTime();

    if (value === 'Stop' || value === 'Pause') {
      this.$video.pause();
      this.$video.currentTime = time;
    } else if (value === 'Start') {
      if (triggerSyncTime < currentSyncTime) {
        const decay = currentSyncTime - triggerSyncTime;
        const startTime = time + decay;

        this.$video.currentTime = time + decay;
        this.$video.play();
      } else {
        this.scheduler.defer(() => this.$video.play(), triggerSyncTime);
      }
    }
  }

  reload(confirm = false) {
    if (confirm === true) {
      const isConfirmed = window.confirm('are you sure you want to reload?');
      if (!isConfirmed) return;
    }

    window.location.reload();
  }

  updateLabel() {
    if (this.isEnv) return;

    const currentTime = this.$video.currentTime;
    const names = Object.keys(this.sections);
    let label = null;

    for (let i = 0; i < names.length; i++) {
      const section = this.sections[names[i]];
      const next = this.sections[names[i + 1]];

      if (next) {
        if (!label && currentTime >= section.time && currentTime < next.time) {
          label = section.label;
          break;
        }
      } else {
        if (!label && currentTime >= section.time)
          label = section.label;
      }
    };

    if (this.view.content.sectionLabel !== label) {
      this.view.content.sectionLabel = label;
      this.view.render('#section-label');
    }
  }
}

export default PlayerExperience;
