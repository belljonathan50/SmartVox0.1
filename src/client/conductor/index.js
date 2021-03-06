import * as soundworks from 'soundworks/client';
import serviceViews from '../shared/serviceViews';
import Conductor from './Conductor';
import score from '../../shared/score';

window.addEventListener('load', () => {
  document.body.classList.remove('loading');

  const config = Object.assign({
    appContainer: '#container'
  }, window.soundworksConfig);

  soundworks.client.init(config.clientType, config);
  soundworks.client.setServiceInstanciationHook((id, instance) => {
    if (serviceViews.has(id))
      instance.view = serviceViews.get(id, config);
  });

  const conductor = new Conductor(score);
  soundworks.client.start();
});
