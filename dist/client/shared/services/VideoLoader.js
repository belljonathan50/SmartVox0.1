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

      this.view = new _client.SegmentedView(template, model, {}, {
        className: ['foreground'],
        id: 'video-loader'
      });

      this.ready();
    }
  }, {
    key: 'load',
    value: function load(src) {
      var _this2 = this;

      this.show();

      var $container = document.querySelector('#container');

      this.view.model.state = 'loading';
      this.view.render('.section-center');
      this.view.show();
      this.view.appendTo($container);

      return new _promise2.default(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
          var res = e.currentTarget;

          if (res.status === 200) {
            resolve(window.URL.createObjectURL(res.response));
            _this2.view.hide();
            _this2.view.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZpZGVvTG9hZGVyLmpzIl0sIm5hbWVzIjpbIlNFUlZJQ0VfSUQiLCJ0ZW1wbGF0ZSIsIlZpZGVvTG9hZGVyIiwiZGVmYXVsdHMiLCJzcmMiLCJjb25maWd1cmUiLCJtb2RlbCIsInN0YXRlIiwidmlldyIsImNsYXNzTmFtZSIsImlkIiwicmVhZHkiLCJzaG93IiwiJGNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInJlbmRlciIsImFwcGVuZFRvIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwicmVzcG9uc2VUeXBlIiwib25sb2FkIiwiZSIsInJlcyIsImN1cnJlbnRUYXJnZXQiLCJzdGF0dXMiLCJ3aW5kb3ciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJyZXNwb25zZSIsImhpZGUiLCJyZW1vdmUiLCJTdHJpbmciLCJvcGVuIiwic2VuZCIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQSxhQUFhLHNCQUFuQjs7QUFFQSxJQUFNQyxtVUFBTjs7SUFZTUMsVzs7O0FBQ0oseUJBQWM7QUFBQTs7QUFBQSxnSkFDTkYsVUFETSxFQUNNLEtBRE47O0FBR1osUUFBTUcsV0FBVyxFQUFFQyxLQUFLLElBQVAsRUFBakI7O0FBRUEsVUFBS0MsU0FBTCxDQUFlRixRQUFmO0FBTFk7QUFNYjs7Ozs0QkFFTztBQUNOOztBQUVBLFVBQU1HLFFBQVEsRUFBRUMsT0FBTyxTQUFULEVBQWQ7O0FBRUEsV0FBS0MsSUFBTCxHQUFZLDBCQUFrQlAsUUFBbEIsRUFBNEJLLEtBQTVCLEVBQW1DLEVBQW5DLEVBQXVDO0FBQ2pERyxtQkFBVyxDQUFDLFlBQUQsQ0FEc0M7QUFFakRDLFlBQUk7QUFGNkMsT0FBdkMsQ0FBWjs7QUFLQSxXQUFLQyxLQUFMO0FBQ0Q7Ozt5QkFFSVAsRyxFQUFLO0FBQUE7O0FBQ1IsV0FBS1EsSUFBTDs7QUFFQSxVQUFNQyxhQUFhQyxTQUFTQyxhQUFULENBQXVCLFlBQXZCLENBQW5COztBQUVBLFdBQUtQLElBQUwsQ0FBVUYsS0FBVixDQUFnQkMsS0FBaEIsR0FBd0IsU0FBeEI7QUFDQSxXQUFLQyxJQUFMLENBQVVRLE1BQVYsQ0FBaUIsaUJBQWpCO0FBQ0EsV0FBS1IsSUFBTCxDQUFVSSxJQUFWO0FBQ0EsV0FBS0osSUFBTCxDQUFVUyxRQUFWLENBQW1CSixVQUFuQjs7QUFFQSxhQUFPLHNCQUFZLFVBQUNLLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxZQUFNQyxNQUFNLElBQUlDLGNBQUosRUFBWjtBQUNBRCxZQUFJRSxZQUFKLEdBQW1CLE1BQW5CO0FBQ0FGLFlBQUlHLE1BQUosR0FBYSxVQUFDQyxDQUFELEVBQU87QUFDbEIsY0FBTUMsTUFBTUQsRUFBRUUsYUFBZDs7QUFFQSxjQUFJRCxJQUFJRSxNQUFKLEtBQWUsR0FBbkIsRUFBd0I7QUFDdEJULG9CQUFRVSxPQUFPQyxHQUFQLENBQVdDLGVBQVgsQ0FBMkJMLElBQUlNLFFBQS9CLENBQVI7QUFDQSxtQkFBS3ZCLElBQUwsQ0FBVXdCLElBQVY7QUFDQSxtQkFBS3hCLElBQUwsQ0FBVXlCLE1BQVY7QUFDRCxXQUpELE1BSU87QUFDTCxtQkFBS3pCLElBQUwsQ0FBVUYsS0FBVixDQUFnQkMsS0FBaEIsR0FBd0IsT0FBeEI7QUFDQSxtQkFBS0MsSUFBTCxDQUFVRixLQUFWLENBQWdCRixHQUFoQixHQUFzQixJQUFJOEIsTUFBSixDQUFXOUIsR0FBWCxDQUF0QjtBQUNBLG1CQUFLSSxJQUFMLENBQVVRLE1BQVYsQ0FBaUIsaUJBQWpCO0FBQ0Q7QUFDRixTQVpEOztBQWNBSSxZQUFJZSxJQUFKLENBQVMsS0FBVCxFQUFnQi9CLEdBQWhCLEVBQXFCLElBQXJCO0FBQ0FnQixZQUFJZ0IsSUFBSjtBQUNELE9BbkJNLENBQVA7QUFvQkQ7Ozs7O0FBR0gsdUJBQWVDLFFBQWYsQ0FBd0JyQyxVQUF4QixFQUFvQ0UsV0FBcEM7O2tCQUVlQSxXIiwiZmlsZSI6IlZpZGVvTG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmljZSwgc2VydmljZU1hbmFnZXIsIFNlZ21lbnRlZFZpZXcgfSBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5cbmNvbnN0IFNFUlZJQ0VfSUQgPSAnc2VydmljZTp2aWRlby1sb2FkZXInO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbiAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wXCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPlxuICAgIDwlIGlmIChzdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7ICU+XG4gICAgICA8cD5Mb2FkaW5nIHZpZGVvLi4uPC9wPlxuICAgIDwlIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdlcnJvcicpIHsgJT5cbiAgICAgIDxwIGNsYXNzPVwicmVkXCI+RXJyb3IgbG9hZGluZzogPCU9IHNyYyAlPjwvcD5cbiAgICA8JSB9ICU+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b21cIj48L2Rpdj5cbmA7XG5cbmNsYXNzIFZpZGVvTG9hZGVyIGV4dGVuZHMgU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFNFUlZJQ0VfSUQsIGZhbHNlKTtcblxuICAgIGNvbnN0IGRlZmF1bHRzID0geyBzcmM6IG51bGwgfTtcblxuICAgIHRoaXMuY29uZmlndXJlKGRlZmF1bHRzKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICBjb25zdCBtb2RlbCA9IHsgc3RhdGU6ICdsb2FkaW5nJyB9O1xuXG4gICAgdGhpcy52aWV3ID0gbmV3IFNlZ21lbnRlZFZpZXcodGVtcGxhdGUsIG1vZGVsLCB7fSwge1xuICAgICAgY2xhc3NOYW1lOiBbJ2ZvcmVncm91bmQnXSxcbiAgICAgIGlkOiAndmlkZW8tbG9hZGVyJyxcbiAgICB9KTtcblxuICAgIHRoaXMucmVhZHkoKTtcbiAgfVxuXG4gIGxvYWQoc3JjKSB7XG4gICAgdGhpcy5zaG93KCk7XG5cbiAgICBjb25zdCAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhaW5lcicpO1xuXG4gICAgdGhpcy52aWV3Lm1vZGVsLnN0YXRlID0gJ2xvYWRpbmcnO1xuICAgIHRoaXMudmlldy5yZW5kZXIoJy5zZWN0aW9uLWNlbnRlcicpO1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gICAgdGhpcy52aWV3LmFwcGVuZFRvKCRjb250YWluZXIpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgIHhoci5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSBlLmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgIHJlc29sdmUod2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwocmVzLnJlc3BvbnNlKSk7XG4gICAgICAgICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgICAgICAgICB0aGlzLnZpZXcucmVtb3ZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52aWV3Lm1vZGVsLnN0YXRlID0gJ2Vycm9yJztcbiAgICAgICAgICB0aGlzLnZpZXcubW9kZWwuc3JjID0gbmV3IFN0cmluZyhzcmMpO1xuICAgICAgICAgIHRoaXMudmlldy5yZW5kZXIoJy5zZWN0aW9uLWNlbnRlcicpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB4aHIub3BlbignR0VUJywgc3JjLCB0cnVlKTtcbiAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuc2VydmljZU1hbmFnZXIucmVnaXN0ZXIoU0VSVklDRV9JRCwgVmlkZW9Mb2FkZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBWaWRlb0xvYWRlcjtcbiJdfQ==