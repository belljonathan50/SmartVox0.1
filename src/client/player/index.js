import * as soundworks from 'soundworks/client';
import serviceViews from '../shared/serviceViews';
import PlayerExperience from './PlayerExperience';
import VideoLoader from '../shared/services/VideoLoader';
import score from '../../shared/score';

window.addEventListener('load', () => {
  const config = Object.assign({
    appContainer: '#container'
  }, window.soundworksConfig);

  soundworks.client.init(config.clientType, config);
  soundworks.client.setServiceInstanciationHook((id, instance) => {
    if (serviceViews.has(id))
      instance.view = serviceViews.get(id, config);
  });

  const experience = new PlayerExperience(score);
  soundworks.client.start();
});
