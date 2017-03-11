import 'source-map-support/register';
import * as soundworks from 'soundworks/server';
import SharedExperience from './SharedExperience';
import score from './score';

import defaultConfig from './config/default';

let config = null;

switch(process.env.ENV) {
  default:
    config = defaultConfig;
    break;
}

// configure express environment ('production' enables cache system)
process.env.NODE_ENV = config.env;

config.appName = score.title;
// configure setup
const labels = Object.keys(score.parts);
config.setup.labels = labels;
config.setup.maxClientsPerPosition = 10;
// add the score to the configuration
config.score = score;

// initialize application with configuration options.
soundworks.server.init(config);

const sharedParams = soundworks.server.require('shared-params');
sharedParams.addText('numClients', 'Number Clients Ready', 0, 'conductor');
sharedParams.addEnum('transport', 'Transport', ['Start', 'Pause', 'Stop'], 'Stop', ['player', 'conductor']);
sharedParams.addText('currentSection', 'Current Section', '');

const sections = score.sections;

for (let key in sections) {
  const section = sections[key];
  const min = parseInt(section.time / 60, 10);
  const sec = section.time % 60;
  const label = `${section.label} - ${min}:${sec} (${section.time} sec)`;
  // send to 'dummy' client
  sharedParams.addTrigger(key, label, 'player');
}

// playback rate
sharedParams.addNumber('playbackRate', 'Playback Rate', 0.5, 1.5, 0.01, 1, 'player');
sharedParams.addNumber('volume', 'Volume', 0, 1, 0.01, 1, 'player');
sharedParams.addNumber('seek', 'Seek', 0, score.duration, 1, 0, 'player');
sharedParams.addTrigger('reload', 'reload', 'player');

// define the configuration object to be passed to the `.ejs` template
soundworks.server.setClientConfigDefinition((clientType, config, httpRequest) => {
  return {
    clientType: clientType,
    env: config.env,
    appName: config.appName,
    socketIO: config.socketIO,
    version: config.version,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain,
  };
});

// Create the experience activity.
const experience = new SharedExperience(['player', 'conductor']);
// Start the application.
soundworks.server.start();
