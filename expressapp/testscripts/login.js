var request = require("request");
var main = (emailID, password) => {
        var options = { method: 'POST',
        url: 'http://localhost:8080/input/auth/login',
        headers: { 'Content-Type': 'application/json' },
        body: { emailID: `${emailID}`, password: `${password}` },
        json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        return body;
    });
}

exports.login = main;