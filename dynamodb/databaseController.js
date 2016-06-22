const debug = require('debug')('databaseController');
const Promise = require('promise');
const AWS = require("aws-sdk");
const addPresentation = require('./addPresentation');
const addSlide = require('./addSlide');
const addBullet = require('./addBullet');
const addLink = require('./addLink');
const getPresentations = require('./getPresentations');
const getPresentation = require('./getPresentation');
const putAttribute = require('./putAttribute');
const deleteAttribute = require('./deleteAttribute');

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

    // Create a bullet in a slide of a presentation
    this.addBullet = function(presentationID, slideID) {
        return addBullet(docClient, tableName, presentationID, slideID);
    }

    // Create a link in a bullet of a slide of a presentation
    this.addLink = function(presentationID, slideID, bulletID) {
        return addLink(docClient, tableName, presentationID, slideID, bulletID);
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

    // PUT an attribute in a bullet of a slide of a presentation
    this.putBullet = function(presentationID, slideID, bulletID, attributeName, attributeValue) {
        return putAttribute.putBullet(
            docClient,
            tableName,
            presentationID,
            slideID,
            bulletID,
            attributeName,
            attributeValue
        )
    }

    // PUT an attribute in a link of a bullet of a slide of a presentation
    this.putLink = function(presentationID, slideID, bulletID, linkID, attributeName, attributeValue) {
        return putAttribute.putLink(
            docClient,
            tableName,
            presentationID,
            slideID,
            bulletID,
            linkID,
            attributeName,
            attributeValue
        )
    }

    // DELETE a bullet from a slide of a presentation
    this.deleteBullet = function(presentationID, slideID, bulletID) {
        return deleteAttribute.deleteBullet(docClient, tableName, presentationID, slideID, bulletID);
    }

    // DELETE a link from a bullet of a slide of a presentation
    this.deleteLink = function(presentationID, slideID, bulletID, linkID) {
        return deleteAttribute.deleteLink(docClient, tableName, presentationID, slideID, bulletID, linkID);
    }
}

module.exports = new PresentationDBController();

