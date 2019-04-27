const jwt = require('jsonwebtoken');
module.exports = {
    GenerateToken(payload)
    {
        const token =  jwt.sign({payload}, 'secret', { expiresIn:'1d' }) // expires in 2 hours
        const obj = {        
            success: true,
            message: 'Token Generated!!',
            token: token
        }
        return obj;
    }
}