'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();

// Configuration of the application.
// Other entries can be added (as long as their name doesn't conflict with
// existing ones) to define global parameters of the application (e.g. BPM,
// synth parameters) that can then be shared easily among all clients using
// the `shared-config` service.
exports.default = {
  // name of the application, used in the `.ejs` template and by default in
  // the `platform` service to populate its view
  appName: 'Template',

  // name of the environnement ('production' enable cache in express application)
  env: 'production',

  // version of application, can be used to force reload css and js files
  // from server (cf. `html/default.ejs`)
  version: '1.0.0',

  // name of the default client type, i.e. the client that can access the
  // application at its root URL
  defaultClient: 'player',

  // define from where the assets (static files) should be loaded, these value
  // could also refer to a separate server for scalability reasons. This value
  // should also be used client-side to configure the `loader` service.
  assetsDomain: '/',

  // port used to open the http server, in production this value is typically 80
  port: 8000,

  // describe the location where the experience takes places, theses values are
  // used by the `placer`, `checkin` and `locator` services.
  // if one of these service is required, this entry shouldn't be removed.
  setup: {
    area: {
      width: 1,
      height: 1,
      // path to an image to be used in the area representation
      background: null
    },
    // list of predefined labels
    labels: null,
    // list of predefined coordinates given as an array of `[x:Number, y:Number]`
    coordinates: null,
    // maximum number of clients allowed in a position
    maxClientsPerPosition: 100,
    // maximum number of positions (may limit or be limited by the number of
    // labels and/or coordinates)
    capacity: Infinity
  },

  // socket.io configuration
  socketIO: {
    url: '',
    transports: ['websocket']
    // @note: EngineIO defaults
    // pingTimeout: 3000,
    // pingInterval: 1000,
    // upgradeTimeout: 10000,
    // maxHttpBufferSize: 10E7,
  },

  // define if the HTTP server should be launched using secure connections.
  // For development purposes when set to `true` and no certificates are given
  // (cf. `httpsInfos`), a self-signed certificate is created.
  useHttps: false,

  // paths to the key and certificate to be used in order to launch the https
  // server. Both entries are required otherwise a self-signed certificate
  // is generated.
  httpsInfos: {
    key: null,
    cert: null
  },

  // password to be used by the `auth` service
  password: '',

  // configuration of the `osc` service
  osc: {
    // IP of the currently running node server
    receiveAddress: '127.0.0.1',
    // port listening for incomming messages
    receivePort: 57121,
    // IP of the remote application
    sendAddress: '127.0.0.1',
    // port where the remote application is listening for messages
    sendPort: 57120
  },

  // define if the server should use gzip compression for static files
  enableGZipCompression: true,

  // location of the public directory (accessible through http(s) requests)
  publicDirectory: _path2.default.join(cwd, 'public'),

  // directory where the server templating system looks for the `ejs` templates
  templateDirectory: _path2.default.join(cwd, 'html'),

  // bunyan configuration
  logger: {
    name: 'soundworks',
    level: 'info',
    streams: [{
      level: 'info',
      stream: process.stdout
    }]
  },

  // directory where error reported from the clients are written
  errorReporterDirectory: _path2.default.join(cwd, 'logs', 'clients')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHQuanMiXSwibmFtZXMiOlsiY3dkIiwicHJvY2VzcyIsImFwcE5hbWUiLCJlbnYiLCJ2ZXJzaW9uIiwiZGVmYXVsdENsaWVudCIsImFzc2V0c0RvbWFpbiIsInBvcnQiLCJzZXR1cCIsImFyZWEiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmQiLCJsYWJlbHMiLCJjb29yZGluYXRlcyIsIm1heENsaWVudHNQZXJQb3NpdGlvbiIsImNhcGFjaXR5IiwiSW5maW5pdHkiLCJzb2NrZXRJTyIsInVybCIsInRyYW5zcG9ydHMiLCJ1c2VIdHRwcyIsImh0dHBzSW5mb3MiLCJrZXkiLCJjZXJ0IiwicGFzc3dvcmQiLCJvc2MiLCJyZWNlaXZlQWRkcmVzcyIsInJlY2VpdmVQb3J0Iiwic2VuZEFkZHJlc3MiLCJzZW5kUG9ydCIsImVuYWJsZUdaaXBDb21wcmVzc2lvbiIsInB1YmxpY0RpcmVjdG9yeSIsImpvaW4iLCJ0ZW1wbGF0ZURpcmVjdG9yeSIsImxvZ2dlciIsIm5hbWUiLCJsZXZlbCIsInN0cmVhbXMiLCJzdHJlYW0iLCJzdGRvdXQiLCJlcnJvclJlcG9ydGVyRGlyZWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBQ0EsSUFBTUEsTUFBTUMsUUFBUUQsR0FBUixFQUFaOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7a0JBQ2U7QUFDYjtBQUNBO0FBQ0FFLFdBQVMsVUFISTs7QUFLYjtBQUNBQyxPQUFLLFlBTlE7O0FBUWI7QUFDQTtBQUNBQyxXQUFTLE9BVkk7O0FBWWI7QUFDQTtBQUNBQyxpQkFBZSxRQWRGOztBQWdCYjtBQUNBO0FBQ0E7QUFDQUMsZ0JBQWMsR0FuQkQ7O0FBcUJiO0FBQ0FDLFFBQU0sSUF0Qk87O0FBd0JiO0FBQ0E7QUFDQTtBQUNBQyxTQUFPO0FBQ0xDLFVBQU07QUFDSkMsYUFBTyxDQURIO0FBRUpDLGNBQVEsQ0FGSjtBQUdKO0FBQ0FDLGtCQUFZO0FBSlIsS0FERDtBQU9MO0FBQ0FDLFlBQVEsSUFSSDtBQVNMO0FBQ0FDLGlCQUFhLElBVlI7QUFXTDtBQUNBQywyQkFBdUIsR0FabEI7QUFhTDtBQUNBO0FBQ0FDLGNBQVVDO0FBZkwsR0EzQk07O0FBNkNiO0FBQ0FDLFlBQVU7QUFDUkMsU0FBSyxFQURHO0FBRVJDLGdCQUFZLENBQUMsV0FBRDtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQUSxHQTlDRzs7QUF3RGI7QUFDQTtBQUNBO0FBQ0FDLFlBQVUsS0EzREc7O0FBNkRiO0FBQ0E7QUFDQTtBQUNBQyxjQUFZO0FBQ1ZDLFNBQUssSUFESztBQUVWQyxVQUFNO0FBRkksR0FoRUM7O0FBcUViO0FBQ0FDLFlBQVUsRUF0RUc7O0FBd0ViO0FBQ0FDLE9BQUs7QUFDSDtBQUNBQyxvQkFBZ0IsV0FGYjtBQUdIO0FBQ0FDLGlCQUFhLEtBSlY7QUFLSDtBQUNBQyxpQkFBYSxXQU5WO0FBT0g7QUFDQUMsY0FBVTtBQVJQLEdBekVROztBQW9GYjtBQUNBQyx5QkFBdUIsSUFyRlY7O0FBdUZiO0FBQ0FDLG1CQUFpQixlQUFLQyxJQUFMLENBQVVqQyxHQUFWLEVBQWUsUUFBZixDQXhGSjs7QUEwRmI7QUFDQWtDLHFCQUFtQixlQUFLRCxJQUFMLENBQVVqQyxHQUFWLEVBQWUsTUFBZixDQTNGTjs7QUE2RmI7QUFDQW1DLFVBQVE7QUFDTkMsVUFBTSxZQURBO0FBRU5DLFdBQU8sTUFGRDtBQUdOQyxhQUFTLENBQUM7QUFDUkQsYUFBTyxNQURDO0FBRVJFLGNBQVF0QyxRQUFRdUM7QUFGUixLQUFEO0FBSEgsR0E5Rks7O0FBMEdiO0FBQ0FDLDBCQUF3QixlQUFLUixJQUFMLENBQVVqQyxHQUFWLEVBQWUsTUFBZixFQUF1QixTQUF2QjtBQTNHWCxDIiwiZmlsZSI6ImRlZmF1bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKCk7XG5cblxuLy8gQ29uZmlndXJhdGlvbiBvZiB0aGUgYXBwbGljYXRpb24uXG4vLyBPdGhlciBlbnRyaWVzIGNhbiBiZSBhZGRlZCAoYXMgbG9uZyBhcyB0aGVpciBuYW1lIGRvZXNuJ3QgY29uZmxpY3Qgd2l0aFxuLy8gZXhpc3Rpbmcgb25lcykgdG8gZGVmaW5lIGdsb2JhbCBwYXJhbWV0ZXJzIG9mIHRoZSBhcHBsaWNhdGlvbiAoZS5nLiBCUE0sXG4vLyBzeW50aCBwYXJhbWV0ZXJzKSB0aGF0IGNhbiB0aGVuIGJlIHNoYXJlZCBlYXNpbHkgYW1vbmcgYWxsIGNsaWVudHMgdXNpbmdcbi8vIHRoZSBgc2hhcmVkLWNvbmZpZ2Agc2VydmljZS5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gbmFtZSBvZiB0aGUgYXBwbGljYXRpb24sIHVzZWQgaW4gdGhlIGAuZWpzYCB0ZW1wbGF0ZSBhbmQgYnkgZGVmYXVsdCBpblxuICAvLyB0aGUgYHBsYXRmb3JtYCBzZXJ2aWNlIHRvIHBvcHVsYXRlIGl0cyB2aWV3XG4gIGFwcE5hbWU6ICdUZW1wbGF0ZScsXG5cbiAgLy8gbmFtZSBvZiB0aGUgZW52aXJvbm5lbWVudCAoJ3Byb2R1Y3Rpb24nIGVuYWJsZSBjYWNoZSBpbiBleHByZXNzIGFwcGxpY2F0aW9uKVxuICBlbnY6ICdwcm9kdWN0aW9uJyxcblxuICAvLyB2ZXJzaW9uIG9mIGFwcGxpY2F0aW9uLCBjYW4gYmUgdXNlZCB0byBmb3JjZSByZWxvYWQgY3NzIGFuZCBqcyBmaWxlc1xuICAvLyBmcm9tIHNlcnZlciAoY2YuIGBodG1sL2RlZmF1bHQuZWpzYClcbiAgdmVyc2lvbjogJzEuMC4wJyxcblxuICAvLyBuYW1lIG9mIHRoZSBkZWZhdWx0IGNsaWVudCB0eXBlLCBpLmUuIHRoZSBjbGllbnQgdGhhdCBjYW4gYWNjZXNzIHRoZVxuICAvLyBhcHBsaWNhdGlvbiBhdCBpdHMgcm9vdCBVUkxcbiAgZGVmYXVsdENsaWVudDogJ3BsYXllcicsXG5cbiAgLy8gZGVmaW5lIGZyb20gd2hlcmUgdGhlIGFzc2V0cyAoc3RhdGljIGZpbGVzKSBzaG91bGQgYmUgbG9hZGVkLCB0aGVzZSB2YWx1ZVxuICAvLyBjb3VsZCBhbHNvIHJlZmVyIHRvIGEgc2VwYXJhdGUgc2VydmVyIGZvciBzY2FsYWJpbGl0eSByZWFzb25zLiBUaGlzIHZhbHVlXG4gIC8vIHNob3VsZCBhbHNvIGJlIHVzZWQgY2xpZW50LXNpZGUgdG8gY29uZmlndXJlIHRoZSBgbG9hZGVyYCBzZXJ2aWNlLlxuICBhc3NldHNEb21haW46ICcvJyxcblxuICAvLyBwb3J0IHVzZWQgdG8gb3BlbiB0aGUgaHR0cCBzZXJ2ZXIsIGluIHByb2R1Y3Rpb24gdGhpcyB2YWx1ZSBpcyB0eXBpY2FsbHkgODBcbiAgcG9ydDogODAwMCxcblxuICAvLyBkZXNjcmliZSB0aGUgbG9jYXRpb24gd2hlcmUgdGhlIGV4cGVyaWVuY2UgdGFrZXMgcGxhY2VzLCB0aGVzZXMgdmFsdWVzIGFyZVxuICAvLyB1c2VkIGJ5IHRoZSBgcGxhY2VyYCwgYGNoZWNraW5gIGFuZCBgbG9jYXRvcmAgc2VydmljZXMuXG4gIC8vIGlmIG9uZSBvZiB0aGVzZSBzZXJ2aWNlIGlzIHJlcXVpcmVkLCB0aGlzIGVudHJ5IHNob3VsZG4ndCBiZSByZW1vdmVkLlxuICBzZXR1cDoge1xuICAgIGFyZWE6IHtcbiAgICAgIHdpZHRoOiAxLFxuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgLy8gcGF0aCB0byBhbiBpbWFnZSB0byBiZSB1c2VkIGluIHRoZSBhcmVhIHJlcHJlc2VudGF0aW9uXG4gICAgICBiYWNrZ3JvdW5kOiBudWxsLFxuICAgIH0sXG4gICAgLy8gbGlzdCBvZiBwcmVkZWZpbmVkIGxhYmVsc1xuICAgIGxhYmVsczogbnVsbCxcbiAgICAvLyBsaXN0IG9mIHByZWRlZmluZWQgY29vcmRpbmF0ZXMgZ2l2ZW4gYXMgYW4gYXJyYXkgb2YgYFt4Ok51bWJlciwgeTpOdW1iZXJdYFxuICAgIGNvb3JkaW5hdGVzOiBudWxsLFxuICAgIC8vIG1heGltdW0gbnVtYmVyIG9mIGNsaWVudHMgYWxsb3dlZCBpbiBhIHBvc2l0aW9uXG4gICAgbWF4Q2xpZW50c1BlclBvc2l0aW9uOiAxMDAsXG4gICAgLy8gbWF4aW11bSBudW1iZXIgb2YgcG9zaXRpb25zIChtYXkgbGltaXQgb3IgYmUgbGltaXRlZCBieSB0aGUgbnVtYmVyIG9mXG4gICAgLy8gbGFiZWxzIGFuZC9vciBjb29yZGluYXRlcylcbiAgICBjYXBhY2l0eTogSW5maW5pdHksXG4gIH0sXG5cbiAgLy8gc29ja2V0LmlvIGNvbmZpZ3VyYXRpb25cbiAgc29ja2V0SU86IHtcbiAgICB1cmw6ICcnLFxuICAgIHRyYW5zcG9ydHM6IFsnd2Vic29ja2V0J10sXG4gICAgLy8gQG5vdGU6IEVuZ2luZUlPIGRlZmF1bHRzXG4gICAgLy8gcGluZ1RpbWVvdXQ6IDMwMDAsXG4gICAgLy8gcGluZ0ludGVydmFsOiAxMDAwLFxuICAgIC8vIHVwZ3JhZGVUaW1lb3V0OiAxMDAwMCxcbiAgICAvLyBtYXhIdHRwQnVmZmVyU2l6ZTogMTBFNyxcbiAgfSxcblxuICAvLyBkZWZpbmUgaWYgdGhlIEhUVFAgc2VydmVyIHNob3VsZCBiZSBsYXVuY2hlZCB1c2luZyBzZWN1cmUgY29ubmVjdGlvbnMuXG4gIC8vIEZvciBkZXZlbG9wbWVudCBwdXJwb3NlcyB3aGVuIHNldCB0byBgdHJ1ZWAgYW5kIG5vIGNlcnRpZmljYXRlcyBhcmUgZ2l2ZW5cbiAgLy8gKGNmLiBgaHR0cHNJbmZvc2ApLCBhIHNlbGYtc2lnbmVkIGNlcnRpZmljYXRlIGlzIGNyZWF0ZWQuXG4gIHVzZUh0dHBzOiBmYWxzZSxcblxuICAvLyBwYXRocyB0byB0aGUga2V5IGFuZCBjZXJ0aWZpY2F0ZSB0byBiZSB1c2VkIGluIG9yZGVyIHRvIGxhdW5jaCB0aGUgaHR0cHNcbiAgLy8gc2VydmVyLiBCb3RoIGVudHJpZXMgYXJlIHJlcXVpcmVkIG90aGVyd2lzZSBhIHNlbGYtc2lnbmVkIGNlcnRpZmljYXRlXG4gIC8vIGlzIGdlbmVyYXRlZC5cbiAgaHR0cHNJbmZvczoge1xuICAgIGtleTogbnVsbCxcbiAgICBjZXJ0OiBudWxsLFxuICB9LFxuXG4gIC8vIHBhc3N3b3JkIHRvIGJlIHVzZWQgYnkgdGhlIGBhdXRoYCBzZXJ2aWNlXG4gIHBhc3N3b3JkOiAnJyxcblxuICAvLyBjb25maWd1cmF0aW9uIG9mIHRoZSBgb3NjYCBzZXJ2aWNlXG4gIG9zYzoge1xuICAgIC8vIElQIG9mIHRoZSBjdXJyZW50bHkgcnVubmluZyBub2RlIHNlcnZlclxuICAgIHJlY2VpdmVBZGRyZXNzOiAnMTI3LjAuMC4xJyxcbiAgICAvLyBwb3J0IGxpc3RlbmluZyBmb3IgaW5jb21taW5nIG1lc3NhZ2VzXG4gICAgcmVjZWl2ZVBvcnQ6IDU3MTIxLFxuICAgIC8vIElQIG9mIHRoZSByZW1vdGUgYXBwbGljYXRpb25cbiAgICBzZW5kQWRkcmVzczogJzEyNy4wLjAuMScsXG4gICAgLy8gcG9ydCB3aGVyZSB0aGUgcmVtb3RlIGFwcGxpY2F0aW9uIGlzIGxpc3RlbmluZyBmb3IgbWVzc2FnZXNcbiAgICBzZW5kUG9ydDogNTcxMjAsXG4gIH0sXG5cbiAgLy8gZGVmaW5lIGlmIHRoZSBzZXJ2ZXIgc2hvdWxkIHVzZSBnemlwIGNvbXByZXNzaW9uIGZvciBzdGF0aWMgZmlsZXNcbiAgZW5hYmxlR1ppcENvbXByZXNzaW9uOiB0cnVlLFxuXG4gIC8vIGxvY2F0aW9uIG9mIHRoZSBwdWJsaWMgZGlyZWN0b3J5IChhY2Nlc3NpYmxlIHRocm91Z2ggaHR0cChzKSByZXF1ZXN0cylcbiAgcHVibGljRGlyZWN0b3J5OiBwYXRoLmpvaW4oY3dkLCAncHVibGljJyksXG5cbiAgLy8gZGlyZWN0b3J5IHdoZXJlIHRoZSBzZXJ2ZXIgdGVtcGxhdGluZyBzeXN0ZW0gbG9va3MgZm9yIHRoZSBgZWpzYCB0ZW1wbGF0ZXNcbiAgdGVtcGxhdGVEaXJlY3Rvcnk6IHBhdGguam9pbihjd2QsICdodG1sJyksXG5cbiAgLy8gYnVueWFuIGNvbmZpZ3VyYXRpb25cbiAgbG9nZ2VyOiB7XG4gICAgbmFtZTogJ3NvdW5kd29ya3MnLFxuICAgIGxldmVsOiAnaW5mbycsXG4gICAgc3RyZWFtczogW3tcbiAgICAgIGxldmVsOiAnaW5mbycsXG4gICAgICBzdHJlYW06IHByb2Nlc3Muc3Rkb3V0LFxuICAgIH0sIC8qIHtcbiAgICAgIGxldmVsOiAnaW5mbycsXG4gICAgICBwYXRoOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2xvZ3MnLCAnc291bmR3b3Jrcy5sb2cnKSxcbiAgICB9ICovXVxuICB9LFxuXG4gIC8vIGRpcmVjdG9yeSB3aGVyZSBlcnJvciByZXBvcnRlZCBmcm9tIHRoZSBjbGllbnRzIGFyZSB3cml0dGVuXG4gIGVycm9yUmVwb3J0ZXJEaXJlY3Rvcnk6IHBhdGguam9pbihjd2QsICdsb2dzJywgJ2NsaWVudHMnKSxcbn1cbiJdfQ==