
var express = require('express');
var router = express.Router();
var auth    =  require('./routes/auth');


/** -- Client Routes --- */
router.use('/auth', auth);


module.exports = router;