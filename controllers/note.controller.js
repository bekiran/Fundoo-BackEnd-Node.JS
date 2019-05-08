/******************************************************************************
 *  @Purpose        : To create note controller to handle the incoming data.
 *  @file           : note.controllers.js
 *  @author         : Kiran B.E.
 *  @version        : v0.1
 *  @since          : 16-03-2019
 ******************************************************************************/
const noteService = require("../services/note.services");
const collaboratorService = require('../services/note.services')
const sentmail = require('../middleware/sendmail')

const redis = require('redis');

const responseTime = require('response-time')
const express = require('express');
const app = express(); 


/************************************************************************************
 * 
 * @Description : login is used to ckeck the data is present in database or not...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/

 const client = redis.createClient();
 
 //to print redis error
 client.on('error',(err) => {
     console.log("Error", err);
     
 });

 app.use(responseTime());

 /*************************** Caching with Redis  *********************************/

 /**************************************************************
 * @description: To get the created note with data
 * @param : (request from client):req
 * @param : (response from server):res
 **************************************************************/

// exports.getNotes = (req, res) => {
//     var responseResult = {}
//     /******************************************************
//      * @description: pass the req data to sevices...
//      ******************************************************/
//    var userID= req.decoded.id;
    
//     return client.get(userID, (err, result) => {
//         // If that key exist in Redis store
//         console.log("result inn redis==>", result);
//         console.log("redis cacheee entered first");
//         if (result) {
//         //console.log("json", JSON.parse(result));
//         JSON.parse(result);
//         console.log('redis cache data ==>' + result);
//            const resultJSON = JSON.parse(result);
//            responseResult.result =  resultJSON ;
//                 return res.status(200).send(responseResult);
//             }else{
//                 noteService.getNotes(req, (err, result) => {
//                     if (err) {
//                         responseResult.sucess = false;
//                         responseResult.result = err;
//                         res.status(500).send(responseResult);
//                     }
//                     else {
//                         responseResult.sucess = true;
//                         responseResult.result = result;
//                         client.setex(userID, 3600, JSON.stringify(result));
//                         res.status(200).send(responseResult);
//                     }
//                 })
//             }
//         })
//     }


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
                responseResult.message = "Failed to create note!";
                responseResult.error = err;
                res.status(500).send(responseResult);
            } else {
                var userNote = {
                    note: result
                };
                responseResult.status = true;
                responseResult.message = result;
                responseResult.message = "Note retrieved from DB successfully";
                responseResult.data = userNote;
                res.status(200).send(responseResult);
            }
        });
    } catch (err) {
        res.send("error in creating note", err);
    }
};
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
            responseResult.message = "Failed to retrieve note from DB!";
            responseResult.error = err;
            res.status(500).send(responseResult);
        } else {
            responseResult.status = true;
            responseResult.message = "Note retrieved from DB successfully";
            responseResult.data = result;
            res.status(200).send(responseResult);
        }
    });
    // } catch (err) {
    //     res.send("error in getting notes",err)
    // }
};

    
/***************************************************************************
 * @description: To update color of note
 * @param : req (request from client)
 * @param : res (response from server)
 ****************************************************************************/
exports.updateColor = (req, res) => {
    try {
        req
            .checkBody("noteID", "noteID required")
            .not()
            .isEmpty();
        req
            .checkBody("color", "color should not be empty")
            .not()
            .isEmpty();
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
            // console.log("controller noteId: ",noteID);
            // console.log("controller color: ",color);

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
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/**************************************************************************
 * @description: To delete note Permently
 * @param : req (request from client)
 * @param : res (response from server)
 ***************************************************************************/
exports.deleteNote = (req, res) => {
    try {
        req
            .checkBody("noteID", "noteID required")
            .not()
            .isEmpty();
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
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};

/*****************************************************************************************
 * @description: To delete note and store the deleted note in trash
 * @param : req
 * @param : res
 **********************************************************************************************/
exports.isTrashed = (req, res) => {
    try {
        req
            .checkBody("noteID", "noteID required")
            .not()
            .isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            noteService.isTrashed(noteID, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/************************************************************************************
 * @description: to store the notes in Archive. Notes that you no longer need to use regularly
 * @param : req
 * @param : res
 *********************************************************************************/
exports.isArchived = (req, res) => {
    // console.log("controller",req);

    try {
        req
            .checkBody("noteID", "noteID required")
            .not()
            .isEmpty();
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
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/*****************************************************************************************************
 * @description: To create remainder of a note
 * @param : req
 * @param : res
 ****************************************************************************************************/
exports.reminder = (req, res) => {
    try {
        req
            .checkBody("noteID", "noteID required")
            .not()
            .isEmpty();
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
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/*******************************************************************************************
 * @description: To edit the title of a note
 * @param : req
 * @param : res
 *******************************************************************************************/
exports.editTitle = (req, res) => {
    try {
        req
            .checkBody("noteID", "noteID required")
            .not()
            .isEmpty();
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
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/*******************************************************************************
 * @description: to edit the discription of a note
 * @param : req
 * @param : res
 *
 *******************************************************************************/
exports.editDescription = (req, res) => {
    try {
        req
            .checkBody("noteID", "noteID required")
            .not()
            .isEmpty();
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
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/****************************************************************************************************
 * @description: to check status of note if it is pinned or not
 * @param : req
 * @param : res
 ****************************************************************************************************/
exports.isPinned = (req, res) => {
    try {
        req
            .checkBody("noteID", "noteID required")
            .not()
            .isEmpty();
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
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/*************************************************************************************
 * @description: To update image to note
 * @param : req
 * @param : res
 *************************************************************************************/
exports.updateImage = (req, res) => {
    try {
        // console.log("req.file------>", req.file);
        req
            .checkBody("noteID", "noteID required")
            .not()
            .isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            let imageUp = req.body.image;
            // let imageUp = (req.file.location);
            noteService.updateImage(noteID, imageUp, (err, result) => {
                if (err) {
                    responseResult.success = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/**************************************************************************************
 *
 * @param : req
 * @param : res
 ******************************************************************************/
exports.addLabel = (req, res) => {
    // console.log(req,"hkjhskj");

    try {
        // console.log("req-------------------->", req);
        // req.checkBody('userID', 'userID required').not().isEmpty();
        req
            .checkBody("label", "label required")
            .not()
            .isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                userID: req.decoded.id,
                label: req.body.label
            };
            noteService.addLabel(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/**********************************************************************************
 *
 * @param : req
 * @param : res
 *******************************************************************************/
exports.getLabels = (req, res) => {
    try {
        // console.log("req-------------------->", req);
        // req.checkBody('userID', 'userID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                userID: req.decoded.id
            };
            noteService.getLabels(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/***************************************************************************************
 *
 * @param : req
 * @param : res
 *************************************************************************************/
exports.deleteLabel = (req, res) => {
    try {
        console.log("req-------------------->", req);
        req
            .checkBody("labelID", "labelID required")
            .not()
            .isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                labelID: req.body.labelID
            };
            noteService.deleteLabel(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/************************************************************************************
 *
 * @param : req
 * @param : res
 ********************************************************************************/
exports.updateLabel = (req, res) => {
    try {
        console.log("req-------------------->", req);
        req
            .checkBody("labelID", "labelID required")
            .not()
            .isEmpty();
        req
            .checkBody("editLabel", "editLabel required")
            .not()
            .isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                editLabel: req.body.editLabel,
                labelID: req.body.labelID
            };
            noteService.updateLabel(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};

/******************************************************************************************
 *
 * @param : req
 * @param : res
 ****************************************************************************************/
exports.saveLabelToNote = (req, res) => {
    try {
        console.log("save label to note ===>", req.body);

        req.checkBody("noteID", "noteID required").not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            noteService.saveLabelToNote(req.body, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};
/*****************************************************************************************
 * @param : req
 * @param : res
 **************************************************************************************/
exports.deleteLabelToNote = (req, res) => {
    try {
        console.log("delete note in controller", req.body);

        req
            .checkBody("noteID", "noteID required")
            .not()
            .isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            noteService.deleteLabelToNote(req.body, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};

/*******************************************************************************
 * @description:It handles save the collaborators
 * @param {*request from frontend} req
 * @param {*response from backend} res
 *********************************************************************************/
exports.saveCollaborator = (req, res) => {
    console.log("coll==>", req.body);
    
    try {
        req.checkBody('userID', 'userID required').not().isEmpty();
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        // req.checkBody('collabUserID', 'collabUserID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {

            console.log('in else part in controllerfdghfgjhdfthj');
            
            var responseResult = {};
            const collabData = {
                userID: req.body.userID,
                noteID: req.body.noteID,
                collabUserID: req.body.collabUserID
            }
            noteService.saveCollaborator(collabData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
                    responseResult.status = true;
                    responseResult.data = result;
                    const url = `you have been successfully collabed with one fundooNotes user`;
                    sentmail.sendEMailFunctionForCollaborator(url);
                    res.status(200).send(url);
                    //res.status(200).send(responseResult);
                }
            })
        }
    }
    catch (error) {
        console.log(error);
        
        res.send(error)
    }
}

/**********************************************************************************
 * @description:It handles to get collaborator details
 * @param {*request from frontend} req
 * @param {*response from backend} res
 
 **********************************************************************************/

 exports.getCollaborator=(req,res) => {
    //  try {
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const collabData = {
                userID: req.decoded.id
            };
            noteService.getCollaborator(collabData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
         
    //  } catch (error) {
    //      console.log("Error in get Collaborator");   
    //  }
 };

 /**********************************************************************************
 * @description:It handles delete collaborator details
 * @param {*request from frontend} req
 * @param {*response from backend} res
 
 **********************************************************************************/

exports.deleteCollaborator = (req, res) => {
    try {
        console.log("delete note in controller", req.body);

        // req.checkBody('userID', 'userID required').not().                                                                                                      isEmp                                      ty();
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        // req.checkBody('collabUserID', 'collabUserID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const collabData = {
                // userID: req.body.userID,
                noteID: req.body.noteID,
                collabUserID: req.body.collabUserID
            }
            // noteID = req.body.noteID;
            noteService.deleteCollaborator(collabData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};
// exports.getCollaborator = (req, res) => {
//     try {
//         // console.log("req-------------------->", req);
//         // req.checkBody('userID', 'userID required').not().isEmpty();
//         var errors = req.validationErrors();
//         var response = {};
//         if (errors) {
//             response.status = false;
//             response.error = errors;
//             return res.status(422).send(response);
//         } else {
//             var responseResult = {};
//             const CollaboratorData = {
//                 userID: req.decoded.id
//             };
//             noteService.getCollaborator(CollaboratorData , (err, result) => {
//                 if (err) {
//                     responseResult.status = false;
//                     responseResult.error = err;
//                     res.status(500).send(responseResult);
//                 } else {
//                     responseResult.status = true;
//                     responseResult.data = result;
//                     res.status(200).send(responseResult);
//                 }
//             });
//         }
//     } catch (error) {
//         res.send(error);
//     }
// };



// exports.getCollaboratorDetails = (req, res) => {
//     try {
//         var responseResult = {};
//         // console.log("in collab noteController", req.body);
//         noteService.getCollaboratorDetails((err, result) => {
//             console.log(err);
//             console.log(result);
//             if (err) {
//                 responseResult.status = false;
//                 responseResult.error = err;
//                 res.status(500).send(responseResult);
//             }
//             else {
//                 responseResult.status = true;
//                 responseResult.data = result;
//                 res.status(200).send(responseResult);
//             }
//         })
//     }
//     catch (error) {
//         res.send(error)
//     }
// }

exports.pushNotification = (req, res) => {
    try {
        console.log(
            "Reqest from backend in pushNotification==================>",
            req.body
        );
        req
            .checkBody("pushToken", "pushToken required")
            .not()
            .isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteService.pushNotification(req, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};

exports.sendPushNotification = (req, res) => {
    try {
        console.log("USER ID GIVEN IS ", req.params.userid);

        var responseResult = {};
        var user_id = req.params.userid;
        noteService.sendPushNotification(user_id, (err, result) => {
            if (err) {
                responseResult.status = false;
                responseResult.error = err;
                res.status(500).send(responseResult);
            } else {
                responseResult.status = true;
                responseResult.data = "Notification sent successfully!!";
                res.status(200).send(responseResult);
            }
        });
    } catch (error) {
        res.send(error);
    }
};

