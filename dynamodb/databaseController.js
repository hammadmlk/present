const debug = require('debug')('databaseController');
const Promise = require('promise');
const AWS = require("aws-sdk");
const addPresentation = require('./addPresentation');
const addSlide = require('./addSlide');
const getPresentations = require('./getPresentations');
const getPresentation = require('./getPresentation');
const putAttribute = require('./putAttribute');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

function PresentationDBController(docClient) {
    'use strict';
    this._docClient = docClient
    this._tableName = "Presentations";

    // Create a presentation
    this.addPresentation = function(name, callback) {
        addPresentation(this._docClient, this._tableName, name, callback);
    }

    // Create a slide in a presentation
    this.addSlide = function(PresentationID, callback) {
        addSlide(this._docClient, this._tableName, PresentationID, callback);
    }

    // GET all presentations
    this.getPresentations = function(callback) {
        getPresentations(this._docClient, this._tableName, callback);
    }

    // GET presentation by ID
    this.getPresentation = function(presentationID, callback) {
        getPresentation(this._docClient, this._tableName, presentationID, callback);
    }

    // PUT an attribute in presentation
    this.putPresentation = function(presentationID, attributeName, attributeValue, callback) {
        putAttribute.putPresentation(
            this._docClient,
            this._tableName,
            presentationID,
            attributeName,
            attributeValue,
            callback
        );
    }

    // PUT an attribute in slide of presentation
    this.putSlide = function(presentationID, slideID, attributeName, attributeValue, callback) {
        putAttribute.putSlide(
            this._docClient,
            this._tableName,
            presentationID,
            slideID,
            attributeName,
            attributeValue,
            callback
        );
    }
}

module.exports = new PresentationDBController(new AWS.DynamoDB.DocumentClient());