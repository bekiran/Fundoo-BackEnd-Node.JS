/************************************************************************************
 * @purpose   : Used to create user services that will send the data recived from client to 
 *              user.model and save that data in database.
 * 
 * @file      : user.services.js
 * @overview  : create user services and send data to model and save data in database.
 * @author    : bekiranabbi@gmail.com
 * @version   : 1.0   
 * @since     : 04.03.2019
 * 
 *************************************************************************************/
var userModel = require('../app/models/user.model');

/**************************************************************************** 
*@description : To send new user register data to models/user.model
*@param       : req (request from client)
*@param       : callback (response from server)
****************************************************************************/

exports.register = (req, callback) => {
    userModel.register(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
/**************************************************************************** 
*@description : To send registerd user login data to models/user.model
*@param       : req (request from client)
*@param       : callback (response from server)
****************************************************************************/

exports.login = (req, callback) => {
    userModel.login(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

/**************************************************************************** 
*@description : To send registered user forgot password data to models/user.model
*@param       : req (request from client)
*@param       : callback (response from server)
****************************************************************************/

exports.forgotPassword = (req, callback) => {
    userModel.forgotPassword(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

/**************************************************************************** 
*@description : To send registerd user reset password data to models/user.model
*@param       : req (request from client)
*@param       : callback (response from server)
****************************************************************************/

exports.resetPassword = (req, callback) => {
    userModel.resetPassword(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
/*******************************************************************************************************
 * 
 * @param : paramID 
 * @param : image 
 * @param : callback
 *  
 *********************************************************************************************************/
exports.setProfilePic = (paramID, image, callback) => {
    // console.log("in services");
    try {
        userModel.setProfilePic(paramID, image, (err, result) => {
            if (err) {
                console.log("service error in setProfile pic");
                callback(err);
            } else {
                 callback(null, result)
            }
        })
    } catch (error) {
        callback.send(error);
    }
}
