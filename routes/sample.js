var express = require('express');
var router = express.Router();

/* GET sample listing. */
router.get('/', function(req, res, next) {
    res.send('Sample response');
});

module.exports = router;
