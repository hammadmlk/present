/*
 * Singleton class for connecting to IO Server and sending/recieving messages
 * Note: Having a single instance is important for the entire app to be able to send/recieve data using the same socket connection
 */

const React = require('react');

const ServerCommunicatorSingleton = ( function() {

    var _instance;

    return {
        getInstance: function() {
            if (_instance == null) {
                const socket = io.connect();
                _instance = new ServerCommunicator(socket);
            }
            return _instance;
        }
    };
} )();

// Server Communicator Class 
const ServerCommunicator = function(socket) {

    this._socket = socket;

    this.updateSlideTitle = function(presentationID, slideID, newValue) {
        this._socket.emit('update slide title', {
            presentationID: presentationID,
            slideID: slideID,
            newValue: newValue
        });
    };

    this.updateSlideSubTitle = function(presentationID, slideID, newValue) {
        this._socket.emit('update slide subTitle', {
            presentationID: presentationID,
            slideID: slideID,
            newValue: newValue
        });
    };

    this.onPresentationHasNewData = function(callback) {
        this._socket.on("presentation has new data", callback);
    };

    _selfValidate = function() {
        if (this._socket instanceof io.Socket === false) {
            console.error("Server Communicator was initialized without a valid socket");
        }
    }.bind(this);

}

module.exports = ServerCommunicatorSingleton;