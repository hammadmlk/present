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

    this.updateBulletText = function(presentationID, slideID, bulletID, newValue) {
        this._socket.emit('update bullet text', {
            presentationID: presentationID,
            slideID: slideID,
            bulletID: bulletID,
            newValue: newValue
        });
    };

    this.updateBulletTag = function(presentationID, slideID, bulletID, newValue) {
        this._socket.emit('update bullet tag', {
            presentationID: presentationID,
            slideID: slideID,
            bulletID: bulletID,
            newValue: newValue
        });
    };

    this.updateLinkText = function(presentationID, slideID, bulletID, linkID, newValue) {
        this._socket.emit('update link text', {
            presentationID: presentationID,
            slideID: slideID,
            bulletID: bulletID,
            linkID: linkID,
            newValue: newValue
        });
    };

    this.updateLinkURL = function(presentationID, slideID, bulletID, linkID, newValue) {
        this._socket.emit('update link url', {
            presentationID: presentationID,
            slideID: slideID,
            bulletID: bulletID,
            linkID: linkID,
            newValue: newValue
        });
    };

    this.addBullet = function(presentationID, slideID) {
        this._socket.emit('add bullet', {
            presentationID: presentationID,
            slideID: slideID
        });
    };

    this.addLink = function(presentationID, slideID, bulletID) {
        this._socket.emit('add link', {
            presentationID: presentationID,
            slideID: slideID,
            bulletID: bulletID
        });
    };

    this.deleteBullet = function(presentationID, slideID, bulletID) {
        this._socket.emit('delete bullet', {
            presentationID: presentationID,
            slideID: slideID,
            bulletID: bulletID
        });
    };

    this.deleteLink = function(presentationID, slideID, bulletID, linkID) {
        this._socket.emit('delete link', {
            presentationID: presentationID,
            slideID: slideID,
            bulletID: bulletID,
            linkID: linkID
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