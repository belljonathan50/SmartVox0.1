import * as soundworks from 'soundworks/client';
import viewContent from '../shared/viewContent';
import Conductor from './Conductor';

// launch application when document is fully loaded
window.addEventListener('load', () => {
  const config = window.soundworksConfig;
  soundworks.client.init(config.clientType, config);
  soundworks.client.setViewContentDefinitions(viewContent);
  soundworks.client.setViewTemplateDefinitions(viewTemplates);

  const conductor = new Conductor();
  // start the client
  soundworks.client.start();
});
