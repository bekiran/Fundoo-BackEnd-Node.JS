/************************************************************************************
 * @purpose   : Used to provide routes to web pages.
 * 
 * @file      : routes.js
 * @overview  : provides routes to web pages.
 * @author    : bekiranabbi@gmail.com
 * @version   : 1.0
 * @since     : 04.03.2019
 * 
 *************************************************************************************/

const ctr1User = require('../controllers/user.controller');
const express = require('express');
const note = require('../controllers/note.controller');
const router = express.Router();
const middle= require('../authentication/index')


router.post('/login',ctr1User.login);
router.post('/register', ctr1User.register);
router.post('/forgotPassword', ctr1User.forgotPassword);
router.post('/resetPassword/:token', middle.auth, ctr1User.resetPassword);


router.post('/createNote',middle.auth,  note.createNote);
router.get("/getNotes",middle.auth, note.getNotes);
router.put('/updateColor', middle.auth, note.updateColor);
router.put('/isTrashed',middle.auth, note.isTrashed);
router.put('/reminder',middle.auth,note.reminder);
router.put('/isArchived',middle.auth,note.isArchived);
router.post('/deleteNote',middle.auth, note.deleteNote);
router.put('/editTitle', middle.auth, note.editTitle);
router.put('/editDescription', middle.auth, note.editDescription);
router.put('/isPinned', middle.auth, note.isPinned);
router.put('/uploadImage', middle.auth, note.updateImage);
router.post('/addLabel', middle.auth, note.addLabel);
router.get('/getLabels', middle.auth, note.getLabels);
router.post('/deleteLabel', middle.auth, note.deleteLabel);
router.put('/updateLabel', middle.auth, note.updateLabel);
router.post('/saveLabelToNote', middle.auth, note.saveLabelToNote);
router.post('/deleteLabelToNote', middle.auth, note.deleteLabelToNote)


module.exports = router;