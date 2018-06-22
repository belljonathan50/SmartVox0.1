import { Experience, View, client } from 'soundworks/client';

const template = `
  <div class="video-wrapper">
    <video id="video" controls></video>
  </div>
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
  constructor(score) {
    super();

    this.score = score;

    this.platform = this.require('platform', { features: [] });
    this.placer = this.require('placer');
    this.sharedParams = this.require('shared-params');
    this.syncScheduler = this.require('sync-scheduler');
    this.videoLoader = this.require('video-loader');

    this.onTransportChange = this.onTransportChange.bind(this);
    this.onUpdateTime = this.onUpdateTime.bind(this);

    this.updateLabel = this.updateLabel.bind(this);
    this.onFirstPlay = this.onFirstPlay.bind(this);
    this.reload = this.reload.bind(this);

    this.isEnv = false;
    this.isReady = false; // don't listen controls if not ready
  }

  start() {
    super.start();

    this.part = this.score.parts[client.label];

    if (this.part.type === 'env')
      this.isEnv = true;

    // initialize the view
    const model = {
      sectionLabel: `<span class="orange soft-blink">start the video and wait for the beginning</span>`,
      part: client.label,
      isEnv: this.isEnv,
    };

    const events = {
      'touchstart #reload': () => this.reload(true),
    };

    this.view = new View(template, model, events, {});

    Promise.all([this.show(), this.videoLoader.load(this.part.file)])
      .then(([empty, objectUrl]) => {

        this.$video = this.view.$el.querySelector('#video');
        this.$video.src = objectUrl;

        this.receive('transport', this.onTransportChange);
        this.receive('updateTime', this.onUpdateTime);

        // this.sharedParams.addParamListener('playbackRate', (value) => this.$video.playbackRate = value);
        // this.sharedParams.addParamListener('seek', (value) => this.$video.currentTime = value);
        this.sharedParams.addParamListener('reload', () => this.reload(false));

        if (this.part.type !== 'env')
          this.sharedParams.addParamListener('volume:performers', (value) => this.$video.volume = value);
        else
          this.sharedParams.addParamListener(`volume:env:${client.label}`, (value) => this.$video.volume = value);

        // update label according to video current time
        this.$video.addEventListener('timeupdate', this.updateLabel);
        this.$video.addEventListener('play', this.onFirstPlay);
      });
  }

  // @todo - remove that, use platform hook...
  onFirstPlay() {
    setTimeout(() => {
      this.$video.pause()

      // remove controls
      this.$video.removeAttribute('controls');

      if (!this.isEnv)
        alert('click "ok" and wait for the beginning...');

      this.isReady = true; // don't listen controls if not ready
      // feedback for the controller
      this.send('ready');
      this.$video.removeEventListener('play', this.onFirstPlay);
    }, 0);
  }

  onTransportChange(state, transportTime, triggerSyncTime) {
    if (!this.isReady)
      return;

    // console.log(state, transportTime, triggerSyncTime);
    const currentSyncTime = this.syncScheduler.currentTime;

    // message received to late execute now and compensate if state is Start
    if (triggerSyncTime < currentSyncTime) {
      if (state === 'Start' ) {
        const decay = currentSyncTime - triggerSyncTime;

        this.$video.currentTime = transportTime + decay;
        this.$video.play();
      } else {
        this.$video.pause();
        this.$video.currentTime = transportTime;
      }

    } else {
      // defer execution to triggerSyncTime
      this.syncScheduler.defer(() => {
        if (state === 'Start') {
          this.$video.currentTime = transportTime;
          this.$video.play();
        } else {
          this.$video.pause();
          this.$video.currentTime = transportTime;
        }
      }, triggerSyncTime);
    }
  }

  // this is triggered every tickPeriod by the server to maintain every client
  // into an acceptable state, or recover if a problem occured
  onUpdateTime(transportTime, triggerSyncTime) {
    if (!this.isReady)
      return;

    // console.log(transportTime, triggerSyncTime);
    const syncTime = this.syncScheduler.currentTime;

    // just wait for the next message if received too late
    if (triggerSyncTime > syncTime) {
      this.syncScheduler.defer(() => {
        const videoCurrentTime = this.$video.currentTime;
        const jit = Math.abs(transportTime - videoCurrentTime);
        // we assume a large possible jitter as we have no f****** idea of the
        // video clock resolution... this should be explored
        if (jit > 0.5) {
          this.$video.currentTime = transportTime;
        }
      }, triggerSyncTime);
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
    if (this.isEnv)
      return;

    const sections = this.score.sections;

    const currentTime = this.$video.currentTime;
    const names = Object.keys(sections);
    let label = null;

    for (let i = 0; i < names.length; i++) {
      const section = sections[names[i]];
      const next = sections[names[i + 1]];

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

    if (this.view.model.sectionLabel !== label) {
      this.view.model.sectionLabel = label;
      this.view.render('#section-label');
    }
  }
}

export default PlayerExperience;
