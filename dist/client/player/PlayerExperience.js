'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _client = require('soundworks/client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '\n  <div class="video-wrapper">\n    <video id="video" controls></video>\n  </div>\n  <% if (!isEnv) { %>\n  <button class="btn" id="reload">Reload</button>\n  <p id="infos">\n    <span id="part"><%= part %></span>\n    &nbsp;-&nbsp;\n    <span id="section-label"><%= sectionLabel %></span>\n  </p>\n  <% } %>\n';

var PlayerExperience = function (_Experience) {
  (0, _inherits3.default)(PlayerExperience, _Experience);

  function PlayerExperience(score) {
    (0, _classCallCheck3.default)(this, PlayerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PlayerExperience.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience)).call(this));

    _this.score = score;

    _this.platform = _this.require('platform', { features: [] });
    _this.placer = _this.require('placer');
    _this.sharedParams = _this.require('shared-params');
    _this.syncScheduler = _this.require('sync-scheduler');
    _this.videoLoader = _this.require('video-loader');

    _this.onTransportChange = _this.onTransportChange.bind(_this);
    _this.onUpdateTime = _this.onUpdateTime.bind(_this);

    _this.updateLabel = _this.updateLabel.bind(_this);
    _this.onFirstPlay = _this.onFirstPlay.bind(_this);
    _this.reload = _this.reload.bind(_this);

    _this.isEnv = false;
    _this.isReady = false; // don't listen controls if not ready
    return _this;
  }

  (0, _createClass3.default)(PlayerExperience, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'start', this).call(this);

      this.part = this.score.parts[_client.client.label];

      if (this.part.type === 'env') this.isEnv = true;

      // initialize the view
      var model = {
        sectionLabel: '<span class="orange soft-blink">start the video and wait for the beginning</span>',
        part: _client.client.label,
        isEnv: this.isEnv
      };

      var events = {
        'touchstart #reload': function touchstartReload() {
          return _this2.reload(true);
        }
      };

      this.view = new _client.View(template, model, events, {});

      _promise2.default.all([this.show(), this.videoLoader.load(this.part.file)]).then(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            empty = _ref2[0],
            objectUrl = _ref2[1];

        _this2.$video = _this2.view.$el.querySelector('#video');
        _this2.$video.src = objectUrl;

        _this2.receive('transport', _this2.onTransportChange);
        _this2.receive('updateTime', _this2.onUpdateTime);

        // this.sharedParams.addParamListener('playbackRate', (value) => this.$video.playbackRate = value);
        // this.sharedParams.addParamListener('seek', (value) => this.$video.currentTime = value);
        _this2.sharedParams.addParamListener('reload', function () {
          return _this2.reload(false);
        });

        if (_this2.part.type !== 'env') _this2.sharedParams.addParamListener('volume:performers', function (value) {
          return _this2.$video.volume = value;
        });else _this2.sharedParams.addParamListener('volume:env:' + _client.client.label, function (value) {
          return _this2.$video.volume = value;
        });

        // update label according to video current time
        _this2.$video.addEventListener('timeupdate', _this2.updateLabel);
        _this2.$video.addEventListener('play', _this2.onFirstPlay);
      });
    }

    // @todo - remove that, use platform hook...

  }, {
    key: 'onFirstPlay',
    value: function onFirstPlay() {
      this.$video.pause();
      // remove controls
      this.$video.removeAttribute('controls');

      if (!this.isEnv) alert('click "ok" and wait for the beginning...');

      this.isReady = true; // don't listen controls if not ready
      // feedback for the controller
      this.send('ready');
      this.$video.removeEventListener('play', this.onFirstPlay);
    }
  }, {
    key: 'onTransportChange',
    value: function onTransportChange(state, transportTime, triggerSyncTime) {
      var _this3 = this;

      if (!this.isReady) return;

      console.log(state, transportTime, triggerSyncTime);
      var currentSyncTime = this.syncScheduler.currentTime;

      // message received to late execute now and compensate if state is Start
      if (triggerSyncTime < currentSyncTime) {
        if (state === 'Start') {
          var decay = currentSyncTime - triggerSyncTime;

          this.$video.currentTime = transportTime + decay;
          this.$video.play();
        } else {
          this.$video.pause();
          this.$video.currentTime = transportTime;
        }
      } else {
        // defer execution to triggerSyncTime
        this.syncScheduler.defer(function () {
          if (state === 'Start') {
            _this3.$video.currentTime = transportTime;
            _this3.$video.play();
          } else {
            _this3.$video.pause();
            _this3.$video.currentTime = transportTime;
          }
        }, triggerSyncTime);
      }
    }

    // this is triggered every tickPeriod by the server to maintain every client
    // into an acceptable state, or recover if a problem occured

  }, {
    key: 'onUpdateTime',
    value: function onUpdateTime(transportTime, triggerSyncTime) {
      var _this4 = this;

      if (!this.isReady) return;

      // console.log(transportTime, triggerSyncTime);
      var syncTime = this.syncScheduler.currentTime;

      // just wait for the next message if received too late
      if (triggerSyncTime > syncTime) {
        this.syncScheduler.defer(function () {
          var videoCurrentTime = _this4.$video.currentTime;
          var jit = Math.abs(transportTime - videoCurrentTime);
          // let's assume < 100ms is ok
          // if larger seek to transportTime
          if (jit > 0.1) {
            _this4.$video.currentTime = transportTime;
          }
        }, triggerSyncTime);
      }
    }
  }, {
    key: 'reload',
    value: function reload() {
      var confirm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (confirm === true) {
        var isConfirmed = window.confirm('are you sure you want to reload?');
        if (!isConfirmed) return;
      }

      window.location.reload();
    }
  }, {
    key: 'updateLabel',
    value: function updateLabel() {
      if (this.isEnv) return;

      var sections = this.score.sections;

      var currentTime = this.$video.currentTime;
      var names = (0, _keys2.default)(sections);
      var label = null;

      for (var i = 0; i < names.length; i++) {
        var section = sections[names[i]];
        var next = sections[names[i + 1]];

        if (next) {
          if (!label && currentTime >= section.time && currentTime < next.time) {
            label = section.label;
            break;
          }
        } else {
          if (!label && currentTime >= section.time) label = section.label;
        }
      };

      if (this.view.model.sectionLabel !== label) {
        this.view.model.sectionLabel = label;
        this.view.render('#section-label');
      }
    }
  }]);
  return PlayerExperience;
}(_client.Experience);

exports.default = PlayerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsidGVtcGxhdGUiLCJQbGF5ZXJFeHBlcmllbmNlIiwic2NvcmUiLCJwbGF0Zm9ybSIsInJlcXVpcmUiLCJmZWF0dXJlcyIsInBsYWNlciIsInNoYXJlZFBhcmFtcyIsInN5bmNTY2hlZHVsZXIiLCJ2aWRlb0xvYWRlciIsIm9uVHJhbnNwb3J0Q2hhbmdlIiwiYmluZCIsIm9uVXBkYXRlVGltZSIsInVwZGF0ZUxhYmVsIiwib25GaXJzdFBsYXkiLCJyZWxvYWQiLCJpc0VudiIsImlzUmVhZHkiLCJwYXJ0IiwicGFydHMiLCJsYWJlbCIsInR5cGUiLCJtb2RlbCIsInNlY3Rpb25MYWJlbCIsImV2ZW50cyIsInZpZXciLCJhbGwiLCJzaG93IiwibG9hZCIsImZpbGUiLCJ0aGVuIiwiZW1wdHkiLCJvYmplY3RVcmwiLCIkdmlkZW8iLCIkZWwiLCJxdWVyeVNlbGVjdG9yIiwic3JjIiwicmVjZWl2ZSIsImFkZFBhcmFtTGlzdGVuZXIiLCJ2YWx1ZSIsInZvbHVtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXVzZSIsInJlbW92ZUF0dHJpYnV0ZSIsImFsZXJ0Iiwic2VuZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzdGF0ZSIsInRyYW5zcG9ydFRpbWUiLCJ0cmlnZ2VyU3luY1RpbWUiLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFN5bmNUaW1lIiwiY3VycmVudFRpbWUiLCJkZWNheSIsInBsYXkiLCJkZWZlciIsInN5bmNUaW1lIiwidmlkZW9DdXJyZW50VGltZSIsImppdCIsIk1hdGgiLCJhYnMiLCJjb25maXJtIiwiaXNDb25maXJtZWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlY3Rpb25zIiwibmFtZXMiLCJpIiwibGVuZ3RoIiwic2VjdGlvbiIsIm5leHQiLCJ0aW1lIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztB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QU9DLFFBQVAsQ0FBZ0JsRCxNQUFoQjtBQUNEOzs7a0NBRWE7QUFDWixVQUFJLEtBQUtDLEtBQVQsRUFDRTs7QUFFRixVQUFNa0QsV0FBVyxLQUFLaEUsS0FBTCxDQUFXZ0UsUUFBNUI7O0FBRUEsVUFBTWIsY0FBYyxLQUFLcEIsTUFBTCxDQUFZb0IsV0FBaEM7QUFDQSxVQUFNYyxRQUFRLG9CQUFZRCxRQUFaLENBQWQ7QUFDQSxVQUFJOUMsUUFBUSxJQUFaOztBQUVBLFdBQUssSUFBSWdELElBQUksQ0FBYixFQUFnQkEsSUFBSUQsTUFBTUUsTUFBMUIsRUFBa0NELEdBQWxDLEVBQXVDO0FBQ3JDLFlBQU1FLFVBQVVKLFNBQVNDLE1BQU1DLENBQU4sQ0FBVCxDQUFoQjtBQUNBLFlBQU1HLE9BQU9MLFNBQVNDLE1BQU1DLElBQUksQ0FBVixDQUFULENBQWI7O0FBRUEsWUFBSUcsSUFBSixFQUFVO0FBQ1IsY0FBSSxDQUFDbkQsS0FBRCxJQUFVaUMsZUFBZWlCLFFBQVFFLElBQWpDLElBQXlDbkIsY0FBY2tCLEtBQUtDLElBQWhFLEVBQXNFO0FBQ3BFcEQsb0JBQVFrRCxRQUFRbEQsS0FBaEI7QUFDQTtBQUNEO0FBQ0YsU0FMRCxNQUtPO0FBQ0wsY0FBSSxDQUFDQSxLQUFELElBQVVpQyxlQUFlaUIsUUFBUUUsSUFBckMsRUFDRXBELFFBQVFrRCxRQUFRbEQsS0FBaEI7QUFDSDtBQUNGOztBQUVELFVBQUksS0FBS0ssSUFBTCxDQUFVSCxLQUFWLENBQWdCQyxZQUFoQixLQUFpQ0gsS0FBckMsRUFBNEM7QUFDMUMsYUFBS0ssSUFBTCxDQUFVSCxLQUFWLENBQWdCQyxZQUFoQixHQUErQkgsS0FBL0I7QUFDQSxhQUFLSyxJQUFMLENBQVVnRCxNQUFWLENBQWlCLGdCQUFqQjtBQUNEO0FBQ0Y7Ozs7O2tCQUdZeEUsZ0IiLCJmaWxlIjoiUGxheWVyRXhwZXJpZW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV4cGVyaWVuY2UsIFZpZXcsIGNsaWVudCB9IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG4gIDxkaXYgY2xhc3M9XCJ2aWRlby13cmFwcGVyXCI+XG4gICAgPHZpZGVvIGlkPVwidmlkZW9cIiBjb250cm9scz48L3ZpZGVvPlxuICA8L2Rpdj5cbiAgPCUgaWYgKCFpc0VudikgeyAlPlxuICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgaWQ9XCJyZWxvYWRcIj5SZWxvYWQ8L2J1dHRvbj5cbiAgPHAgaWQ9XCJpbmZvc1wiPlxuICAgIDxzcGFuIGlkPVwicGFydFwiPjwlPSBwYXJ0ICU+PC9zcGFuPlxuICAgICZuYnNwOy0mbmJzcDtcbiAgICA8c3BhbiBpZD1cInNlY3Rpb24tbGFiZWxcIj48JT0gc2VjdGlvbkxhYmVsICU+PC9zcGFuPlxuICA8L3A+XG4gIDwlIH0gJT5cbmA7XG5cblxuY2xhc3MgUGxheWVyRXhwZXJpZW5jZSBleHRlbmRzIEV4cGVyaWVuY2Uge1xuICBjb25zdHJ1Y3RvcihzY29yZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNjb3JlID0gc2NvcmU7XG5cbiAgICB0aGlzLnBsYXRmb3JtID0gdGhpcy5yZXF1aXJlKCdwbGF0Zm9ybScsIHsgZmVhdHVyZXM6IFtdIH0pO1xuICAgIHRoaXMucGxhY2VyID0gdGhpcy5yZXF1aXJlKCdwbGFjZXInKTtcbiAgICB0aGlzLnNoYXJlZFBhcmFtcyA9IHRoaXMucmVxdWlyZSgnc2hhcmVkLXBhcmFtcycpO1xuICAgIHRoaXMuc3luY1NjaGVkdWxlciA9IHRoaXMucmVxdWlyZSgnc3luYy1zY2hlZHVsZXInKTtcbiAgICB0aGlzLnZpZGVvTG9hZGVyID0gdGhpcy5yZXF1aXJlKCd2aWRlby1sb2FkZXInKTtcblxuICAgIHRoaXMub25UcmFuc3BvcnRDaGFuZ2UgPSB0aGlzLm9uVHJhbnNwb3J0Q2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblVwZGF0ZVRpbWUgPSB0aGlzLm9uVXBkYXRlVGltZS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy51cGRhdGVMYWJlbCA9IHRoaXMudXBkYXRlTGFiZWwuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uRmlyc3RQbGF5ID0gdGhpcy5vbkZpcnN0UGxheS5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmVsb2FkID0gdGhpcy5yZWxvYWQuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuaXNFbnYgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTsgLy8gZG9uJ3QgbGlzdGVuIGNvbnRyb2xzIGlmIG5vdCByZWFkeVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgc3VwZXIuc3RhcnQoKTtcblxuICAgIHRoaXMucGFydCA9IHRoaXMuc2NvcmUucGFydHNbY2xpZW50LmxhYmVsXTtcblxuICAgIGlmICh0aGlzLnBhcnQudHlwZSA9PT0gJ2VudicpXG4gICAgICB0aGlzLmlzRW52ID0gdHJ1ZTtcblxuICAgIC8vIGluaXRpYWxpemUgdGhlIHZpZXdcbiAgICBjb25zdCBtb2RlbCA9IHtcbiAgICAgIHNlY3Rpb25MYWJlbDogYDxzcGFuIGNsYXNzPVwib3JhbmdlIHNvZnQtYmxpbmtcIj5zdGFydCB0aGUgdmlkZW8gYW5kIHdhaXQgZm9yIHRoZSBiZWdpbm5pbmc8L3NwYW4+YCxcbiAgICAgIHBhcnQ6IGNsaWVudC5sYWJlbCxcbiAgICAgIGlzRW52OiB0aGlzLmlzRW52LFxuICAgIH07XG5cbiAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICAndG91Y2hzdGFydCAjcmVsb2FkJzogKCkgPT4gdGhpcy5yZWxvYWQodHJ1ZSksXG4gICAgfTtcblxuICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KHRlbXBsYXRlLCBtb2RlbCwgZXZlbnRzLCB7fSk7XG5cbiAgICBQcm9taXNlLmFsbChbdGhpcy5zaG93KCksIHRoaXMudmlkZW9Mb2FkZXIubG9hZCh0aGlzLnBhcnQuZmlsZSldKVxuICAgICAgLnRoZW4oKFtlbXB0eSwgb2JqZWN0VXJsXSkgPT4ge1xuXG4gICAgICAgIHRoaXMuJHZpZGVvID0gdGhpcy52aWV3LiRlbC5xdWVyeVNlbGVjdG9yKCcjdmlkZW8nKTtcbiAgICAgICAgdGhpcy4kdmlkZW8uc3JjID0gb2JqZWN0VXJsO1xuXG4gICAgICAgIHRoaXMucmVjZWl2ZSgndHJhbnNwb3J0JywgdGhpcy5vblRyYW5zcG9ydENoYW5nZSk7XG4gICAgICAgIHRoaXMucmVjZWl2ZSgndXBkYXRlVGltZScsIHRoaXMub25VcGRhdGVUaW1lKTtcblxuICAgICAgICAvLyB0aGlzLnNoYXJlZFBhcmFtcy5hZGRQYXJhbUxpc3RlbmVyKCdwbGF5YmFja1JhdGUnLCAodmFsdWUpID0+IHRoaXMuJHZpZGVvLnBsYXliYWNrUmF0ZSA9IHZhbHVlKTtcbiAgICAgICAgLy8gdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcignc2VlaycsICh2YWx1ZSkgPT4gdGhpcy4kdmlkZW8uY3VycmVudFRpbWUgPSB2YWx1ZSk7XG4gICAgICAgIHRoaXMuc2hhcmVkUGFyYW1zLmFkZFBhcmFtTGlzdGVuZXIoJ3JlbG9hZCcsICgpID0+IHRoaXMucmVsb2FkKGZhbHNlKSk7XG5cbiAgICAgICAgaWYgKHRoaXMucGFydC50eXBlICE9PSAnZW52JylcbiAgICAgICAgICB0aGlzLnNoYXJlZFBhcmFtcy5hZGRQYXJhbUxpc3RlbmVyKCd2b2x1bWU6cGVyZm9ybWVycycsICh2YWx1ZSkgPT4gdGhpcy4kdmlkZW8udm9sdW1lID0gdmFsdWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcihgdm9sdW1lOmVudjoke2NsaWVudC5sYWJlbH1gLCAodmFsdWUpID0+IHRoaXMuJHZpZGVvLnZvbHVtZSA9IHZhbHVlKTtcblxuICAgICAgICAvLyB1cGRhdGUgbGFiZWwgYWNjb3JkaW5nIHRvIHZpZGVvIGN1cnJlbnQgdGltZVxuICAgICAgICB0aGlzLiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGhpcy51cGRhdGVMYWJlbCk7XG4gICAgICAgIHRoaXMuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCB0aGlzLm9uRmlyc3RQbGF5KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gQHRvZG8gLSByZW1vdmUgdGhhdCwgdXNlIHBsYXRmb3JtIGhvb2suLi5cbiAgb25GaXJzdFBsYXkoKSB7XG4gICAgdGhpcy4kdmlkZW8ucGF1c2UoKTtcbiAgICAvLyByZW1vdmUgY29udHJvbHNcbiAgICB0aGlzLiR2aWRlby5yZW1vdmVBdHRyaWJ1dGUoJ2NvbnRyb2xzJyk7XG5cbiAgICBpZiAoIXRoaXMuaXNFbnYpXG4gICAgICBhbGVydCgnY2xpY2sgXCJva1wiIGFuZCB3YWl0IGZvciB0aGUgYmVnaW5uaW5nLi4uJyk7XG5cbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlOyAvLyBkb24ndCBsaXN0ZW4gY29udHJvbHMgaWYgbm90IHJlYWR5XG4gICAgLy8gZmVlZGJhY2sgZm9yIHRoZSBjb250cm9sbGVyXG4gICAgdGhpcy5zZW5kKCdyZWFkeScpO1xuICAgIHRoaXMuJHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BsYXknLCB0aGlzLm9uRmlyc3RQbGF5KTtcbiAgfVxuXG4gIG9uVHJhbnNwb3J0Q2hhbmdlKHN0YXRlLCB0cmFuc3BvcnRUaW1lLCB0cmlnZ2VyU3luY1RpbWUpIHtcbiAgICBpZiAoIXRoaXMuaXNSZWFkeSlcbiAgICAgIHJldHVybjtcblxuICAgIGNvbnNvbGUubG9nKHN0YXRlLCB0cmFuc3BvcnRUaW1lLCB0cmlnZ2VyU3luY1RpbWUpO1xuICAgIGNvbnN0IGN1cnJlbnRTeW5jVGltZSA9IHRoaXMuc3luY1NjaGVkdWxlci5jdXJyZW50VGltZTtcblxuICAgIC8vIG1lc3NhZ2UgcmVjZWl2ZWQgdG8gbGF0ZSBleGVjdXRlIG5vdyBhbmQgY29tcGVuc2F0ZSBpZiBzdGF0ZSBpcyBTdGFydFxuICAgIGlmICh0cmlnZ2VyU3luY1RpbWUgPCBjdXJyZW50U3luY1RpbWUpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gJ1N0YXJ0JyApIHtcbiAgICAgICAgY29uc3QgZGVjYXkgPSBjdXJyZW50U3luY1RpbWUgLSB0cmlnZ2VyU3luY1RpbWU7XG5cbiAgICAgICAgdGhpcy4kdmlkZW8uY3VycmVudFRpbWUgPSB0cmFuc3BvcnRUaW1lICsgZGVjYXk7XG4gICAgICAgIHRoaXMuJHZpZGVvLnBsYXkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJHZpZGVvLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuJHZpZGVvLmN1cnJlbnRUaW1lID0gdHJhbnNwb3J0VGltZTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkZWZlciBleGVjdXRpb24gdG8gdHJpZ2dlclN5bmNUaW1lXG4gICAgICB0aGlzLnN5bmNTY2hlZHVsZXIuZGVmZXIoKCkgPT4ge1xuICAgICAgICBpZiAoc3RhdGUgPT09ICdTdGFydCcpIHtcbiAgICAgICAgICB0aGlzLiR2aWRlby5jdXJyZW50VGltZSA9IHRyYW5zcG9ydFRpbWU7XG4gICAgICAgICAgdGhpcy4kdmlkZW8ucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuJHZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgdGhpcy4kdmlkZW8uY3VycmVudFRpbWUgPSB0cmFuc3BvcnRUaW1lO1xuICAgICAgICB9XG4gICAgICB9LCB0cmlnZ2VyU3luY1RpbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRoaXMgaXMgdHJpZ2dlcmVkIGV2ZXJ5IHRpY2tQZXJpb2QgYnkgdGhlIHNlcnZlciB0byBtYWludGFpbiBldmVyeSBjbGllbnRcbiAgLy8gaW50byBhbiBhY2NlcHRhYmxlIHN0YXRlLCBvciByZWNvdmVyIGlmIGEgcHJvYmxlbSBvY2N1cmVkXG4gIG9uVXBkYXRlVGltZSh0cmFuc3BvcnRUaW1lLCB0cmlnZ2VyU3luY1RpbWUpIHtcbiAgICBpZiAoIXRoaXMuaXNSZWFkeSlcbiAgICAgIHJldHVybjtcblxuICAgIC8vIGNvbnNvbGUubG9nKHRyYW5zcG9ydFRpbWUsIHRyaWdnZXJTeW5jVGltZSk7XG4gICAgY29uc3Qgc3luY1RpbWUgPSB0aGlzLnN5bmNTY2hlZHVsZXIuY3VycmVudFRpbWU7XG5cbiAgICAvLyBqdXN0IHdhaXQgZm9yIHRoZSBuZXh0IG1lc3NhZ2UgaWYgcmVjZWl2ZWQgdG9vIGxhdGVcbiAgICBpZiAodHJpZ2dlclN5bmNUaW1lID4gc3luY1RpbWUpIHtcbiAgICAgIHRoaXMuc3luY1NjaGVkdWxlci5kZWZlcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHZpZGVvQ3VycmVudFRpbWUgPSB0aGlzLiR2aWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgY29uc3Qgaml0ID0gTWF0aC5hYnModHJhbnNwb3J0VGltZSAtIHZpZGVvQ3VycmVudFRpbWUpO1xuICAgICAgICAvLyBsZXQncyBhc3N1bWUgPCAxMDBtcyBpcyBva1xuICAgICAgICAvLyBpZiBsYXJnZXIgc2VlayB0byB0cmFuc3BvcnRUaW1lXG4gICAgICAgIGlmIChqaXQgPiAwLjEpIHtcbiAgICAgICAgICB0aGlzLiR2aWRlby5jdXJyZW50VGltZSA9IHRyYW5zcG9ydFRpbWU7XG4gICAgICAgIH1cbiAgICAgIH0sIHRyaWdnZXJTeW5jVGltZSk7XG4gICAgfVxuICB9XG5cbiAgcmVsb2FkKGNvbmZpcm0gPSBmYWxzZSkge1xuICAgIGlmIChjb25maXJtID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBpc0NvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKCdhcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVsb2FkPycpO1xuICAgICAgaWYgKCFpc0NvbmZpcm1lZCkgcmV0dXJuO1xuICAgIH1cblxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuXG4gIHVwZGF0ZUxhYmVsKCkge1xuICAgIGlmICh0aGlzLmlzRW52KVxuICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2VjdGlvbnMgPSB0aGlzLnNjb3JlLnNlY3Rpb25zO1xuXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSB0aGlzLiR2aWRlby5jdXJyZW50VGltZTtcbiAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKHNlY3Rpb25zKTtcbiAgICBsZXQgbGFiZWwgPSBudWxsO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2VjdGlvbiA9IHNlY3Rpb25zW25hbWVzW2ldXTtcbiAgICAgIGNvbnN0IG5leHQgPSBzZWN0aW9uc1tuYW1lc1tpICsgMV1dO1xuXG4gICAgICBpZiAobmV4dCkge1xuICAgICAgICBpZiAoIWxhYmVsICYmIGN1cnJlbnRUaW1lID49IHNlY3Rpb24udGltZSAmJiBjdXJyZW50VGltZSA8IG5leHQudGltZSkge1xuICAgICAgICAgIGxhYmVsID0gc2VjdGlvbi5sYWJlbDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFsYWJlbCAmJiBjdXJyZW50VGltZSA+PSBzZWN0aW9uLnRpbWUpXG4gICAgICAgICAgbGFiZWwgPSBzZWN0aW9uLmxhYmVsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodGhpcy52aWV3Lm1vZGVsLnNlY3Rpb25MYWJlbCAhPT0gbGFiZWwpIHtcbiAgICAgIHRoaXMudmlldy5tb2RlbC5zZWN0aW9uTGFiZWwgPSBsYWJlbDtcbiAgICAgIHRoaXMudmlldy5yZW5kZXIoJyNzZWN0aW9uLWxhYmVsJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllckV4cGVyaWVuY2U7XG4iXX0=