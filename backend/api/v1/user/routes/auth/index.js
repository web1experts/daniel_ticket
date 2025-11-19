var express = require('express');
var router = express.Router();
var authController = require('../../controllers/auth.controller'); 


/** -- Auth Routes Starts --*/

/** -- Login Route -- */
router.post('/login', authController.login);
router.post('/request-otp', authController.forgetPassword); 
router.post('/verify-pass-otp', authController.verifyPassOtp); 
router.post('/reset-pass', authController.resetPass); 
router.post('/register', authController.signUp);
router.post('/verify-otp', authController.verifyOtp);

module.exports = router;
