const express = require('express');
const router = express.Router();
const util = require('util');

const databaseController = require('../dynamodb/databaseController')

/**
API V0 Routes
**/

// Welcome Message
router.get('/', function(req, res, next) {
    res.json({
        message: 'Welcome to Present - Simple elegant presentations | API v0 '
    });
});

//
// CREATE
//

// Create a presentation
router.post('/presentations', function(req, res, next) {

    const name = req.body.name || 'A Presentation has no name'; // Name of the presentation
    const comment = 'Create a presentation';
    databaseController.addPresentation(name)
        .then(function(data) {
            res.json({
                data: data,
                comment: comment
            });
        })
        .catch(function(err) {
            res.json({
                error: err,
                comment: comment
            });
        })
});

// Create a slide
router.post('/presentations/:presentationID(\\d+)/slides', function(req, res, next) {
    const presentationID = parseInt(req.params.presentationID);
    const comment = 'Create a slide in presentation ' + presentationID;
    databaseController.addSlide(presentationID)
        .then(function(data) {
            res.json({
                data: data,
                comment: comment
            });
        })
        .catch(function(err) {
            res.json({
                error: err,
                comment: comment
            })
        })
});

// Create a bullet
router.post('/presentations/:presentationID(\\d+)/slides/:slideID/bullets', function(req, res, next) {
    const presentationID = parseInt(req.params.presentationID);
    const slideID = req.params.slideID;
    const comment = 'Create a bullet in a slide ' + slideID + ' of presentation ' + presentationID;
    databaseController.addBullet(presentationID, slideID)
        .then(function(data) {
            res.json({
                data: data,
                comment: comment
            });
        })
        .catch(function(err) {
            res.json({
                error: err,
                comment: comment
            })
        })
});

//
// GET
//

// GET all presentations
router.get('/presentations', function(req, res, next) {
    const comment = 'GET all presentations'
    databaseController.getPresentations()
        .then(function(data) {
            res.json({
                data: data,
                comment: comment
            });
        })
        .catch(function(err) {
            res.json({
                error: err,
                comment: comment
            });
        })
});

// GET a single presentation 
router.get('/presentations/:presentationID(\\d+)', function(req, res, next) {
    const presentationID = parseInt(req.params.presentationID);
    const comment = 'GET presentation ' + presentationID
    databaseController.getPresentation(presentationID)
        .then(function(data) {
            res.json({
                data: data,
                comment: comment
            });
        })
        .catch(function(err) {
            res.json({
                error: err,
                comment: comment
            });
        })
});

//
// PUT
//

// PUT the  supplied attributeName and attributeValue in the presentation
router.put('/presentations/:presentationID(\\d+)', function(req, res, next) {
    const presentationID = parseInt(req.params.presentationID);

    const attributeName = req.body.attributeName;
    const attributeValue = req.body.attributeValue;

    const comment = util.format("PUT attr '%s' with value '%s' in presentation %s", attributeName, attributeValue, presentationID)

    databaseController.putPresentation(presentationID, attributeName, attributeValue)
        .then(function(data) {
            res.json({
                data: data,
                comment: comment
            });
        })
        .catch(function(err) {
            res.json({
                error: err,
                comment: comment
            });
        })
});

// PUT the  supplied attributeName and attributeValue in slide of presentation
router.put('/presentations/:presentationID(\\d+)/slides/:slideID', function(req, res, next) {
    const presentationID = parseInt(req.params.presentationID);
    const slideID = req.params.slideID;

    const attributeName = req.body.attributeName;
    const attributeValue = req.body.attributeValue;

    const comment = util.format("PUT attr '%s' with value '%s' in slide %s of presentation %s", attributeName, attributeValue, slideID, presentationID)

    databaseController.putSlide(presentationID, slideID, attributeName, attributeValue)
        .then(function(data) {
            res.json({
                data: data,
                comment: comment
            });
        })
        .catch(function(err) {
            res.json({
                error: err,
                comment: comment
            });
        })
});

// PUT the  supplied attributeName and attributeValue in slide of presentation
router.put('/presentations/:presentationID(\\d+)/slides/:slideID/bullets/:bulletID', function(req, res, next) {
    const presentationID = parseInt(req.params.presentationID);
    const slideID = req.params.slideID;
    const bulletID = req.params.bulletID;

    const attributeName = req.body.attributeName;
    const attributeValue = req.body.attributeValue;

    const comment = util.format("PUT attr '%s' with value '%s' in bullet %s of slide %s of presentation %s", attributeName, attributeValue, bulletID, slideID, presentationID)

    databaseController.putBullet(presentationID, slideID, bulletID, attributeName, attributeValue)
        .then(function(data) {
            res.json({
                data: data,
                comment: comment
            });
        })
        .catch(function(err) {
            res.json({
                error: err,
                comment: comment
            });
        })
});

module.exports = router;
