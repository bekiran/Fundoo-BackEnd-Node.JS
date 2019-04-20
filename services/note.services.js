/******************************************************************************
 *  @Purpose        : To create note services that will send the incoming data 
 *                  to noteModel and save that data to database and at login 
 *                  time fetching correct information from database.
 *  @file           : note.services.js        
 *  @author         : Kiran B.E.
 *  @version        : v0.1
 *  @since          : 16-03-2019
 ******************************************************************************/
const noteModel = require('../app/models/node.model');
/***********************************************************
 * @param : data 
 * @param : callback 
 ************************************************************/
exports.createNote = (data, callback) => {
    noteModel.addNotes(data, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            console.log("In service", result);
            callback(null, result);
        }
    });
}
/********************************************************************
 * 
 * @param : data 
 * @param : callback 
 ********************************************************************/
exports.getNotes = (data, callback) => {
    noteModel.getNotes(data, (err, result) => {
        if (err) {
            // console.log("service error");
            callback(err);
        } else {
        //    console.log("In service", result);
            callback(null, result);
        }
    });
}

/**************************************************************************
 * 
 * @param : paramID 
 * @param : paramData 
 * @param : callback 
 **************************************************************************/
exports.updateColor = (paramID, paramData, callback) => {
    // console.log("in services paramID & param Data -->", paramID, paramData);
    noteModel.updateColor(paramID, paramData, (err, result) => {
        if (err) {
            // console.log("service error");
            callback(err);
        } else {
            return callback(null, result);
        }
    })
}

exports.deleteNote = (noteID, callback) => {
    noteModel.deleteNote(noteID, (err, result) => {
        if (err) {
            // console.log("service error");

            callback(err)
        } else {
            return callback(null, result)
        }
    })

}

/**********************************************************************
 * 
 * @param : paramID 
 * @param : callback 
 ***********************************************************************/
exports.isTrashed = (paramID, callback) => {
    // console.log("in services", paramID);
    
    noteModel.getTrashStatus(paramID, (err, status) => {
        if (err) {
            callback(err);
        } else {
            if (status === true) {
                let data = {
      
                 status: false
                }
                noteModel.isTrashed(paramID, data, (err, result) => {
                    if (err) {
                        callback(err);
                    } else {
                        return callback(null, result)
                    }
                })
            } else if (status === false) {
                let data = {
                    status: true
                }
                noteModel.isTrashed(paramID, data, (err, result) => {
                    if (err) {
                        callback(err);
                    } else {
                        return callback(null, result)
                    }
                })
            }

       }
     })
}
/***************************************************************************************
 * 
 * @param : paramID 
 * @param : paramData 
 * @param : callback 
 ****************************************************************************************/
exports.isArchived = (paramID, paramData, callback) => {
    // console.log("in services", paramID, paramData);
    noteModel.isArchived(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

/***************************************************************************************
 * @param : paramID 
 * @param : paramData 
 * @param : callback 
 *****************************************************************************************/
exports.reminder = (paramID, paramData, callback) => {
    // console.log("in services", paramID, paramData);

    noteModel.reminder(paramID, paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/*************************************************************************************
 * 
 * @param : paramID 
 * @param : paramData 
 * @param : callback 
 *
 **************************************************************************************/
exports.editTitle = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);
    noteModel.editTitle(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/***************************************************************************************************
 * 
 * @param : paramID 
 * @param : paramData 
 * @param : callback 
 *
 ***************************************************************************************************/
exports.editDescription = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);
    noteModel.editDescription(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/******************************************************************************************************
 * 
 * @param : paramID 
 * @param : paramData 
 * @param : callback 
 *
 *******************************************************************************************************/
exports.isPinned = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);
    noteModel.isPinned(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/******************************************************************************************
 * 
 * @param : paramID 
 * @param : image 
 * @param : callback 
 * 
 ******************************************************************************************/
exports.updateImage = (paramID, image, callback) => {
    noteModel.updateImage(paramID, image, (err, result) => {
        // console.log("in services result in note image",result);
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            console.log("in image service...");
            return callback(null, result)
        }
    })
}
/**************************************************************************************
 * 
 * @param : labelData 
 * @param : callback 
 ***********************************************************************************************/
exports.addLabel = (labelData, callback) => {
    console.log("in services",labelData);
    noteModel.addLabel(labelData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/****************************************************************************************
 * 
 * @param : labelData 
 * @param : callback 
 ***************************************************************************************/
exports.getLabels = (labelData, callback) => {
    console.log("in services",labelData);
    noteModel.getLabels(labelData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/*******************************************************************
 * 
 * @param : labelData 
 * @param : callback 
 **********************************************************************/
exports.deleteLabel = (labelData, callback) => {
    console.log("in services",labelData);
    noteModel.deleteLabel(labelData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/******************************************************************************
 * 
 * @param : labelData 
 * @param : callback 
 ****************************************************************************/
exports.updateLabel = (labelData, callback) => {
    console.log("in services",labelData);
    noteModel.updateLabel( labelData,(err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

/**********************************************************************
 * 
 * @param : paramData 
 * @param : callback 
 ***********************************************************************/
exports.saveLabelToNote = ( paramData, callback) => {
    console.log("in services", paramData);
    if(paramData.pull){
        noteModel.deleteLabelToNote(paramData, (err, result) => {
            if (err) {
                callback(err);
            } else {
                return callback(null, result)
            }
        })
    }
    else{
        noteModel.saveLabelToNote(paramData, (err, result) => {
            if (err) {
                callback(err);
            } else {
                return callback(null, result)
            }
        })
    }
}
/***********************************************************************
 * 
 * @param : paramData 
 * @param : callback 
 ************************************************************************/
exports.deleteLabelToNote = ( paramData, callback) => {
    console.log("in services", paramData);
    noteModel.deleteLabelToNote(paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
