var request = require("request");
var main = (token) => {
    var options = { method: 'POST',
    url: 'http://localhost:8080/input/api/query/allCity',
    headers: { 'Content-Type': 'application/json' },
    body: { token: `${token}` },
    json: true };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    return body;
    });
}
exports.cityquery = main;
