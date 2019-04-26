var jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
    // console.log("reuest===>", req.body);
    var token1 = req.headers['token'];
    if (token1) {
        /**
         * @description:verifies secret and checks expression
         **/
        jwt.verify(token1, 'secret', (err, decoded) => {
            if (err) {
                return res.send({
                    status: false,
                    message: 'Token is not valid..!'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        /**
         * @description:if there is no token return an error
         **/
        return res.send({
            status: false,
            message: 'No token provided!!'
        });
    }
}


// exports.checkTokenAuthentication = (req, res, next) => {
//     //  console.log("request of authorization ",req);
//     var tokens = req.headers['token'];
//     console.log("check token enter sucessfully here");
//     if (tokens) {
//         // verifies secret and checks exp
//         jwt.verify(tokens, 'secretkey-Authentication', (err, decoded) => {
//             if (err) {

//                 return res.status(401).send({
//                     success: false,
//                     message: 'Token is not valid'
//                 });
//             }
//             else {
//                 /**
//                  * @description:add the decoded to your req data....
//                  */
//                 req.decoded = decoded;

//                 var userID = req.decoded.payload.user_id;
//                 //  console.log("request in request==>",req.decoded);
//                 console.log("your token is valid", req.url);

// var getnotesurl=req.url!=="/getnotes";
// var getlabelurl=req.url!=="/getLabels";
// console.log("getnotesurl,,,,",getnotesurl, getlabelurl);

//                 if (getnotesurl && getlabelurl ) {
//                     client.del(userID, (err, response) => {
//                         if (response == 1) {
//                             console.log("redis  Deleted Successfully!")
//                             next();

//                           //  res.status(200).send(" redis data Deleted Successfully!");
//                         } else {
//                             console.log(" redis Cannot delete")
//                             //res.status(500).send("Cannot delete");
//                             next();
//                         }
//                     })
//                 }else{

//                     next();

//                 }
                   
//                 }
//             });
//     }
//     else {
//         // if there is no token return an error
//         return res.send({
//             success: false,
//             message: 'No token provided.'
//         });
//     }
// }
