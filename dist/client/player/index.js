'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

var _serviceViews = require('../shared/serviceViews');

var _serviceViews2 = _interopRequireDefault(_serviceViews);

var _PlayerExperience = require('./PlayerExperience');

var _PlayerExperience2 = _interopRequireDefault(_PlayerExperience);

var _VideoLoader = require('../shared/services/VideoLoader');

var _VideoLoader2 = _interopRequireDefault(_VideoLoader);

var _score = require('../../shared/score');

var _score2 = _interopRequireDefault(_score);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  var config = (0, _assign2.default)({
    appContainer: '#container'
  }, window.soundworksConfig);

  soundworks.client.init(config.clientType, config);
  soundworks.client.setServiceInstanciationHook(function (id, instance) {
    if (_serviceViews2.default.has(id)) instance.view = _serviceViews2.default.get(id, config);
  });

  var experience = new _PlayerExperience2.default(_score2.default);
  soundworks.client.start();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNvdW5kd29ya3MiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiY29uZmlnIiwiYXBwQ29udGFpbmVyIiwic291bmR3b3Jrc0NvbmZpZyIsImNsaWVudCIsImluaXQiLCJjbGllbnRUeXBlIiwic2V0U2VydmljZUluc3RhbmNpYXRpb25Ib29rIiwiaWQiLCJpbnN0YW5jZSIsImhhcyIsInZpZXciLCJnZXQiLCJleHBlcmllbmNlIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztJQUFZQSxVOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBQyxPQUFPQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFNO0FBQ3BDLE1BQU1DLFNBQVMsc0JBQWM7QUFDM0JDLGtCQUFjO0FBRGEsR0FBZCxFQUVaSCxPQUFPSSxnQkFGSyxDQUFmOztBQUlBTCxhQUFXTSxNQUFYLENBQWtCQyxJQUFsQixDQUF1QkosT0FBT0ssVUFBOUIsRUFBMENMLE1BQTFDO0FBQ0FILGFBQVdNLE1BQVgsQ0FBa0JHLDJCQUFsQixDQUE4QyxVQUFDQyxFQUFELEVBQUtDLFFBQUwsRUFBa0I7QUFDOUQsUUFBSSx1QkFBYUMsR0FBYixDQUFpQkYsRUFBakIsQ0FBSixFQUNFQyxTQUFTRSxJQUFULEdBQWdCLHVCQUFhQyxHQUFiLENBQWlCSixFQUFqQixFQUFxQlAsTUFBckIsQ0FBaEI7QUFDSCxHQUhEOztBQUtBLE1BQU1ZLGFBQWEsK0NBQW5CO0FBQ0FmLGFBQVdNLE1BQVgsQ0FBa0JVLEtBQWxCO0FBQ0QsQ0FiRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHNvdW5kd29ya3MgZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuaW1wb3J0IHNlcnZpY2VWaWV3cyBmcm9tICcuLi9zaGFyZWQvc2VydmljZVZpZXdzJztcbmltcG9ydCBQbGF5ZXJFeHBlcmllbmNlIGZyb20gJy4vUGxheWVyRXhwZXJpZW5jZSc7XG5pbXBvcnQgVmlkZW9Mb2FkZXIgZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL1ZpZGVvTG9hZGVyJztcbmltcG9ydCBzY29yZSBmcm9tICcuLi8uLi9zaGFyZWQvc2NvcmUnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgYXBwQ29udGFpbmVyOiAnI2NvbnRhaW5lcidcbiAgfSwgd2luZG93LnNvdW5kd29ya3NDb25maWcpO1xuXG4gIHNvdW5kd29ya3MuY2xpZW50LmluaXQoY29uZmlnLmNsaWVudFR5cGUsIGNvbmZpZyk7XG4gIHNvdW5kd29ya3MuY2xpZW50LnNldFNlcnZpY2VJbnN0YW5jaWF0aW9uSG9vaygoaWQsIGluc3RhbmNlKSA9PiB7XG4gICAgaWYgKHNlcnZpY2VWaWV3cy5oYXMoaWQpKVxuICAgICAgaW5zdGFuY2UudmlldyA9IHNlcnZpY2VWaWV3cy5nZXQoaWQsIGNvbmZpZyk7XG4gIH0pO1xuXG4gIGNvbnN0IGV4cGVyaWVuY2UgPSBuZXcgUGxheWVyRXhwZXJpZW5jZShzY29yZSk7XG4gIHNvdW5kd29ya3MuY2xpZW50LnN0YXJ0KCk7XG59KTtcbiJdfQ==