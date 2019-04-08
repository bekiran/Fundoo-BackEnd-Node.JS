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
