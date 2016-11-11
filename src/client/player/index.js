import * as soundworks from 'soundworks/client';
import PlayerExperience from './PlayerExperience.js';

// launch application when document is fully loaded
window.addEventListener('load', () => {
  const { appName, socketIO } = window.soundworksConfig;
  // initialize the 'player' client
  soundworks.client.init('player', { socketIO, appName });
  // create client side (player) experience
  const experience = new PlayerExperience();
  // start the client
  soundworks.client.start();
});
