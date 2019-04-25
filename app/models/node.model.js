/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : note.models.js        
 *  @author         : Kiran B.E.
 *  @version        : v0.1
 *  @since          : 16-03-2019
 ******************************************************************************/
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
/*********************************************************************
 * @description : Creating note schema using mongoose
 *********************************************************************/
var noteSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User_id required"],
        // ref: 'Note'
    },
    title: {
        type: String,
        required: [true, "Title required"]
    },
    description: {
        type: String,
        required: [true, "Description required"]
    },
    reminder: {
        type: String
    },
    color: {
        type: String
    },
    image: {
        type: String
    },
    archive: {
        type: Boolean
    },
    pinned: {
        type: Boolean
    },
    trash: {
        type: Boolean
    },
    label: {
        type: String,
        ref : "labelSchema"
    }
}, {
    timestamps: true
});
var note = mongoose.model('Note', noteSchema);

function noteModel() {}
/*******************************************************************************************************
 * @description:it will add the notes data using note schema and save the data into the database
 * @param {*request from frontend} objectNote 
 * @param {*response to backend} callback 
 ******************************************************************************************************/
noteModel.prototype.addNotes = (objectNote, callback) => {
   // console.log("data-->", objectNote);
    const noteModel = new note(objectNote.body);
    noteModel.save((err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
/*******************************************************************************
 * @description:it will get the notes using userId and find the notes with data
 * @param : {*request from frontend} id 
 * @param : {*response to backend} callback 
 ********************************************************************************/
noteModel.prototype.getNotes = (id, callback) => {
    // console.log("modelid",id.decoded);
    
    note.find({
        userId: id.decoded.id
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}
module.exports = new noteModel();


/************************************************************************
 * @description:
 * @param : noteID 
 * @param : updateParams 
 * @param : callback 
 ************************************************************************/
noteModel.prototype.updateColor = (noteID, updateParams, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                color: updateParams
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, updateParams);
            }
        });
};
/*********************************************************************
 * @description:
 * @param : data 
 * @param : callback 
 **********************************************************************/
noteModel.prototype.deleteNote = (data, callback) => {
    note.deleteOne({
        _id: data.body.noteID
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            const obj = {
                status: 200,
                msg: "note is deleted successfully"
            }
            return callback(null, obj)
        }
    })
};
/***************************************************************************
 * 
 * @param : noteID 
 * @param : archiveParams 
 * @param : callback 
 ****************************************************************************/
noteModel.prototype.isArchived = (noteID, archiveNote, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                archive: archiveNote,
                trash: false,
                pinned: false
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, archiveNote)
            }
        });
};
/************************************************************************************
 * @param : id 
 * @param : callback 
 ****************************************************************************************/
noteModel.prototype.getTrashStatus = (id, callback) => {
    note.findOne({
        _id: id
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
         //   console.log("dtaa in getrash notes==>",result.trash);
            
            return callback(null, result.trash)
        }
    })
}
/*****************************************************************************************
 * @param : noteID 
 * @param : trashStatus 
 * @param : callback 
 *****************************************************************************************/
noteModel.prototype.isTrashed = (noteID, trashNote, callback) => {
    
    // console.log("dtaa in getrash notes==>",trashNote)
    // console.log("dtaa in getrash notes==>",noteID)
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                trash: trashNote.status,
               
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, trashNote.status)
            }
        });
};
/****************************************************************************
 * @param {*} noteID 
 * @param {*} reminderParams 
 * @param {*} callback 
 ********************************************************************************/
noteModel.prototype.reminder = (noteID, reminderParams, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                reminder: reminderParams
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, reminderParams)
            }
        });
};
/****************************************************************************************
 * @param : noteID 
 * @param : titleParams 
 * @param : callback 
 ****************************************************************************************/
noteModel.prototype.editTitle = (noteID, titleParams, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                title: titleParams,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, titleParams)
            }

        });
}
/*************************************************************************************************
 * @param : noteID 
 * @param : descParams 
 * @param : callback 
 ****************************************************************************************************/
noteModel.prototype.editDescription = (noteID, descParams, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                description: descParams,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, descParams)
            }
        });
};
/*******************************************************************************************
 * @param : noteID 
 * @param : pinParams 
 * @param : callback 
 ********************************************************************************************/
noteModel.prototype.isPinned = (noteID, pinParams, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                pinned: pinParams,
                trash: false,
                archive: false
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, pinParams)
            }
        });
};
/**************************************************************************************************
 * 
 * @param : noteID 
 * @param : updateNote 
 * @param : callback 
 * 
 *************************************************************************************************/
noteModel.prototype.updateImage = (noteID, updateNote, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                image: updateNote
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                console.log("updated image to note successfully")
                return callback(null, updateNote)
            }
        });
};


/*********************************************************************
 * @description : Creating Label schema using mongoose
 *********************************************************************/

var labelSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'UserSchema'
    },
    label: {
        type: String,
        require: [true, "Label require"],
        unique: true
    }
},{
    timestamps:true
}
)
var label = mongoose.model('Label', labelSchema);

/************************************************************************************************
 * 
 * @param : labelData 
 * @param : callback 
 *********************************************************************************************/
noteModel.prototype.addLabel = (labelData, callback) => {
    console.log("ultimate save", labelData);
    const Data = new label(labelData);
    Data.save((err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log("label result", result);
            return callback(null, result);
        }
    })
};

/*********************************************************************************************
 * 
 * @param : id 
 * @param : callback 
 *********************************************************************************************/
noteModel.prototype.getLabels = (id, callback) => {
    console.log("in model", id);
    label.find({ userID: id.userID }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            console.log("labels", result)
            return callback(null, result)
        }
    })
};

/*****************************************************************************************************
 * 
 * @param : id 
 * @param : callback 
 *****************************************************************************************************/
noteModel.prototype.deleteLabel = (id, callback) => {
    console.log("in model", id);
    label.deleteOne({ _id: id.labelID }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            console.log("labels", result)
            return callback(null, result)
        }
    })
};

/**************************************************************************************
 * 
 * @param : changedLabel 
 * @param : callback 
 ****************************************************************************************/
noteModel.prototype.updateLabel = (changedLabel, callback) => {
    var editLabel = null;
    var labelId = null;
    console.log("in model", changedLabel);
    if (changedLabel != null) {
        editLabel = changedLabel.editLabel;
        labelId = changedLabel.labelID
    } else {
        callback("Pinned note not found")
    }
    label.findOneAndUpdate(
        {
            _id: labelId
        },
        {
            $set: {
                label: editLabel
            }
        },
        (err, result) => {
            if (err) {
                console.log("in modelerr");
                callback(err)
            } else {
                console.log("in modelsuccess");
                return callback(null, changedLabel)
            }
        });
};

/********************************************************************************************
 * 
 * @param : labelParams 
 * @param : callback 
 *****************************************************************************************/
noteModel.prototype.saveLabelToNote = (labelParams, callback) => {
    // console.log("in model", labelParams.noteID);
    var labelledNote = null;
    var noteID = null;
    if (labelParams != null) {
        labelledNote = labelParams.label;
        noteID = labelParams.noteID;
    } else {
        console.log("in modelerr");

        callback("Pinned note not found")
    }
    note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $push: {
                label: labelledNote,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                console.log("in model success");
                let res = result.label;
                res.push(labelledNote);
                return callback(null, res)
            }
        });
};

/**************************************************************************************************
 * 
 * @param : labelParams 
 * @param : callback 
 *************************************************************************************************/
noteModel.prototype.deleteLabelToNote = (labelParams, callback) => {
    // console.log("in model", labelParams.noteID);
    var labelledNote = null;
    var noteID = null;
    if (labelParams != null) {
        labelledNote = labelParams.value;
        noteID = labelParams.noteID;
    } else {
        console.log("in modelerr");

        callback("Pinned note not found")
    }
    note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $pull: {
                label: labelledNote,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                let newArray = result.label;
                // console.log("in model success result",result);

                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i] === labelledNote) {
                        newArray.splice(i, 1);
                        return callback(null, newArray)
                    }
                }
            }
        });
};

module.exports = new noteModel();