/************************************************************************************
 * @purpose   : creats user schema and stores data in database.
 * 
 * @file      : user.model.js
 * @overview  : stores user data to database.
 * @author    : bekiranabbi@gmail.com
 * @version   : 1.0
 * @since     : 05.03.2019
 * 
 *************************************************************************************/

/******* require mongoose *******
*It manages relationships between data, provides schema validation, and is used to 
translate between objects in code and the representation of those objects in MongoDB.*/
const mongoose = require('mongoose');

/****** require bcrypt **********
*It uses a 128-bit salt and encrypts a 192-bit magic value as noted in the USENIX documentation.
"`bcrypt` forces you to follow security best practices as it requires a salt as part of the 
hashing process. Hashing combined with salts protects you against rainbow table attacks!*/
var bcrypt = require('bcrypt');

// create instance of Schema
var mongoSchema = mongoose.Schema;
var userSchema = new mongoSchema({
    "firstname": { type: String, required: [true, "First name is required"] },
    "lastname": { type: String, required: [true, "LastName is required"] },
    "email": { type: String, required: [true, "Email is required"] },
    "password": { type: String, required: [true, "password is required"] },
}, {
        timestamps: true //mongoose has created this option to add automatically two fields - createdAt and updatedAt
    });
function usermodel() {

}
var user = mongoose.model('user', userSchema);
function hash(password) {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

/**************************************************************************** 
*@description : To To find the registered user in database if not registerd 
*               then to register new user to the database.
*@param       : body (request from client)
*@param       : callback (response from server)
****************************************************************************/
usermodel.prototype.register = (body, callback) => {

    //To find the registered user in database
    user.find({ 'email': body.email }, (err, data) => {
        if (err) {
            console.log("Error in register user schema ");
            return callback(err);
        } else if (data.length > 0) {
            response = { "error": true, "message": "Email already exists ", "errorCode": 404 };
            return callback(response);
        }
        else {
            const newUser = new user({
                "firstname": body.firstname,
                "lastname": body.lastname,
                "email": body.email,
                "password": hash(body.password)
            });
            newUser.save((err, result) => {
                if (err) {
                    console.log("error in model file", err);
                    return callback(err);
                } else {
                    console.log("data save successfully", result);
                    return callback(null, result);
                }
            })
        }
    });

}

/**************************************************************************** 
*@description : To find the registered user in database using find()
*@param       : body (request from client)
*@param       : callback (response from server)
****************************************************************************/
usermodel.prototype.login = (body, callback) => {

    //The find() method with parameters returns the requested documents from a collection and 
    //returns requested fields for the documents. Email of user is requested.
    user.find({ "email": body.email }, (err, data) => {
        if (err) {
            return callback(err);
        } else if (data.length > 0) {
            bcrypt.compare(body.password, data[0].password, function (err, res) {
                if (err) {
                    return callback(err);
                } else if (res) {
                    console.log(data);

                    return callback(null, data);
                } else {
                    return callback("Invalid password, Please enter valid password").status(500);
                }
            });
        } else {
            return callback("Invalid User, please register first to login");
        }
    });
}

/**************************************************************************** 
*@description : To find the registered user in database
*@param       : body (request from client)
*@param       : callback (response from server)
****************************************************************************/
usermodel.prototype.forgotPassword = (body, callback) => {
    // console.log("body in model==>",body);

    user.find({ "email": body.email }, (err, data) => {
        if (err) {
            return callback(err);
        } else if (data) {
            console.log("data in models==>", data[0]._id);

            //console.log(data)

            return callback(null, data)
        }
        else {
            return callback("Invalid User ");
        }
    });
}

/**************************************************************************** 
*@description : To reset password.
*@param       : req (request from client)
*@param       : callback (response from server)
****************************************************************************/
usermodel.prototype.resetPassword = (req, callback) => {
    //console.log("request------>", req.body);
    let newpassword = bcrypt.hashSync(req.body.password, 10);
    console.log("new password bcrypt --->", newpassword);

    // updateOne() Updates a single document within the collection based on the filter.
    user.updateOne({ _id: req.decoded.payload.user_id }, { password: newpassword }, (err, data) => {
        if (err) {
            console.log("Error in user resetPassword ");
            return callback(err);
        } else {
            return callback(null, data);
        }
    });

}

module.exports = new usermodel();