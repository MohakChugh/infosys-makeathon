var request = require("request");
var main = (govtID,token) => {
    var options = { method: 'POST',
    url: 'http://localhost:8080/input/api/query/govtProblemFeed',
    headers: { 'Content-Type': 'application/json' },
    body: 
    { 
        govtID: `${govtID}`,
        token: `${token}` 
    },
    json: true };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    return body;
    });
}
exports.govtfeed = main;
