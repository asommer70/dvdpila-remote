
/*
WebSocket Interface for the WebSocketRails client.
 */

 // import WebSocketRails from './websocket_rails';
 import AbstractConnection from './abstract_connection';

  // var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    // hasProp = {}.hasOwnProperty;
class WebSocketConnection extends AbstractConnection {
  // WebSocketRails.WebSocketConnection = (function(superClass) {
  //   extend(WebSocketConnection, superClass);
  //
  //   WebSocketConnection.prototype.connection_type = 'websocket';

  constructor(url, dispatcher) {
    super();

    this.connection_type = 'websocket';
    this.url = url;
    this.dispatcher = dispatcher;
    // WebSocketConnection.__super__.constructor.apply(this, arguments);
    if (this.url.match(/^wss?:\/\//)) {
      console.log("WARNING: Using connection urls with protocol specified is depricated");
    } else if (window.location.protocol === 'https:') {
      this.url = "wss://" + this.url;
    } else {
      this.url = "ws://" + this.url;
    }
    this._conn = new WebSocket(this.url);
    this._conn.onmessage = (function(_this) {
      // console.log('WebSocketConnection contrscutor this._conn.onmessage callback _this:', _this);
      return function(event) {
        var event_data;
        event_data = JSON.parse(event.data);
        return _this.on_message(event_data);
      };
    })(this);
    this._conn.onclose = (function(_this) {
      return function(event) {
        return _this.on_close(event);
      };
    })(this);
    this._conn.onerror = (function(_this) {
      return function(event) {
        return _this.on_error(event);
      };
    })(this);
  }

  close() {
    return this._conn.close();
  };

  send_event(event) {
    super.send_event.apply(this, arguments);
    return this._conn.send(event.serialize());
  }

    // return WebSocketConnection;

  // })(WebSocketRails.AbstractConnection);
}

export default WebSocketConnection;
