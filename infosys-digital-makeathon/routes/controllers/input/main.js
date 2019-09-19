const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const interface = require('../../models/interface/main');
const citizensApp = require('../../models/citizens_app/query');
const citizensAppInsert = require('../../models/citizens_app/insert');
const gql = require('../../models/citizens_app/gql');
const bcrypt = require('bcrypt');
const jwtAuth = require('../../models/citizens_app/jwtAuth')
const jwt = require('jsonwebtoken');

router.post('/api/query/citizenProblemFeed', async function (req, response) {

    // get user id
    var userID = req.body.citizenID;
    var token = req.body.token
    if(!(userID && token)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    // get citizen area
    var area = await citizensApp.getAreaofCitizen(userID);
    console.log(area);
    if(!area.citizens[0]) {
        return response.json({error:'invalid citizen', msg: {success: false, response: false}});
    }
    var areaID = area.citizens[0].Area
    var areaInfo = await citizensApp.queryArea(areaID);
    console.log(areaInfo);
    var feedData = await citizensApp.searchProblemsByArea(area.citizens[0].Area);
    console.log(feedData);
    var res = [];
    for(var i = 0; i < feedData.problems.length; i++) {
        var obj = feedData.problems[i];
        var problemTagName = await citizensApp.problemTagEvent(obj.ProblemTag);
        console.log(problemTagName)
        problemTagName = problemTagName.problem_tags[0].TagName;
        var statusName = await citizensApp.getStatusWithStatusCode(obj.Status);
        console.log(statusName)
        statusName = statusName.status[0].StatusDescription;
        var temp = {
            areaName: areaInfo.area[0].AreaName,
            digitalSignaturesCount: obj.DigitalSignaturesCount,
            downVotes: obj.DownVotes,
            origin: obj.OriginTImeStamp,
            raiserName: obj.ProblemRaiserID,
            description: obj.ProblemDescription,
            problemTag: problemTagName,
            status: statusName,
            upVotes: obj.UpVotes
        }
        res.push(temp);
    }
    
    return response.json({error:null, msg: {success: true, response: res}});

});

router.post('/api/query/citizenDashboard', async function (req, response) {

    // get user id
    var userID = req.body.citizenID;
    var token = req.body.token
    if(!(userID && token)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    // get citizen area
    var area = await citizensApp.getAreaofCitizen(userID);
    if(!area.citizens[0]) {
        return response.json({error:'invalid citizen', msg: {success: false, response: false}});
    }
    var areaID = area.citizens[0].Area
    var areaInfo = await citizensApp.queryArea(areaID);
    var feedData = await citizensApp.getProblemOfUser(userID);
    var res = [];
    for(var i = 0; i < feedData.problems.length; i++) {
        var obj = feedData.problems[i];
        var problemTagName = await citizensApp.problemTagEvent(obj.ProblemTag);
        problemTagName = problemTagName.problem_tags[0].TagName;
        var statusName = await citizensApp.getStatusWithStatusCode(obj.Status);
        statusName = statusName.status[0].StatusDescription;
        var temp = {
            areaName: areaInfo.area[0].AreaName,
            digitalSignaturesCount: obj.DigitalSignaturesCount,
            downVotes: obj.DownVotes,
            origin: obj.OriginTImeStamp,
            raiserName: obj.ProblemRaiserID,
            description: obj.ProblemDescription,
            problemTag: problemTagName,
            status: statusName,
            upVotes: obj.UpVotes
        }
        res.push(temp);
    }
    
    return response.json({error:null, msg: {success: true, response: res}});

});

router.post('/api/query/govtProblemFeed', async function (req, response) {

    // get user id
    var userID = req.body.govtID;
    var token = req.body.token
    if(!(userID && token)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    // get citizen area
    var empInfo = await citizensApp.getGovtEmpData(userID);
    if(!empInfo.government_official[0]) {
        return response.json({error:'invalid govt official', msg: {success: false, response: false}});
    }
    var areaID = empInfo.government_official[0].AreaCode;
    var areaInfo = await citizensApp.queryArea(areaID);
    var feedData = await citizensApp.searchProblemsByArea(areaID);
    
    var res = [];
    for(var i = 0; i < feedData.problems.length; i++) {
        var obj = feedData.problems[i];
        var problemTagName = await citizensApp.problemTagEvent(obj.ProblemTag);
        problemTagName = problemTagName.problem_tags[0].TagName;
        var statusName = await citizensApp.getStatusWithStatusCode(obj.Status);
        statusName = statusName.status[0].StatusDescription;

        var citizenID = obj.ProblemRaiserID;
        var citizenName = await citizensApp.getCitizenByID(citizenID);
        if(!citizenName.citizens[0]) {
            citizenName = '';
        } else {
            citizenName = citizenName.citizens[0].FirstName + ' ' + citizenName.citizens[0].LastName;
        }
        var temp = {
            areaName: areaInfo.area[0].AreaName,
            digitalSignaturesCount: obj.DigitalSignaturesCount,
            downVotes: obj.DownVotes,
            origin: obj.OriginTImeStamp,
            raiserName: citizenName,
            description: obj.ProblemDescription,
            problemTag: problemTagName,
            status: statusName,
            upVotes: obj.UpVotes
        }
        res.push(temp);
    }
    
    return response.json({error:null, msg: {success: true, response: res}});

});

router.post('/api/query/digitalSignatures', async function (req, response) {

    // get user id
    var problemID = req.body.problemID;
    var token = req.body.token
    
    if(!(problemID && token)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    var signatures = await citizensApp.getDigitalSignatures(problemID);
    
    return response.json({error:null, msg: {success: true, response: signatures}});

});

router.post('/api/query/allProblemTags', async function (req, response) {

    var token = req.body.token
    if(!token) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    var tags = await citizensApp.problemTags();
    
    return response.json({error:null, msg: {success: true, response: tags}});

});

router.post('/api/query/allCity', async function (req, response) {

    var token = req.body.token
    if(!token) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })
    
    var city = await citizensApp.city();
    
    return response.json({error:null, msg: {success: true, response: city}});

});

router.post('/api/query/allStates', async function (req, response) {

    var token = req.body.token
    if(!token) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })
    
    var states = await citizensApp.states();
    
    return response.json({error:null, msg: {success: true, response: states}});

});

router.post('/api/query/myGovtEmp', async function (req, response) {

    // get user id
    var userID = req.body.citizenID;
    var token = req.body.token
    
    if(!(userID && token)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    // get citizen area
    var area = await citizensApp.getAreaofCitizen(userID);
    if(!area.citizens[0]) {
        return response.json({error:'invalid citizen', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    var areaID = area.citizens[0].Area
    
    var govt = await citizensApp.getGovtEmpDataByArea(areaID);

    return response.json({error:null, msg: {success: true, response: govt}});

});

router.post('/api/query/allArea', async function (req, response) {

    var token = req.body.token
    if(!token) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })
    
    var tags = await citizensApp.area();
    
    return response.json({error:null, msg: {success: true, response: tags}});

});

/** Insert Routes **/

router.post('/api/insert/citizen', async function (req, response) {
    var area = req.body.areaID;
    var citizenID = uuidv4();
    var cityID = req.body.cityID;
    var email = req.body.emailID;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var phone = req.body.phone;
    var stateID = req.body.stateID;
    var token = req.body.token
    
    if(!(token && area && citizenID && email && firstName && lastName && cityID && password && phone && stateID)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    try {
        var data = await citizensAppInsert.insertCitizens(area, citizenID, cityID, email, firstName, lastName, password, phone, stateID);
        return response.json({error:null, msg: {success: true, response: true}});
    } catch (err) {
        err.status = 401;
        return response.json({error:err, msg: {success: false, response: false}});
    }
});

router.post('/api/insert/state', async function (req, response) {

    var govtID = req.body.govtID;
    var stateID = req.body.stateID;
    var stateName = req.body.stateName;
    var token = req.body.token
    
    if(!(token && govtID && stateID && stateName)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    try {
        var data = await citizensAppInsert.insertState(govtID, stateID, stateName);
        return response.json({error:null, msg: {success: true, response: true}});
    } catch (err) {
        err.status = 401;
        return response.json({error:err, msg: {success: false, response: false}});
    }

});

router.post('/api/insert/city', async function (req, response) {

    var govtID = req.body.govtID;
    var stateID = req.body.stateID;
    var cityName = req.body.cityName;
    var cityID = req.body.cityID;
    var token = req.body.token
    
    if(!(token && govtID && cityID && cityName && stateID)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    try {
        var data = await citizensAppInsert.insertCity(cityID, cityName, govtID, stateID);
        return response.json({error:null, msg: {success: true, response: true}});
    } catch (err) {
        err.status = 401;
        return response.json({error:err, msg: {success: false, response: false}});
    }

});

router.post('/api/insert/area', async function (req, response) {

    var govtID = req.body.govtID;
    var areaID = req.body.areaID;
    var areaName = req.body.areaName;
    var cityID = req.body.cityID;
    var token = req.body.token

    if(!(token && govtID && cityID && areaName && areaID)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    try {
        var data = await citizensAppInsert.insertArea(areaID, areaName, cityID, govtID);
        return response.json({error:null, msg: {success: true, response: true}});
    } catch (err) {
        err.status = 401;
        return response.json({error:err, msg: {success: false, response: false}});
    }

});

// problem with govtID treated as integer ? Don't know why ?
router.post('/api/insert/govtOfficial', async function (req, response) {

    var areaCode = req.body.areaID;
    var cityCode = req.body.cityID;
    var email = req.body.emailID;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var phone = req.body.phone;
    var stateCode = req.body.stateID;
    var govtID = uuidv4();

    if(!(govtID && stateCode && phone && password && lastName && firstName && email && cityCode && areaCode)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    try {
        var data = await citizensAppInsert.insertGovtOfficial(areaCode, cityCode, email, firstName, govtID, lastName, password, phone, stateCode);
        console.log(data);
        return response.json({error:null, msg: {success: true, response: true}});
    } catch (err) {
        err.status = 401;
        return response.json({error:err, msg: {success: false, response: false}});
    }

});

router.post('/api/insert/problemTag', async function (req, response) {

    var tagID = req.body.tagID;
    var tagName = req.body.tagName;
    var token = req.body.token

    if(!(token && tagID && tagName)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    try {
        var data = await citizensAppInsert.insertProblemTag(tagID, tagName);
        console.log(data);
        return response.json({error:null, msg: {success: true, response: true}});
    } catch (err) {
        err.status = 401;
        return response.json({error:err, msg: {success: false, response: false}});
    }

});

router.post('/api/insert/problem', async function (req, response) {

    var areaCode = req.body.areaID;
    var digitalSignaturesCount = 0;
    var probemRaiserID = req.body.citizenID;
    var problemDescription = req.body.problemDescription;
    // var problemID = uuidv4();
    var problems = await citizensApp.totalproblems();
    var problemID = problems.problems.length + 1;
    var problemTag = req.body.problemTagID;
    var token = req.body.token

    if(!(token && probemRaiserID && problemDescription && problemID && problemTag)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    try {
        var data = await citizensAppInsert.insertProblem(areaCode, probemRaiserID, problemDescription, problemID, problemTag);
        console.log(data);
        return response.json({error:null, msg: {success: true, response: true}});
    } catch (err) {
        err.status = 401;
        return response.json({error:err, msg: {success: false, response: false}});
    }

});

router.post('/api/insert/status', async function (req, response) {

    var statusCode = req.body.statusID;
    var StatusDescription = req.body.statusDescription;
    var token = req.body.token

    if(!(token && statusCode && StatusDescription)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })

    try {
        var data = await citizensAppInsert.insertStatus(statusCode, StatusDescription);
        return response.json({error:null, msg: {success: true, response: true}});
    } catch (err) {
        err.status = 401;
        return response.json({error:err, msg: {success: false, response: false}});
    }

});

router.post('/api/insert/digitalSignature', async function (req, response) {

    var problemID = req.body.problemID;
    var citizenID = req.body.citizenID;
    var token = req.body.token

    if(!(token && problemID && citizenID)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })
    var main = async () => {
        var purpose = 'digitally_sign_problem';
        var exec = await require("child_process").exec;
            await exec(`python3 routes/controllers/input/digital_signature.py ${problemID} ${citizenID} ${purpose}`, async (error, signature, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log("PROBLEM ID: ", problemID , "\nCITIZENID: ", citizenID, "\nSIGNATURE: ", signature);
            });
            return response.json({error:null, msg: {success: true, response: true}});
    }
    main();
});

/** Auth **/
router.post('/auth/login', async (req, res) => {
    var email = req.body.emailID
    var password = req.body.password
    
    if(!(email && password)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }
    
    var hash = await gql.getPassword(email)
    await bcrypt.compare(password, hash).then(async function(result) {
        if(result == true)
        {
            var token
            var userid = await gql.getCitizenUuid(email)
            
            if(userid == "None") {
                res.json("Authentication Failed !");
            }
            
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
                token = jwt.sign({ response }, 'ilovefuckingbitches');
            })
            
            res.json(token)
        } else {
            res.json("Authentication Failed !");
        }
    });
});
router.post('/auth/login/govt', async (req, res) => {
    var email = req.body.emailID
    var password = req.body.password
    
    if(!(email && password)) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }
    
    var hash = await gql.getGovtPassword(email)
    await bcrypt.compare(password, hash).then(async function(result) {
        if(result == true)
        {
            var token
            var userid = await gql.getGovtUuid(email)
            var tempid = userid;
            if(userid == "None") {
                res.json({ 'res': 'None'});
            }
            
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
                token = jwt.sign({ response }, 'ilovefuckingbitches');
            })
            var json = {
                'token': token,
                'govtID': tempid
            }
            res.send(json);
        } else {
            res.send({'res': 'None'});
        }
    });
});

router.post('/auth/register', async (req, res) => {
    var email = req.body.emailID
    var password = req.body.password
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var area = req.body.areaID
    var phone = req.body.phone
    var state = req.body.stateID
    var city = req.body.cityID
    var citizenid = uuidv4();
    var problemID = 'none';
    var purpose = 'generate_keys';
    
    if(!(email && password && firstName && lastName && area && phone && state && city)) {
        return res.json({error:'invalid request', msg: {success: false, response: false}});
    }
    
    await bcrypt.hash(password, 10).then( async function(hash) {
        const user = await gql.insertUser(area, citizenid, city, email,firstname, lastname, hash, phone, state)
        console.log(user);
        var exec = require("child_process").exec;
        exec(`python3 routes/controllers/input/digital_signature.py ${problemID} ${citizenid} ${purpose}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            // console.log(`stdout: ${stdout}`);
            // console.log(`stderr: ${stderr}`);
        });
        return res.json({error:null, msg: {success: true, response: true}});

    });    
});
router.post('/auth/register/govt', async (req, res) => {
    var email = req.body.emailID
    var password = req.body.password
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var area = req.body.areaID
    var phone = req.body.phone
    var state = req.body.stateID
    var city = req.body.cityID
    var govtID = uuidv4();
    
    if(!(email && password && firstName && lastName && area && phone && state && city)) {
        return res.json({error:'invalid request', msg: {success: false, response: false}});
    }
    
    await bcrypt.hash(password, 10).then( async function(hash) {
        const user = await gql.insertGovt(area, govtID, city, email,firstName, lastName, hash, phone, state)
        return res.json({error:null, msg: {success: true, response: true}});
    });    
});

/** GOVT STATISTICS **/
router.post('/api/query/totalProblems', async function (req, response) {

    var token = req.body.token
    if(!token) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })
    
    var problems = await citizensApp.totalproblems();
    console.log(problems.problems.length);

    return response.json({error:null, msg: {success: true, response: problems}});

});
router.post('/api/query/activeProblems', async function (req, response) {

    var token = req.body.token
    if(!token) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })
    
    var problems = await citizensApp.activeProblems();
    
    return response.json({error:null, msg: {success: true, response: problems}});

});
router.post('/api/query/resolvedProblems', async function (req, response) {

    var token = req.body.token
    if(!token) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })
    
    var problems = await citizensApp.resolvedProblems();
    
    return response.json({error:null, msg: {success: true, response: problems}});

});
router.post('/api/query/getUpvotes', async function (req, response) {

    var problemID = req.body.problemID;
    var token = req.body.token
    if(!token) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })
    
    var upvotes = await citizensApp.getUpvotes(problemID);
    
    return response.json({error:null, msg: {success: true, response: upvotes}});

});
router.post('/api/query/getDownvotes', async function (req, response) {

    var problemID = req.body.problemID;
    var token = req.body.token
    if(!token) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })
    
    var upvotes = await citizensApp.getDownvotes(problemID);
    
    return response.json({error:null, msg: {success: true, response: upvotes}});

});
router.post('/api/query/UpVote', async function (req, response) {

    var problemID = req.body.problemID;
    var token = req.body.token
    if(!token) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })
    
    var res = await citizensApp.UpVote(problemID);
    
    return response.json({error:null, msg: {success: true, response: res}});

});
router.post('/api/query/DownVote', async function (req, response) {

    var problemID = req.body.problemID;
    var token = req.body.token
    if(!token) {
        return response.json({error:'invalid request', msg: {success: false, response: false}});
    }

    (async () => {
        const token_attr = await jwtAuth.authToken(token);
        if(!token_attr.response.isAuthenticated) {
            return response.json({error:'not authenticated', msg: {success: false, response: false}});
        }
    })
    
    var res = await citizensApp.DownVote(problemID);
    
    return response.json({error:null, msg: {success: true, response: res}});

});
module.exports = router;