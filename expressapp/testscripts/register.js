var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:8080/input/auth/register',
  headers: { 'Content-Type': 'application/json' },
  body: 
   { emailID: 'me.mohakchugh@gmail.com',
     password: 'test',
     firstName: 'mohak',
     areaID: '123123',
     cityID: '2',
     phone: '1231231231',
     stateID: '2',
     lastName: 'chugh' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  return body;
});
