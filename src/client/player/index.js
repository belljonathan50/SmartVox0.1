import * as soundworks from 'soundworks/client';
import viewTemplates from '../shared/viewTemplates';
import viewContent from '../shared/viewContent';
import PlayerExperience from './PlayerExperience';
import VideoLoader from '../shared/services/VideoLoader';

window.addEventListener('load', () => {
  const config = window.soundworksConfig;
  soundworks.client.init(config.clientType, config);
  soundworks.client.setViewContentDefinitions(viewContent);
  soundworks.client.setViewTemplateDefinitions(viewTemplates);

  const experience = new PlayerExperience(config.fullScreen);
  soundworks.client.start();
});
