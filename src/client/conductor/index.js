import * as soundworks from 'soundworks/client';
import viewTemplates from '../shared/viewTemplates';
import viewContent from '../shared/viewContent';
import Conductor from './Conductor';

window.addEventListener('load', () => {
  const config = window.soundworksConfig;
  soundworks.client.init(config.clientType, config);
  soundworks.client.setViewContentDefinitions(viewContent);
  soundworks.client.setViewTemplateDefinitions(viewTemplates);

  const conductor = new Conductor();
  soundworks.client.start();
});
