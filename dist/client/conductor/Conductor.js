'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var soundworks = _interopRequireWildcard(_client);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Conductor = function (_soundworks$Controlle) {
  (0, _inherits3.default)(Conductor, _soundworks$Controlle);

  function Conductor(score) {
    (0, _classCallCheck3.default)(this, Conductor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Conductor.__proto__ || (0, _getPrototypeOf2.default)(Conductor)).call(this));

    _this.score = score;

    _this.setGuiOptions('transport', { type: 'buttons' });
    _this.setGuiOptions('playbackRate', { type: 'slider', size: 'large' });
    _this.setGuiOptions('volume:performers', { type: 'slider', size: 'large' });
    _this.setGuiOptions('volume:env', { type: 'slider', size: 'large' });
    _this.setGuiOptions('seek', { type: 'slider', size: 'large' });
    _this.setGuiOptions('reload', { confirm: true });

    for (var name in score.parts) {
      if (score.parts[name].type === 'env') _this.setGuiOptions('volume:env:' + name, { type: 'slider', size: 'large' });
    }
    return _this;
  }

  (0, _createClass3.default)(Conductor, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      (0, _get3.default)(Conductor.prototype.__proto__ || (0, _getPrototypeOf2.default)(Conductor.prototype), 'start', this).call(this);

      var score = this.score;

      // update current section name and trigger pause feedback

      var _loop = function _loop(sectionName) {
        _this2.sharedParams.addParamListener(sectionName, function (value) {
          console.log(sectionName, value);
          _this2.sharedParams.update('currentSection', sectionName, false);
          // pause players on section changes
          _this2.sharedParams.update('seek', score.sections[sectionName].time, false);
          _this2.sharedParams.update('transport', 'Pause', false);
        });
      };

      for (var sectionName in score.sections) {
        _loop(sectionName);
      }

      this.sharedParams.addParamListener('seek', function (value) {
        _this2.sharedParams.update('transport', 'Pause', false);
      });

      // handle volumes
      this.sharedParams.addParamListener('volume:env', function (value) {
        for (var name in score.parts) {
          if (score.parts[name].type === 'env') _this2.sharedParams.update('volume:env:' + name, value);
        }
      });
    }
  }]);
  return Conductor;
}(soundworks.ControllerExperience);

exports.default = Conductor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbmR1Y3Rvci5qcyJdLCJuYW1lcyI6WyJzb3VuZHdvcmtzIiwiQ29uZHVjdG9yIiwic2NvcmUiLCJzZXRHdWlPcHRpb25zIiwidHlwZSIsInNpemUiLCJjb25maXJtIiwibmFtZSIsInBhcnRzIiwic2VjdGlvbk5hbWUiLCJzaGFyZWRQYXJhbXMiLCJhZGRQYXJhbUxpc3RlbmVyIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlIiwic2VjdGlvbnMiLCJ0aW1lIiwiQ29udHJvbGxlckV4cGVyaWVuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUFZQSxVOzs7Ozs7SUFFTkMsUzs7O0FBQ0oscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFHakIsVUFBS0EsS0FBTCxHQUFhQSxLQUFiOztBQUVBLFVBQUtDLGFBQUwsQ0FBbUIsV0FBbkIsRUFBZ0MsRUFBRUMsTUFBTSxTQUFSLEVBQWhDO0FBQ0EsVUFBS0QsYUFBTCxDQUFtQixjQUFuQixFQUFtQyxFQUFFQyxNQUFNLFFBQVIsRUFBa0JDLE1BQU0sT0FBeEIsRUFBbkM7QUFDQSxVQUFLRixhQUFMLENBQW1CLG1CQUFuQixFQUF3QyxFQUFFQyxNQUFNLFFBQVIsRUFBa0JDLE1BQU0sT0FBeEIsRUFBeEM7QUFDQSxVQUFLRixhQUFMLENBQW1CLFlBQW5CLEVBQWlDLEVBQUVDLE1BQU0sUUFBUixFQUFrQkMsTUFBTSxPQUF4QixFQUFqQztBQUNBLFVBQUtGLGFBQUwsQ0FBbUIsTUFBbkIsRUFBMkIsRUFBRUMsTUFBTSxRQUFSLEVBQWtCQyxNQUFNLE9BQXhCLEVBQTNCO0FBQ0EsVUFBS0YsYUFBTCxDQUFtQixRQUFuQixFQUE2QixFQUFFRyxTQUFTLElBQVgsRUFBN0I7O0FBRUEsU0FBSyxJQUFJQyxJQUFULElBQWlCTCxNQUFNTSxLQUF2QixFQUE4QjtBQUM1QixVQUFJTixNQUFNTSxLQUFOLENBQVlELElBQVosRUFBa0JILElBQWxCLEtBQTJCLEtBQS9CLEVBQ0UsTUFBS0QsYUFBTCxpQkFBaUNJLElBQWpDLEVBQXlDLEVBQUVILE1BQU0sUUFBUixFQUFrQkMsTUFBTSxPQUF4QixFQUF6QztBQUNIO0FBZmdCO0FBZ0JsQjs7Ozs0QkFFTztBQUFBOztBQUNOOztBQUVBLFVBQU1ILFFBQVEsS0FBS0EsS0FBbkI7O0FBRUE7O0FBTE0saUNBTUdPLFdBTkg7QUFPSixlQUFLQyxZQUFMLENBQWtCQyxnQkFBbEIsQ0FBbUNGLFdBQW5DLEVBQWdELFVBQUNHLEtBQUQsRUFBVztBQUN6REMsa0JBQVFDLEdBQVIsQ0FBWUwsV0FBWixFQUF5QkcsS0FBekI7QUFDQSxpQkFBS0YsWUFBTCxDQUFrQkssTUFBbEIsQ0FBeUIsZ0JBQXpCLEVBQTJDTixXQUEzQyxFQUF3RCxLQUF4RDtBQUNBO0FBQ0EsaUJBQUtDLFlBQUwsQ0FBa0JLLE1BQWxCLENBQXlCLE1BQXpCLEVBQWlDYixNQUFNYyxRQUFOLENBQWVQLFdBQWYsRUFBNEJRLElBQTdELEVBQW1FLEtBQW5FO0FBQ0EsaUJBQUtQLFlBQUwsQ0FBa0JLLE1BQWxCLENBQXlCLFdBQXpCLEVBQXNDLE9BQXRDLEVBQStDLEtBQS9DO0FBQ0QsU0FORDtBQVBJOztBQU1OLFdBQUssSUFBSU4sV0FBVCxJQUF3QlAsTUFBTWMsUUFBOUIsRUFBd0M7QUFBQSxjQUEvQlAsV0FBK0I7QUFRdkM7O0FBRUQsV0FBS0MsWUFBTCxDQUFrQkMsZ0JBQWxCLENBQW1DLE1BQW5DLEVBQTJDLGlCQUFTO0FBQ2xELGVBQUtELFlBQUwsQ0FBa0JLLE1BQWxCLENBQXlCLFdBQXpCLEVBQXNDLE9BQXRDLEVBQStDLEtBQS9DO0FBQ0QsT0FGRDs7QUFJQTtBQUNBLFdBQUtMLFlBQUwsQ0FBa0JDLGdCQUFsQixDQUFtQyxZQUFuQyxFQUFpRCxVQUFDQyxLQUFELEVBQVc7QUFDMUQsYUFBSyxJQUFJTCxJQUFULElBQWlCTCxNQUFNTSxLQUF2QixFQUE4QjtBQUM1QixjQUFJTixNQUFNTSxLQUFOLENBQVlELElBQVosRUFBa0JILElBQWxCLEtBQTJCLEtBQS9CLEVBQ0UsT0FBS00sWUFBTCxDQUFrQkssTUFBbEIsaUJBQXVDUixJQUF2QyxFQUErQ0ssS0FBL0M7QUFDSDtBQUNGLE9BTEQ7QUFNRDs7O0VBOUNxQlosV0FBV2tCLG9COztrQkFpRHBCakIsUyIsImZpbGUiOiJDb25kdWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuY2xhc3MgQ29uZHVjdG9yIGV4dGVuZHMgc291bmR3b3Jrcy5Db250cm9sbGVyRXhwZXJpZW5jZSB7XG4gIGNvbnN0cnVjdG9yKHNjb3JlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcblxuICAgIHRoaXMuc2V0R3VpT3B0aW9ucygndHJhbnNwb3J0JywgeyB0eXBlOiAnYnV0dG9ucycgfSk7XG4gICAgdGhpcy5zZXRHdWlPcHRpb25zKCdwbGF5YmFja1JhdGUnLCB7IHR5cGU6ICdzbGlkZXInLCBzaXplOiAnbGFyZ2UnIH0pO1xuICAgIHRoaXMuc2V0R3VpT3B0aW9ucygndm9sdW1lOnBlcmZvcm1lcnMnLCB7IHR5cGU6ICdzbGlkZXInLCBzaXplOiAnbGFyZ2UnIH0pO1xuICAgIHRoaXMuc2V0R3VpT3B0aW9ucygndm9sdW1lOmVudicsIHsgdHlwZTogJ3NsaWRlcicsIHNpemU6ICdsYXJnZScgfSk7XG4gICAgdGhpcy5zZXRHdWlPcHRpb25zKCdzZWVrJywgeyB0eXBlOiAnc2xpZGVyJywgc2l6ZTogJ2xhcmdlJyB9KTtcbiAgICB0aGlzLnNldEd1aU9wdGlvbnMoJ3JlbG9hZCcsIHsgY29uZmlybTogdHJ1ZSB9KTtcblxuICAgIGZvciAobGV0IG5hbWUgaW4gc2NvcmUucGFydHMpIHtcbiAgICAgIGlmIChzY29yZS5wYXJ0c1tuYW1lXS50eXBlID09PSAnZW52JylcbiAgICAgICAgdGhpcy5zZXRHdWlPcHRpb25zKGB2b2x1bWU6ZW52OiR7bmFtZX1gLCB7IHR5cGU6ICdzbGlkZXInLCBzaXplOiAnbGFyZ2UnIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICBjb25zdCBzY29yZSA9IHRoaXMuc2NvcmU7XG5cbiAgICAvLyB1cGRhdGUgY3VycmVudCBzZWN0aW9uIG5hbWUgYW5kIHRyaWdnZXIgcGF1c2UgZmVlZGJhY2tcbiAgICBmb3IgKGxldCBzZWN0aW9uTmFtZSBpbiBzY29yZS5zZWN0aW9ucykge1xuICAgICAgdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcihzZWN0aW9uTmFtZSwgKHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlY3Rpb25OYW1lLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuc2hhcmVkUGFyYW1zLnVwZGF0ZSgnY3VycmVudFNlY3Rpb24nLCBzZWN0aW9uTmFtZSwgZmFsc2UpO1xuICAgICAgICAvLyBwYXVzZSBwbGF5ZXJzIG9uIHNlY3Rpb24gY2hhbmdlc1xuICAgICAgICB0aGlzLnNoYXJlZFBhcmFtcy51cGRhdGUoJ3NlZWsnLCBzY29yZS5zZWN0aW9uc1tzZWN0aW9uTmFtZV0udGltZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnNoYXJlZFBhcmFtcy51cGRhdGUoJ3RyYW5zcG9ydCcsICdQYXVzZScsIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc2hhcmVkUGFyYW1zLmFkZFBhcmFtTGlzdGVuZXIoJ3NlZWsnLCB2YWx1ZSA9PiB7XG4gICAgICB0aGlzLnNoYXJlZFBhcmFtcy51cGRhdGUoJ3RyYW5zcG9ydCcsICdQYXVzZScsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIC8vIGhhbmRsZSB2b2x1bWVzXG4gICAgdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcigndm9sdW1lOmVudicsICh2YWx1ZSkgPT4ge1xuICAgICAgZm9yIChsZXQgbmFtZSBpbiBzY29yZS5wYXJ0cykge1xuICAgICAgICBpZiAoc2NvcmUucGFydHNbbmFtZV0udHlwZSA9PT0gJ2VudicpXG4gICAgICAgICAgdGhpcy5zaGFyZWRQYXJhbXMudXBkYXRlKGB2b2x1bWU6ZW52OiR7bmFtZX1gLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29uZHVjdG9yO1xuIl19