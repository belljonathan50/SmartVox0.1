import 'source-map-support/register';
import * as soundworks from 'soundworks/server';
import SharedExperience from './SharedExperience';
import score from '../shared/score';
import fs from 'fs';
import path from 'path';

const configName = process.env.ENV || 'default';
const configPath = path.join(__dirname, 'config', configName);

let config;

try {
  config = require(configPath).default;
} catch(err) {
  console.error(`Invalid ENV "${configName}", file "${configPath}.js" not found`);
  console.error(err.stack);
  process.exit(1);
}

if (process.env.PORT)
  config.port = process.env.PORT;

// configure express environment ('production' enables cache system)
process.env.NODE_ENV = config.env;

config.appName = score.title;
// configure setup
const labels = Object.keys(score.parts);
config.setup.labels = labels;

// initialize application with configuration options.
soundworks.server.init(config);

const sharedParams = soundworks.server.require('shared-params');

sharedParams.addText('numClients', 'Number Clients Ready', 0, ['conductor']);
sharedParams.addEnum('transport', 'Transport', ['Start', 'Pause', 'Stop'], 'Stop', ['conductor']);
sharedParams.addText('currentSection', 'Current Section', '');

for (let key in score.sections) {
  const section = score.sections[key];
  const min = parseInt(section.time / 60, 10);
  const sec = section.time % 60;
  const label = `${section.label} - ${min}:${sec} (${section.time} sec)`;
  // send to 'dummy' client
  sharedParams.addTrigger(key, label, ['conductor']);
}

sharedParams.addNumber('seek', 'Seek', 0, score.duration, 1, 0, ['conductor']);
// sharedParams.addNumber('playbackRate', 'Playback Rate', 0.5, 1.5, 0.01, 1, null);
// volumes
sharedParams.addNumber('volume:performers', 'Volume performers', 0, 1, 0.01, 1, null);
sharedParams.addNumber('volume:env', 'Volume environments', 0, 1, 0.01, 1, null);

for (let name in score.parts) {
  if (score.parts[name].type === 'env')
    sharedParams.addNumber(`volume:env:${name}`, `Volume ${name}`, 0, 1, 0.01, 1, null);
}

sharedParams.addTrigger('reload', 'reload', 'player');

// define the configuration object to be passed to the `.ejs` template
soundworks.server.setClientConfigDefinition((clientType, config, httpRequest) => {
  return {
    clientType: clientType,
    env: config.env,
    appName: config.appName,
    websockets: config.websockets,
    version: config.version,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain
  };
});

// Create the experience activity.
const experience = new SharedExperience(['player', 'conductor'], score);
// Start the application.
soundworks.server.start();
