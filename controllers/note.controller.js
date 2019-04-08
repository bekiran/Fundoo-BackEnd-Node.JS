/******************************************************************************
 *  @Purpose        : To create note controller to handle the incoming data. 
 *  @file           : note.controllers.js        
 *  @author         : Kiran B.E.
 *  @version        : v0.1
 *  @since          : 16-03-2019
 ******************************************************************************/
const noteService = require('../services/note.services');
/************************************************
 * @description:it handles the creating note data
 * @param : (request from client): req 
 * @param : (response from server): res 
 ***********************************************/
exports.createNote = (req, res) => {
    try {
        var responseResult = {};
        noteService.createNote(req, (err, result) => {
            if (err) {
                responseResult.status = false;
                responseResult.message = 'Failed to create note!';
                responseResult.error = err;
                res.status(500).send(responseResult);
            } else {
                var userNote = {
                    note: result,
                }
                responseResult.status = true;
                responseResult.message = result;
                responseResult.data = userNote;
                res.status(200).send(responseResult);
            }
        })
    } catch (err) {
        res.send("error in creating note",err);
    }
}
/**************************************************************
 * @description: To get the created note with data 
 * @param : (request from client):req 
 * @param : (response from server):res
 **************************************************************/
exports.getNotes = (req, res) => {
    // try {
        // console.log("note Controller", req);
        var responseResult = {};
        noteService.getNotes(req, (err, result) => {
            if (err) {
                responseResult.status = false;
                responseResult.message = 'Failed to retrieve note from DB!';
                responseResult.error = err;
                res.status(500).send(responseResult);
            } else {
                responseResult.status = true;
                responseResult.message = 'Note retrieved from DB successfully';
                responseResult.data = result;
                res.status(200).send(responseResult);
            }
        })
    // } catch (err) {
    //     res.send("error in getting notes",err)
    // }
}
/***************************************************************************
 * @description: To update color of note
 * @param : req (request from client)
 * @param : res (response from server)
 ****************************************************************************/
exports.updateColor = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        req.checkBody('color', 'color should not be empty').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            color = req.body.color;
            console.log("controller noteId: ",noteID);
            console.log("controller color: ",color);
            
            noteService.updateColor(noteID, color, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error);
    }
}
/**************************************************************************
 * @description: To delete note Permently
 * @param : req (request from client)
 * @param : res (response from server)
 ***************************************************************************/
exports.deleteNote = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteService.deleteNote(req, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);;
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {

        res.send(error)
    }
}

/*****************************************************************************************
 * @description: To delete note and store the deleted note in trash
 * @param : req 
 * @param : res 
 **********************************************************************************************/
exports.isTrashed = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            noteService.isTrashed(noteID,(err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/************************************************************************************
 * @description: to store the notes in Archive. Notes that you no longer need to use regularly
 * @param : req 
 * @param : res 
 *********************************************************************************/
exports.isArchived = (req, res) => {
    // console.log("controller",req);
    
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        // req.checkBody('archive', 'archive required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            archive = req.body.archive;
            // console.log(archive)
            noteService.isArchived(noteID, archive, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/*****************************************************************************************************
 * @description: To create remainder of a note
 * @param : req 
 * @param : res 
 ****************************************************************************************************/
exports.reminder = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            reminder = req.body.reminder;
            noteService.reminder(noteID, reminder, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/*******************************************************************************************
 * @description: To edit the title of a note
 * @param : req 
 * @param : res 
 *******************************************************************************************/
exports.editTitle = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            title = req.body.title;
            noteService.editTitle(noteID, title, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/*******************************************************************************
 * @description: to edit the discription of a note
 * @param : req 
 * @param : res 
 *
 *******************************************************************************/
exports.editDescription = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            description = req.body.description;
            noteService.editDescription(noteID, description, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/****************************************************************************************************
 * @description: to check status of note if it is pinned or not
 * @param : req 
 * @param : res 
 ****************************************************************************************************/
exports.isPinned = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            pinned = req.body.pinned;
            noteService.isPinned(noteID, pinned, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/*************************************************************************************
 * @description: To update image to note
 * @param : req 
 * @param : res 
 *************************************************************************************/
exports.updateImage = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            let imageUp=(req.file.location);
            noteService.updateImage(noteID, imageUp, (err, result) => {
                console.log("image : ===>",result);
                if (err) {
                    responseResult.success = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult)
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error);
    }
}