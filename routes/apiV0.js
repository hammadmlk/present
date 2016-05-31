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

    databaseController.addPresentation(name, function(err, data) {
        res.json({
            error: err,
            data: data,
            comment: 'Create a presentation'
        });
    })
});

// Create a slide
router.post('/presentations/:presentationID(\\d+)/slides', function(req, res, next) {
    const presentationID = parseInt(req.params.presentationID);

    databaseController.addSlide(presentationID, function(err, data) {
        res.json({
            error: err,
            data: data,
            comment: 'Create a slide in presentation ' + presentationID
        });
    })
});

//
// GET
//

// GET all presentations
router.get('/presentations', function(req, res, next) {
    databaseController.getPresentations(function(err, data) {
        res.json({
            error: err,
            data: data,
            comment: 'GET all presentations'
        });
    })
});

// GET a single presentation 
router.get('/presentations/:presentationID(\\d+)', function(req, res, next) {
    const presentationID = parseInt(req.params.presentationID);

    databaseController.getPresentation(presentationID, function(err, data) {
        res.json({
            error: err,
            data: data,
            comment: 'GET presentation ' + presentationID
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

    databaseController.putPresentation(presentationID, attributeName, attributeValue, function(err, data) {
        res.json({
            error: err,
            data: data,
            comment: util.format("PUT attr '%s' with value '%s' in presentation %s", attributeName, attributeValue, presentationID)
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

    if (attributeName.includes('.')) {
        // TODO: There must be a better way of returning error. Perhaps should create a new error class.
        res.json({
            error: {
                message: "Invalid attributeName: Syntax error; token: '.', in: " + attributeName,
                code: "ValidationException",
                statusCode: 400
            },
            data: null,
            comment: comment
        })
        return;
    }

    databaseController.putSlide(presentationID, slideID, attributeName, attributeValue, function(err, data) {
        res.json({
            error: err,
            data: data,
            comment: comment
        });
    })
});

module.exports = router;
