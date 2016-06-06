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

var docClient = new AWS.DynamoDB.DocumentClient()
var tableName = "Presentations";

function PresentationDBController() {
    'use strict';

    // Create a presentation
    this.addPresentation = function(name) {
        return addPresentation(docClient, tableName, name);
    }

    // Create a slide in a presentation
    this.addSlide = function(presentationID) {
        return addSlide(docClient, tableName, presentationID);
    }

    // GET all presentations
    this.getPresentations = function() {
        return getPresentations(docClient, tableName);
    }

    // GET presentation by ID
    this.getPresentation = function(presentationID) {
        return getPresentation(docClient, tableName, presentationID);
    }

    // PUT an attribute in presentation
    this.putPresentation = function(presentationID, attributeName, attributeValue) {
        return putAttribute.putPresentation(
            docClient,
            tableName,
            presentationID,
            attributeName,
            attributeValue
        );
    }

    // PUT an attribute in slide of presentation
    this.putSlide = function(presentationID, slideID, attributeName, attributeValue) {
        return putAttribute.putSlide(
            docClient,
            tableName,
            presentationID,
            slideID,
            attributeName,
            attributeValue
        )
    }
}

module.exports = new PresentationDBController();

