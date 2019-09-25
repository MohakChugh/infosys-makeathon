const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')
const jwt = require('jsonwebtoken')

const gql = require('./gql');
const port = 8000

app.use(bodyParser.json())
app.post('/auth/login', async (req, res) => {
    var email = req.body.email
    var password = req.body.password
    var hash = await gql.getPassword(email)
    await bcrypt.compare(password, hash).then(function(result) {
        if(result == true)
        {
            var token
            var userid = gql.getCitizenUuid(email)
            await bcrypt.hash(userid, 10).then( hash => {
                var response = {
                    "status" : "200",
                    "isAuthenticated" : "true",
                    "https://hasura.io/jwt/claims": {
                        "x-hasura-allowed-roles": ["user", "govt"],
                        "x-hasura-default-role": "user",
                        "x-hasura-user-id": `${userid}`,
                    }
                }
                token = jwt.sign({ response }, 'secretkey');
            })
            
            res.send(token)
        }
    });
});

app.post('/auth/register', async (req, res) => {
    var email = req.body.email
    var password = req.body.password
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var area = req.body.area
    var phone = req.body.phone
    var state = req.body.state
    var city = req.body.city
    var citizenid = uuidv4();
    await bcrypt.hash(password, 10).then( async function(hash) {
        const user = await gql.insertUser(area, citizenid, city, email,firstname, lastname, hash, phone, state)
        res.json(user);
    });    
});

app.post('/hasura/query', (req, res) => {
    var token = req.body.token
    var decoded = jwt.verify(token, 'secretkey')
    console.log(decoded)
    //get userid and use it for everything
    
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
})