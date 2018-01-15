'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _server = require('soundworks/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Server-side 'player' experience.
 */
var SharedExperience = function (_Experience) {
  (0, _inherits3.default)(SharedExperience, _Experience);

  function SharedExperience(clientType, score) {
    (0, _classCallCheck3.default)(this, SharedExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SharedExperience.__proto__ || (0, _getPrototypeOf2.default)(SharedExperience)).call(this, clientType));

    _this.score = score;

    _this.placer = _this.require('placer');
    _this.sync = _this.require('sync');
    _this.syncScheduler = _this.require('sync-scheduler');
    _this.sharedParams = _this.require('shared-params');

    _this.players = new _set2.default();

    _this.currentTransportTime = 0;
    _this.lastSyncTime = null;

    _this.state = 'Stop';
    _this.tickId = null;
    _this.tickPeriod = 1000; // 1 second

    _this.propagationDelay = 0.2; //

    _this.tick = _this.tick.bind(_this);
    _this.updateTransport = _this.updateTransport.bind(_this);
    return _this;
  }

  // update logical time every `this.tickPeriod`


  (0, _createClass3.default)(SharedExperience, [{
    key: 'tick',
    value: function tick() {
      // update current time
      var syncTime = this.sync.getSyncTime();
      var triggerTime = syncTime + this.propagationDelay;
      var dt = syncTime - this.lastSyncTime;
      this.currentTransportTime += dt;

      // console.log('tick', this.currentTransportTime);
      this.broadcast('player', null, 'updateTime', this.currentTransportTime, triggerTime);

      this.lastSyncTime = syncTime;

      this.tickId = setTimeout(this.tick, this.tickPeriod);
    }
  }, {
    key: 'updateTransport',
    value: function updateTransport(value) {
      // prevent multiple calls
      if (this.state === value) return;

      this.state = value;

      var syncTime = this.sync.getSyncTime();

      switch (value) {
        case 'Start':
          // currentTransportTime shouln't be updated here
          this.lastSyncTime = syncTime;
          this.tickId = setTimeout(this.tick, this.tickPeriod);
          break;
        case 'Pause':
          clearTimeout(this.tickId);

          if (this.lastSyncTime) {
            var dt = syncTime - this.lastSyncTime;
            this.currentTransportTime += dt;
          }
          break;
        case 'Stop':
          clearTimeout(this.tickId);

          this.currentTransportTime = 0;
          this.lastSyncTime = null;
          break;
      }

      console.log(this.state, this.currentTransportTime);

      var triggerTime = syncTime + this.propagationDelay;
      this.broadcast('player', null, 'transport', value, this.currentTransportTime, triggerTime);
      // this.osc.send('/transport', [value.toLowerCase(), delay]);
    }
  }, {
    key: 'pauseAndSetTransportTime',
    value: function pauseAndSetTransportTime(time) {
      clearTimeout(this.tickId);

      this.state = 'Pause';
      this.currentTransportTime = time;

      var triggerTime = this.sync.getSyncTime() + this.propagationDelay;
      this.broadcast('player', null, 'transport', 'Pause', this.currentTransportTime, triggerTime);
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.sharedParams.addParamListener('transport', this.updateTransport);

      (0, _keys2.default)(this.score.sections).forEach(function (sectionName) {
        _this2.sharedParams.addParamListener(sectionName, function () {
          _this2.pauseAndSetTransportTime(_this2.score.sections[sectionName].time);
        });
      });

      this.sharedParams.addParamListener('seek', function (value) {
        _this2.pauseAndSetTransportTime(value);
      });
    }
  }, {
    key: 'enter',
    value: function enter(client) {
      var _this3 = this;

      (0, _get3.default)(SharedExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(SharedExperience.prototype), 'enter', this).call(this, client);

      if (client.type === 'player') {
        this.receive(client, 'ready', function () {
          _this3.players.add(client);

          // send current state of the application to the new client
          var currentTransportTime = _this3.currentTransportTime;
          var syncTime = _this3.sync.getSyncTime();
          var triggerTime = syncTime + _this3.propagationDelay;

          // give a proper currentTime as we are probably between two ticks
          if (_this3.state === 'Start') {
            var dt = syncTime - _this3.lastSyncTime;
            currentTransportTime = currentTransportTime + dt;
          }

          console.log('connection', currentTransportTime, triggerTime);
          _this3.send(client, 'transport', _this3.state, currentTransportTime, triggerTime);

          // update controller
          _this3.sharedParams.update('numClients', _this3.players.size);
        });
      }
    }
  }, {
    key: 'exit',
    value: function exit(client) {
      (0, _get3.default)(SharedExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(SharedExperience.prototype), 'exit', this).call(this, client);

      if (client.type === 'player') {
        this.players.delete(client);
        this.sharedParams.update('numClients', this.players.size);
      }
    }
  }]);
  return SharedExperience;
}(_server.Experience); // Import Soundworks server side Experience


exports.default = SharedExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNoYXJlZEV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsiU2hhcmVkRXhwZXJpZW5jZSIsImNsaWVudFR5cGUiLCJzY29yZSIsInBsYWNlciIsInJlcXVpcmUiLCJzeW5jIiwic3luY1NjaGVkdWxlciIsInNoYXJlZFBhcmFtcyIsInBsYXllcnMiLCJjdXJyZW50VHJhbnNwb3J0VGltZSIsImxhc3RTeW5jVGltZSIsInN0YXRlIiwidGlja0lkIiwidGlja1BlcmlvZCIsInByb3BhZ2F0aW9uRGVsYXkiLCJ0aWNrIiwiYmluZCIsInVwZGF0ZVRyYW5zcG9ydCIsInN5bmNUaW1lIiwiZ2V0U3luY1RpbWUiLCJ0cmlnZ2VyVGltZSIsImR0IiwiYnJvYWRjYXN0Iiwic2V0VGltZW91dCIsInZhbHVlIiwiY2xlYXJUaW1lb3V0IiwiY29uc29sZSIsImxvZyIsInRpbWUiLCJhZGRQYXJhbUxpc3RlbmVyIiwic2VjdGlvbnMiLCJmb3JFYWNoIiwic2VjdGlvbk5hbWUiLCJwYXVzZUFuZFNldFRyYW5zcG9ydFRpbWUiLCJjbGllbnQiLCJ0eXBlIiwicmVjZWl2ZSIsImFkZCIsInNlbmQiLCJ1cGRhdGUiLCJzaXplIiwiZGVsZXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7OztJQUdxQkEsZ0I7OztBQUNuQiw0QkFBWUMsVUFBWixFQUF3QkMsS0FBeEIsRUFBK0I7QUFBQTs7QUFBQSwwSkFDdkJELFVBRHVCOztBQUc3QixVQUFLQyxLQUFMLEdBQWFBLEtBQWI7O0FBRUEsVUFBS0MsTUFBTCxHQUFjLE1BQUtDLE9BQUwsQ0FBYSxRQUFiLENBQWQ7QUFDQSxVQUFLQyxJQUFMLEdBQVksTUFBS0QsT0FBTCxDQUFhLE1BQWIsQ0FBWjtBQUNBLFVBQUtFLGFBQUwsR0FBcUIsTUFBS0YsT0FBTCxDQUFhLGdCQUFiLENBQXJCO0FBQ0EsVUFBS0csWUFBTCxHQUFvQixNQUFLSCxPQUFMLENBQWEsZUFBYixD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QW9CRDtBQUNGOzs7eUJBRUlOLE0sRUFBUTtBQUNYLHFKQUFXQSxNQUFYOztBQUVBLFVBQUlBLE9BQU9DLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUIsYUFBSzNCLE9BQUwsQ0FBYWlDLE1BQWIsQ0FBb0JQLE1BQXBCO0FBQ0EsYUFBSzNCLFlBQUwsQ0FBa0JnQyxNQUFsQixDQUF5QixZQUF6QixFQUF1QyxLQUFLL0IsT0FBTCxDQUFhZ0MsSUFBcEQ7QUFDRDtBQUNGOzs7dUJBaEpIOzs7a0JBTXFCeEMsZ0IiLCJmaWxlIjoiU2hhcmVkRXhwZXJpZW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCBTb3VuZHdvcmtzIHNlcnZlciBzaWRlIEV4cGVyaWVuY2VcbmltcG9ydCB7IEV4cGVyaWVuY2UgfSBmcm9tICdzb3VuZHdvcmtzL3NlcnZlcic7XG5cbi8qKlxuICogU2VydmVyLXNpZGUgJ3BsYXllcicgZXhwZXJpZW5jZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcmVkRXhwZXJpZW5jZSBleHRlbmRzIEV4cGVyaWVuY2Uge1xuICBjb25zdHJ1Y3RvcihjbGllbnRUeXBlLCBzY29yZSkge1xuICAgIHN1cGVyKGNsaWVudFR5cGUpO1xuXG4gICAgdGhpcy5zY29yZSA9IHNjb3JlO1xuXG4gICAgdGhpcy5wbGFjZXIgPSB0aGlzLnJlcXVpcmUoJ3BsYWNlcicpO1xuICAgIHRoaXMuc3luYyA9IHRoaXMucmVxdWlyZSgnc3luYycpO1xuICAgIHRoaXMuc3luY1NjaGVkdWxlciA9IHRoaXMucmVxdWlyZSgnc3luYy1zY2hlZHVsZXInKTtcbiAgICB0aGlzLnNoYXJlZFBhcmFtcyA9IHRoaXMucmVxdWlyZSgnc2hhcmVkLXBhcmFtcycpO1xuXG4gICAgdGhpcy5wbGF5ZXJzID0gbmV3IFNldCgpO1xuXG4gICAgdGhpcy5jdXJyZW50VHJhbnNwb3J0VGltZSA9IDA7XG4gICAgdGhpcy5sYXN0U3luY1RpbWUgPSBudWxsO1xuXG4gICAgdGhpcy5zdGF0ZSA9ICdTdG9wJztcbiAgICB0aGlzLnRpY2tJZCA9IG51bGw7XG4gICAgdGhpcy50aWNrUGVyaW9kID0gMTAwMDsgLy8gMSBzZWNvbmRcblxuICAgIHRoaXMucHJvcGFnYXRpb25EZWxheSA9IDAuMjsgLy9cblxuICAgIHRoaXMudGljayA9IHRoaXMudGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlVHJhbnNwb3J0ID0gdGhpcy51cGRhdGVUcmFuc3BvcnQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBsb2dpY2FsIHRpbWUgZXZlcnkgYHRoaXMudGlja1BlcmlvZGBcbiAgdGljaygpIHtcbiAgICAvLyB1cGRhdGUgY3VycmVudCB0aW1lXG4gICAgY29uc3Qgc3luY1RpbWUgPSB0aGlzLnN5bmMuZ2V0U3luY1RpbWUoKTtcbiAgICBjb25zdCB0cmlnZ2VyVGltZSA9IHN5bmNUaW1lICsgdGhpcy5wcm9wYWdhdGlvbkRlbGF5O1xuICAgIGNvbnN0IGR0ID0gc3luY1RpbWUgLSB0aGlzLmxhc3RTeW5jVGltZTtcbiAgICB0aGlzLmN1cnJlbnRUcmFuc3BvcnRUaW1lICs9IGR0O1xuXG4gICAgLy8gY29uc29sZS5sb2coJ3RpY2snLCB0aGlzLmN1cnJlbnRUcmFuc3BvcnRUaW1lKTtcbiAgICB0aGlzLmJyb2FkY2FzdCgncGxheWVyJywgbnVsbCwgJ3VwZGF0ZVRpbWUnLCB0aGlzLmN1cnJlbnRUcmFuc3BvcnRUaW1lLCB0cmlnZ2VyVGltZSk7XG5cbiAgICB0aGlzLmxhc3RTeW5jVGltZSA9IHN5bmNUaW1lO1xuXG4gICAgdGhpcy50aWNrSWQgPSBzZXRUaW1lb3V0KHRoaXMudGljaywgdGhpcy50aWNrUGVyaW9kKTtcbiAgfVxuXG4gIHVwZGF0ZVRyYW5zcG9ydCh2YWx1ZSkge1xuICAgIC8vIHByZXZlbnQgbXVsdGlwbGUgY2FsbHNcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gdmFsdWUpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLnN0YXRlID0gdmFsdWU7XG5cbiAgICBjb25zdCBzeW5jVGltZSA9IHRoaXMuc3luYy5nZXRTeW5jVGltZSgpO1xuXG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSAnU3RhcnQnOlxuICAgICAgICAvLyBjdXJyZW50VHJhbnNwb3J0VGltZSBzaG91bG4ndCBiZSB1cGRhdGVkIGhlcmVcbiAgICAgICAgdGhpcy5sYXN0U3luY1RpbWUgPSBzeW5jVGltZTtcbiAgICAgICAgdGhpcy50aWNrSWQgPSBzZXRUaW1lb3V0KHRoaXMudGljaywgdGhpcy50aWNrUGVyaW9kKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQYXVzZSc6XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpY2tJZCk7XG5cbiAgICAgICAgaWYgKHRoaXMubGFzdFN5bmNUaW1lKSB7XG4gICAgICAgICAgY29uc3QgZHQgPSBzeW5jVGltZSAtIHRoaXMubGFzdFN5bmNUaW1lO1xuICAgICAgICAgIHRoaXMuY3VycmVudFRyYW5zcG9ydFRpbWUgKz0gZHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdTdG9wJzpcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGlja0lkKTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRUcmFuc3BvcnRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5sYXN0U3luY1RpbWUgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLCB0aGlzLmN1cnJlbnRUcmFuc3BvcnRUaW1lKTtcblxuICAgIGNvbnN0IHRyaWdnZXJUaW1lID0gc3luY1RpbWUgKyB0aGlzLnByb3BhZ2F0aW9uRGVsYXk7XG4gICAgdGhpcy5icm9hZGNhc3QoJ3BsYXllcicsIG51bGwsICd0cmFuc3BvcnQnLCB2YWx1ZSwgdGhpcy5jdXJyZW50VHJhbnNwb3J0VGltZSwgdHJpZ2dlclRpbWUpO1xuICAgIC8vIHRoaXMub3NjLnNlbmQoJy90cmFuc3BvcnQnLCBbdmFsdWUudG9Mb3dlckNhc2UoKSwgZGVsYXldKTtcbiAgfVxuXG4gIHBhdXNlQW5kU2V0VHJhbnNwb3J0VGltZSh0aW1lKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGlja0lkKTtcblxuICAgIHRoaXMuc3RhdGUgPSAnUGF1c2UnO1xuICAgIHRoaXMuY3VycmVudFRyYW5zcG9ydFRpbWUgPSB0aW1lO1xuXG4gICAgY29uc3QgdHJpZ2dlclRpbWUgPSB0aGlzLnN5bmMuZ2V0U3luY1RpbWUoKSArIHRoaXMucHJvcGFnYXRpb25EZWxheTtcbiAgICB0aGlzLmJyb2FkY2FzdCgncGxheWVyJywgbnVsbCwgJ3RyYW5zcG9ydCcsICdQYXVzZScsIHRoaXMuY3VycmVudFRyYW5zcG9ydFRpbWUsIHRyaWdnZXJUaW1lKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuc2hhcmVkUGFyYW1zLmFkZFBhcmFtTGlzdGVuZXIoJ3RyYW5zcG9ydCcsIHRoaXMudXBkYXRlVHJhbnNwb3J0KTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuc2NvcmUuc2VjdGlvbnMpLmZvckVhY2goc2VjdGlvbk5hbWUgPT4ge1xuICAgICAgdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcihzZWN0aW9uTmFtZSwgKCkgPT4ge1xuICAgICAgICB0aGlzLnBhdXNlQW5kU2V0VHJhbnNwb3J0VGltZSh0aGlzLnNjb3JlLnNlY3Rpb25zW3NlY3Rpb25OYW1lXS50aW1lKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcignc2VlaycsIHZhbHVlID0+IHtcbiAgICAgIHRoaXMucGF1c2VBbmRTZXRUcmFuc3BvcnRUaW1lKHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGVudGVyKGNsaWVudCkge1xuICAgIHN1cGVyLmVudGVyKGNsaWVudCk7XG5cbiAgICBpZiAoY2xpZW50LnR5cGUgPT09ICdwbGF5ZXInKSB7XG4gICAgICB0aGlzLnJlY2VpdmUoY2xpZW50LCAncmVhZHknLCAoKSA9PiB7XG4gICAgICAgIHRoaXMucGxheWVycy5hZGQoY2xpZW50KTtcblxuICAgICAgICAvLyBzZW5kIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGFwcGxpY2F0aW9uIHRvIHRoZSBuZXcgY2xpZW50XG4gICAgICAgIGxldCBjdXJyZW50VHJhbnNwb3J0VGltZSA9IHRoaXMuY3VycmVudFRyYW5zcG9ydFRpbWU7XG4gICAgICAgIGNvbnN0IHN5bmNUaW1lID0gdGhpcy5zeW5jLmdldFN5bmNUaW1lKCk7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJUaW1lID0gc3luY1RpbWUgKyB0aGlzLnByb3BhZ2F0aW9uRGVsYXk7XG5cbiAgICAgICAgLy8gZ2l2ZSBhIHByb3BlciBjdXJyZW50VGltZSBhcyB3ZSBhcmUgcHJvYmFibHkgYmV0d2VlbiB0d28gdGlja3NcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09ICdTdGFydCcpIHtcbiAgICAgICAgICBjb25zdCBkdCA9IHN5bmNUaW1lIC0gdGhpcy5sYXN0U3luY1RpbWU7XG4gICAgICAgICAgY3VycmVudFRyYW5zcG9ydFRpbWUgPSBjdXJyZW50VHJhbnNwb3J0VGltZSArIGR0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2Nvbm5lY3Rpb24nLCBjdXJyZW50VHJhbnNwb3J0VGltZSwgdHJpZ2dlclRpbWUpO1xuICAgICAgICB0aGlzLnNlbmQoY2xpZW50LCAndHJhbnNwb3J0JywgdGhpcy5zdGF0ZSwgY3VycmVudFRyYW5zcG9ydFRpbWUsIHRyaWdnZXJUaW1lKTtcblxuICAgICAgICAvLyB1cGRhdGUgY29udHJvbGxlclxuICAgICAgICB0aGlzLnNoYXJlZFBhcmFtcy51cGRhdGUoJ251bUNsaWVudHMnLCB0aGlzLnBsYXllcnMuc2l6ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBleGl0KGNsaWVudCkge1xuICAgIHN1cGVyLmV4aXQoY2xpZW50KTtcblxuICAgIGlmIChjbGllbnQudHlwZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgIHRoaXMucGxheWVycy5kZWxldGUoY2xpZW50KTtcbiAgICAgIHRoaXMuc2hhcmVkUGFyYW1zLnVwZGF0ZSgnbnVtQ2xpZW50cycsIHRoaXMucGxheWVycy5zaXplKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==