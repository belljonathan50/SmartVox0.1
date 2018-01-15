'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var SERVICE_ID = 'service:video-loader';

var template = '\n  <div class="section-top"></div>\n  <div class="section-center flex-center">\n    <% if (state === \'loading\') { %>\n      <p>Loading video...</p>\n    <% } else if (state === \'error\') { %>\n      <p class="red">Error loading: <%= src %></p>\n    <% } %>\n  </div>\n  <div class="section-bottom"></div>\n';

var VideoLoader = function (_Service) {
  (0, _inherits3.default)(VideoLoader, _Service);

  function VideoLoader() {
    (0, _classCallCheck3.default)(this, VideoLoader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (VideoLoader.__proto__ || (0, _getPrototypeOf2.default)(VideoLoader)).call(this, SERVICE_ID, false));

    var defaults = { src: null };

    _this.configure(defaults);
    return _this;
  }

  (0, _createClass3.default)(VideoLoader, [{
    key: 'start',
    value: function start() {
      (0, _get3.default)(VideoLoader.prototype.__proto__ || (0, _getPrototypeOf2.default)(VideoLoader.prototype), 'start', this).call(this);

      var model = { state: 'loading' };
      this.view = new _client.SegmentedView(template, model, {}, {});

      this.ready();
    }
  }, {
    key: 'load',
    value: function load(src) {
      var _this2 = this;

      this.show();

      this.view.model.state = 'loading';
      this.view.render('.section-center');

      return new _promise2.default(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
          var res = e.currentTarget;

          if (res.status === 200) {
            resolve(window.URL.createObjectURL(res.response));
            _this2.hide();
          } else {
            _this2.view.model.state = 'error';
            _this2.view.model.src = new String(src);
            _this2.view.render('.section-center');
          }
        };

        xhr.open('GET', src, true);
        xhr.send();
      });
    }
  }]);
  return VideoLoader;
}(_client.Service);

_client.serviceManager.register(SERVICE_ID, VideoLoader);

exports.default = VideoLoader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZpZGVvTG9hZGVyLmpzIl0sIm5hbWVzIjpbIlNFUlZJQ0VfSUQiLCJ0ZW1wbGF0ZSIsIlZpZGVvTG9hZGVyIiwiZGVmYXVsdHMiLCJzcmMiLCJjb25maWd1cmUiLCJtb2RlbCIsInN0YXRlIiwidmlldyIsInJlYWR5Iiwic2hvdyIsInJlbmRlciIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInJlc3BvbnNlVHlwZSIsIm9ubG9hZCIsImUiLCJyZXMiLCJjdXJyZW50VGFyZ2V0Iiwic3RhdHVzIiwid2luZG93IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwicmVzcG9uc2UiLCJoaWRlIiwiU3RyaW5nIiwib3BlbiIsInNlbmQiLCJyZWdpc3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUEsYUFBYSxzQkFBbkI7O0FBRUEsSUFBTUMsbVVBQU47O0lBWU1DLFc7OztBQUNKLHlCQUFjO0FBQUE7O0FBQUEsZ0pBQ05GLFVBRE0sRUFDTSxLQUROOztBQUdaLFFBQU1HLFdBQVcsRUFBRUMsS0FBSyxJQUFQLEVBQWpCOztBQUVBLFVBQUtDLFNBQUwsQ0FBZUYsUUFBZjtBQUxZO0FBTWI7Ozs7NEJBRU87QUFDTjs7QUFFQSxVQUFNRyxRQUFRLEVBQUVDLE9BQU8sU0FBVCxFQUFkO0FBQ0EsV0FBS0MsSUFBTCxHQUFZLDBCQUFrQlAsUUFBbEIsRUFBNEJLLEtBQTVCLEVBQW1DLEVBQW5DLEVBQXVDLEVBQXZDLENBQVo7O0FBRUEsV0FBS0csS0FBTDtBQUNEOzs7eUJBRUlMLEcsRUFBSztBQUFBOztBQUNSLFdBQUtNLElBQUw7O0FBRUEsV0FBS0YsSUFBTCxDQUFVRixLQUFWLENBQWdCQyxLQUFoQixHQUF3QixTQUF4QjtBQUNBLFdBQUtDLElBQUwsQ0FBVUcsTUFBVixDQUFpQixpQkFBakI7O0FBRUEsYUFBTyxzQkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsWUFBTUMsTUFBTSxJQUFJQyxjQUFKLEVBQVo7QUFDQUQsWUFBSUUsWUFBSixHQUFtQixNQUFuQjtBQUNBRixZQUFJRyxNQUFKLEdBQWEsVUFBQ0MsQ0FBRCxFQUFPO0FBQ2xCLGNBQU1DLE1BQU1ELEVBQUVFLGFBQWQ7O0FBRUEsY0FBSUQsSUFBSUUsTUFBSixLQUFlLEdBQW5CLEVBQXdCO0FBQ3RCVCxvQkFBUVUsT0FBT0MsR0FBUCxDQUFXQyxlQUFYLENBQTJCTCxJQUFJTSxRQUEvQixDQUFSO0FBQ0EsbUJBQUtDLElBQUw7QUFDRCxXQUhELE1BR087QUFDTCxtQkFBS2xCLElBQUwsQ0FBVUYsS0FBVixDQUFnQkMsS0FBaEIsR0FBd0IsT0FBeEI7QUFDQSxtQkFBS0MsSUFBTCxDQUFVRixLQUFWLENBQWdCRixHQUFoQixHQUFzQixJQUFJdUIsTUFBSixDQUFXdkIsR0FBWCxDQUF0QjtBQUNBLG1CQUFLSSxJQUFMLENBQVVHLE1BQVYsQ0FBaUIsaUJBQWpCO0FBQ0Q7QUFDRixTQVhEOztBQWFBRyxZQUFJYyxJQUFKLENBQVMsS0FBVCxFQUFnQnhCLEdBQWhCLEVBQXFCLElBQXJCO0FBQ0FVLFlBQUllLElBQUo7QUFDRCxPQWxCTSxDQUFQO0FBbUJEOzs7OztBQUdILHVCQUFlQyxRQUFmLENBQXdCOUIsVUFBeEIsRUFBb0NFLFdBQXBDOztrQkFFZUEsVyIsImZpbGUiOiJWaWRlb0xvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZpY2UsIHNlcnZpY2VNYW5hZ2VyLCBTZWdtZW50ZWRWaWV3IH0gZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuXG5jb25zdCBTRVJWSUNFX0lEID0gJ3NlcnZpY2U6dmlkZW8tbG9hZGVyJztcblxuY29uc3QgdGVtcGxhdGUgPSBgXG4gIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcFwiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICA8JSBpZiAoc3RhdGUgPT09ICdsb2FkaW5nJykgeyAlPlxuICAgICAgPHA+TG9hZGluZyB2aWRlby4uLjwvcD5cbiAgICA8JSB9IGVsc2UgaWYgKHN0YXRlID09PSAnZXJyb3InKSB7ICU+XG4gICAgICA8cCBjbGFzcz1cInJlZFwiPkVycm9yIGxvYWRpbmc6IDwlPSBzcmMgJT48L3A+XG4gICAgPCUgfSAlPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tXCI+PC9kaXY+XG5gO1xuXG5jbGFzcyBWaWRlb0xvYWRlciBleHRlbmRzIFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihTRVJWSUNFX0lELCBmYWxzZSk7XG5cbiAgICBjb25zdCBkZWZhdWx0cyA9IHsgc3JjOiBudWxsIH07XG5cbiAgICB0aGlzLmNvbmZpZ3VyZShkZWZhdWx0cyk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgY29uc3QgbW9kZWwgPSB7IHN0YXRlOiAnbG9hZGluZycgfTtcbiAgICB0aGlzLnZpZXcgPSBuZXcgU2VnbWVudGVkVmlldyh0ZW1wbGF0ZSwgbW9kZWwsIHt9LCB7fSk7XG5cbiAgICB0aGlzLnJlYWR5KCk7XG4gIH1cblxuICBsb2FkKHNyYykge1xuICAgIHRoaXMuc2hvdygpO1xuXG4gICAgdGhpcy52aWV3Lm1vZGVsLnN0YXRlID0gJ2xvYWRpbmcnO1xuICAgIHRoaXMudmlldy5yZW5kZXIoJy5zZWN0aW9uLWNlbnRlcicpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgIHhoci5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSBlLmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgIHJlc29sdmUod2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwocmVzLnJlc3BvbnNlKSk7XG4gICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52aWV3Lm1vZGVsLnN0YXRlID0gJ2Vycm9yJztcbiAgICAgICAgICB0aGlzLnZpZXcubW9kZWwuc3JjID0gbmV3IFN0cmluZyhzcmMpO1xuICAgICAgICAgIHRoaXMudmlldy5yZW5kZXIoJy5zZWN0aW9uLWNlbnRlcicpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB4aHIub3BlbignR0VUJywgc3JjLCB0cnVlKTtcbiAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuc2VydmljZU1hbmFnZXIucmVnaXN0ZXIoU0VSVklDRV9JRCwgVmlkZW9Mb2FkZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBWaWRlb0xvYWRlcjtcbiJdfQ==