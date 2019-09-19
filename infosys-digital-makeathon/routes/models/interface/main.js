// const citizensApp = require('../citizens_app');
const crypto = require('crypto')
var interface = {};

interface.REQUEST = {
    METHOD: {
        GET: "GET",
        POST: "POST"
    },
    HEADERS: {
        JSON: { 'Content-Type': 'application/json' }
    }
};

// Interface Modules
interface.getParam1 = function (req) {
    if(req.query.param1) {
        return req.query.param1;
    } else {
        return null;
    }
}

interface.getParam2 = function (req) {
    if(req.query.param2) {
        return req.query.param2;
    } else {
        return null;
    }
}

interface.getFeed = function (p1, p2) {
    return new Promise((resolve, reject) => {
        // var obj = new citizensApp.query();
        // obj.problemFeed()
        // add listeners here
    });
};
        
interface.getDigitalSignature = function (problemID, privateKey) {
    return new Promise((resolve, reject) => {
        const message = problemID.toString('utf-8');
        const signer = crypto.createSign('sha256');

        // console.log(privateKey);
        console.log(message);
        
        signer.update(message);
        signer.end();
        
        var key = "PpnBZxyZxkXHC4Qv2gChvq7qPVWkGeXdnhvG6T8ewFfQhyZC8GYheqfB2jX5NPVxxzEEemy2gmJLuQjNwHC8KW5BmddFCGehhJByt4pCEa7TnYMMvKyzuqQ7PF26Cj7m"
        console.log("KEY:", key.length);
        var decrypt = crypto.createDecipheriv('aes-256-cbc', key, "lokh87aruklokhug");
        decrypt.setAutoPadding(false);
        var s = decrypt.update(privateKey, 'base64', 'utf8');
        console.log(s + decrypt.final('utf8'));

        // var iv = "";
        // var decrypt = crypto.createDecipher('aes-256-cbc', privateKey, iv);
        // var decoded = decrypt.update(privateKey.replace(/\s/g, "+"), 'base64', 'utf8');
        // decoded += decrypt.final('utf8');
        // // decrypt.setAutoPadding(false);
        // // var s = decrypt.update(privateKey, 'base64', 'utf8');
        // // decrypt.final('utf8');

        const signature = signer.sign({ 'key': decoded, 'passphrase': 'top secret' }, 'hex');
        const signature_hex = signature.toString('hex');

        resolve(signature_hex);
    });
}

module.exports = interface;