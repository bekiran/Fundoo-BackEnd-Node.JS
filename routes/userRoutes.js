/************************************************************************************
 * @purpose   : Used to provide user routes to web pages.
 * 
 * @file      : userRoutes.js
 * @overview  : provides routes to web pages.
 * @author    : bekiranabbi@gmail.com
 * @version   : 1.0
 * @since     : 04.03.2019
 * 
 *************************************************************************************/

const express = require('express');
const router = express.Router();
const ctr1User = require('../controllers/user.controller');
const middle= require('../authentication/index')
const upload = require ('../middleware/fileUpload')


router.post('/login',ctr1User.login);
router.post('/register', ctr1User.register);
router.post('/forgotPassword', ctr1User.forgotPassword);
router.post('/resetPassword/:token', middle.auth, ctr1User.resetPassword);
router.put('/setProfilePic', middle.auth, upload.single('image'), ctr1User.setProfilePic);

module.exports = router;