// Enable sourceMaps in node
import 'source-map-support/register';

// Import Soundworks library (server side) and server side experience
import * as soundworks from 'soundworks/server';
import SharedExperience from './SharedExperience';

const title = 'Smart Vox';
const videoDuration = 20 * 60; // in seconds
const delay = 2; // in seconds

const osc = {
  sendAddress: '127.0.0.1', // change to the ip address of the computer running max
  sendPort: 57120,
};

// score definition
const score = {
  duration: videoDuration,
  parts: {
    // singers
    'soprano-1': {
      file: 'videos/soprano-1.mp4',
    },
    'soprano-2': {
      file: 'videos/soprano-2.mp4',
    },
    'mezzo': {
      file: 'videos/mezzo.mp4',
    },
    'alto': {
      file: 'videos/alto.mp4',
    },
    // env
    'env-1': {
      file: 'videos/env-1.mp4',
    },
    'env-2': {
      file: 'videos/env-2.mp4',
    },
    'env-3': {
      file: 'videos/env-3.mp4',
    },
    'env-4': {
      file: 'videos/env-4.mp4',
    },
  },
  sections: {
    alpha: {
      time: 0,
      label: 'Au commencement',
    },
    beta: {
      time: 117,
      label: 'Ohné lui',
    },
    gamma: {
      time: 270,
      label: `C'est un soir`,
    },
    delta: {
      time: 405,
      label: 'La glebe',
    },
    epsilon: {
      time: 495,
      label: 'Je sur nous',
    },
    dzeta: {
      time: 600,
      label: 'Plafond du ciel',
    },
    eta: {
      time: 660,
      label: 'Ce que ce que',
    },
    theta: {
      time: 765,
      label: 'Commencement fin',
    },
    iota: {
      time: 850,
      label: 'Les choses sont',
    },
    kappa: {
      time: 945,
      label: 'Je suis avec toi',
    },
  },
};

// define labels from
const labels = Object.keys(score.parts);

// Initialize application with configuration options.
soundworks.server.init({
  appName: title,
  setup: { labels, maxClientsPerPosition: 10 },
  score: score,
  delay: delay,
  osc: osc,
});

// define the configuration object to be passed to the `.ejs` template
soundworks.server.setClientConfigDefinition((clientType, config, httpRequest) => {
  return {
    clientType: clientType,
    socketIO: config.socketIO,
    appName: config.appName,
    version: config.version,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain,
  };
});

// Create the experience activity.
const experience = new SharedExperience(['player', 'conductor']);
// Start the application.
soundworks.server.start();
