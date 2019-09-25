const jwt = require('jsonwebtoken');

module.exports = async function authToken (token) {
    var decoded = await jwt.verify(token, 'secretkey')
    return decoded;
}