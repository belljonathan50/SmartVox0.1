import { Experience, View, client } from 'soundworks/client';

const viewTemplate = `
  <div class="video-wrapper">
    <video id="video" controls></video>
  <div>
  <button class="btn" id="reload">Reload</button>
  <p id="infos">
    <span id="part"><%= part %></span>
    &nbsp;-&nbsp;
    <span id="section-label"><%= sectionLabel %></span>
  </p>
`;


export default class PlayerExperience extends Experience {
  constructor() {
    super();

    this.platform = this.require('platform', {
      // features: ['full-screen'],
    });

    this.placer = this.require('placer');
    this.sharedConfig = this.require('shared-config');
    this.sharedParams = this.require('shared-params');
    this.sync = this.require('sync');
    this.scheduler = this.require('scheduler');

    this.onVideoLoaded = this.onVideoLoaded.bind(this);
    this.onSectionChange = this.onSectionChange.bind(this);
    this.onTransportChange = this.onTransportChange.bind(this);
    this.updateLabel = this.updateLabel.bind(this);
    this.onFirstPlay = this.onFirstPlay.bind(this);
    this.reload = this.reload.bind(this);
  }

  init() {
    // initialize the view
    this.viewTemplate = viewTemplate;
    this.viewContent = {
      sectionLabel: `loading`,
      part: client.label,
    };
    this.viewEvents = {
      'touchstart #reload': () => { this.reload(true); },
    },
    this.viewCtor = View;
    this.view = this.createView();

    this.isEnv = false;
    this.isReady = false; // don't listen controls if not ready
  }

  start() {
    super.start();

    if (!this.hasStarted)
      this.init();

    this.show();

    this.score = this.sharedConfig.get('score');
    this.parts = this.score.parts;
    this.sections = this.score.sections;

    this.videoSrc = this.score.parts[client.label].file;
    this.$video = this.view.$el.querySelector('#video');

    // if client type start by 'env-' remove label
    if (/^env-/.test(client.label)) {
      this.view.$el.classList.add('env');
      this.isEnv = true;
    }

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = this.onVideoLoaded;
    xhr.open('GET', this.videoSrc, true);
    xhr.send();

    this.receive('transport', this.onTransportChange);
    this.receive('section', this.onSectionChange);

    // playback rate
    this.sharedParams.addParamListener('playbackRate', (value) => {
      this.$video.playbackRate = value;
    });

    // volume
    this.sharedParams.addParamListener('volume', (value) => {
      this.$video.volume = value;
    });

    // seek
    this.sharedParams.addParamListener('seek', (value) => {
      this.$video.currentTime = value;
    });

    // reload
    this.sharedParams.addParamListener('reload', () => {
      this.reload(false);
    });

    // update label according to video current time
    this.$video.addEventListener('timeupdate', this.updateLabel);
    this.$video.addEventListener('play', this.onFirstPlay);
  }

  onVideoLoaded(e) {
    const res = e.currentTarget;

    if (res.status === 200) {
      this.$video.src = window.URL.createObjectURL(res.response);

      this.view.content.sectionLabel = '<span class="red soft-blink">start the video</span>';
      this.view.render('#section-label');
    }
  }

  onFirstPlay() {
    this.$video.pause();
    // remove controls
    this.$video.removeAttribute('controls');

    if (!this.isEnv)
      alert('click "ok" and wait...');

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
    if (!this.isReady) { return; }

    let currentSyncTime = this.sync.getSyncTime();
    // test for message received too late ('Start')
    // currentSyncTime += (2 + 2*Math.random());

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
        this.scheduler.defer(() => {
            this.$video.play();
        }, triggerSyncTime);
      }
    }
  }

  reload(confirm = false) {
    if (confirm === true) {
      const isConfirmed = window.confirm('are you sure you want to reload?');
      if (!isConfirmed) { return }
    }

    window.location.reload();
  }

  updateLabel() {
    const currentTime = this.$video.currentTime;
    const keys = Object.keys(this.sections);
    let label = null;

    keys.forEach((name, index) => {
      const section = this.sections[name];
      const next = this.sections[keys[index + 1]];

      if (next) {
        if (!label && currentTime >= section.time && currentTime < next.time)
          label = section.label;
      } else {
        if (!label && currentTime >= section.time)
          label = section.label;
      }
    });

    this.view.content.sectionLabel = label;
    this.view.render('#section-label');
  }
}

