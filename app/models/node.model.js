/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : note.models.js        
 *  @author         : Kiran B.E.
 *  @version        : v0.1
 *  @since          : 16-03-2019
 ******************************************************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*********************************************************************
 * @description : Creating note schema using mongoose
 *********************************************************************/
var noteSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User_id required"],
        ref: 'Note'
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
    console.log("data-->", objectNote);
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
    
    console.log("dtaa in getrash notes==>",trashNote)
    console.log("dtaa in getrash notes==>",noteID)
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
                console.log("updated image successfully...")
                return callback(null, updateNote)
            }
        });
};


module.exports = new noteModel();