import { Service, serviceManager, SegmentedView } from 'soundworks/client';

const SERVICE_ID = 'service:video-loader';

const template = `
  <div class="section-top"></div>
  <div class="section-center flex-center">
    <% if (state === 'loading') { %>
      <p>Loading video...</p>
    <% } else if (state === 'error') { %>
      <p class="red">Error loading: <%= src %></p>
    <% } %>
  </div>
  <div class="section-bottom"></div>
`;

class VideoLoader extends Service {
  constructor() {
    super(SERVICE_ID, false);

    const defaults = {
      src: null,
    };

    this.configure(defaults);
  }

  init() {
    this.viewTemplate = template;
    this.viewContent = { state: 'loading' };
    this.viewCtor = SegmentedView;
    this.viewOptions = {};

    this.view = this.createView();
  }

  start() {
    super.start();

    if (!this.hasStarted)
      this.init();

    this.ready();
  }

  load(src) {
    this.show();

    this.view.content.state = 'loading';
    this.view.render('.section-center');

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (e) => {
        const res = e.currentTarget;

        if (res.status === 200) {
          resolve(window.URL.createObjectURL(res.response));
          this.hide();
        } else {
          this.view.content.state = 'error';
          this.view.content.src = new String(src);
          this.view.render('.section-center');
        }
      };

      xhr.open('GET', src, true);
      xhr.send();
    });
  }
}

serviceManager.register(SERVICE_ID, VideoLoader);

export default VideoLoader;
