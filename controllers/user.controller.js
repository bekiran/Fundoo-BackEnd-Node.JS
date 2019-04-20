/************************************************************************************
 * @purpose   : Controller will contain method for all CRUD operations.
 * 
 * @file      : user.controller.js
 * @overview  : Methods for all CRUD operation of user.
 * @author    : bekiranabbi@gmail.com
 * @version   : 1.0
 * @since     : 04.03.2019
 * 
 *************************************************************************************/

var userService = require('../services/user.services');
var jwt = require('jsonwebtoken');
var gentoken = require('../middleware/tokens');
var sendmail=require('../middleware/sendmail');

/***************************************************************************
*@description : To handel regester of new user
*@param       : req (request from client)
*@param       : res (response from server)
****************************************************************************/
module.exports.register = (req, res) => {
    // console.log("inside register",req.body);
    req.checkBody('firstname', 'Firstname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('lastname', 'Lastname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 }).equals(req.body.confirmPassword);
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        userService.register(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    success : true,
                    message:"User registered sucessfully"
                });
            }

        });

    }
};

/**************************************************************************** 
*@description : To handel login of user
*@param       : req (request from client)
*@param       : res (response from server)
****************************************************************************/

module.exports.login = (req, res) => {
    // console.log("req in controller", req.body);
try {
    
    //Express validator to check login validation of email and password. 
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 });
    var secret = "adcgfft";
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        userService.login(req.body, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err
                });
            } else {
                console.log(data);
                
                var response = {};
                var token = jwt.sign({ email: req.body.email, id: data[0]._id }, 'secret', { expiresIn: 86400000 });
                response.success = true;
                response._id=data[0]._id;
                response.token=token;
                response.name = data[0].firstname
                response.profilePic = data[0].profilePic
                console.log("data in response : ",response);
                
                return res.status(200).send(response);
            }
        })
    }

} catch (error) {
    console.log("error in controller : ",err);
};
}



/**************************************************************************** 
*@description : To handel forgot password of registerd user
*@param       : req (request from client)
*@param       : res (response from server)
****************************************************************************/

module.exports.forgotPassword = (req, res) => {

    req.checkBody('email', 'Email is not valid').isEmail();
    // var secret = "adcgfft";
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        userService.forgotPassword(req.body, (err, data) => {
            var responses = {};

            if (err) {
                return res.status(500).send({
                    message: err
                });
            } else {
                responses.success = true;
                responses.result = "Token generated sucessfully!";
                responses.success = data;
                // console.log("data in controller========>", data[0]._id);


                const payload = {
                    user_id: data[0]._id
                }
                //  console.log(payload);
                const obj = gentoken.GenerateToken(payload);
                const url = `http://localhost:4200/resetPassword/${obj.token}`;
                // console.log("url in controller", url);

                sendmail.sendEMailFunction(url);

                res.status(200).send(url);
                // res.status(200).send(responses);



            }
        })
    }
}

/**************************************************************************** 
*@description : To reset password of the registerd user and replace new password 
*               with the old password.
*@param       : req (request from client)
*@param       : res (response from server)
****************************************************************************/

module.exports.resetPassword = (req, res) => {
    // console.log("inside forgotPassword");
    req.checkBody('password', 'password is not valid').isLength({ min: 4 })
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        userService.resetPassword(req, (err, data) => {
            if (err) {
                // console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    message: data
                });
            }

        })

    }
}
/***********************************************************************************
 * 
 * @param : req (request from user) 
 * @param : res (response from server)
 * 
 **********************************************************************************/
exports.setProfilePic = (req, res) => {
    try {
        console.log("req dzsffxddfgdfgdfg===>",req.file);
        
        var responseResult = {};
        console.log("userid -->",req.decoded.id);
        userId = req.decoded.id;
     
        let image = req.file.location;
        console.log("image -->",image);
        userService.setProfilePic(userId, image, (err, result) => {
            console.log("result in controler profile pic==?",result);
            
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
    } catch (error) {
        res.send(error);
    }
}




