var express = require('express');
var router = express.Router();

/** -- User Routes -- */
router.use('/v1/user', require('./v1/user'));


module.exports = router;


