const express = require('express');
const app = express();
const bodyParser = require('body-parser').json()
const cors = require('cors');

const auth = require('./firebase_Auth/firebaseApi');
const query = require('./hasuraApi/query');
const insert = require('./hasuraApi/mutation');
const del = require('./hasuraApi/delete');
const update = require('./hasuraApi/update');
const sms = require('./sms/sendsms');
const email = require('./email/sendemail');
const fileupload = require('./fileupload/upload');
const template = require('./email/emailtemplate');

const port = 8080 | process.env.PORT;

app.use(cors());

//TODO: Test All Hasura APi's

app.post('/api/auth/login', bodyParser, async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var user;
    try {
        user = await auth.signin(email, password);
        user.status = 200;
        res.send(user);
    } catch (error) {
        error.status = 401;
        console.log(error);
    }
});

app.post('/api/auth/signup', bodyParser, async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var user;
    try {
        user = await auth.signup(email, password);
        user.status = 200;
        res.send(user);
    } catch (error) {
        error.status = 401;
        console.log(error);
    }
});

app.post('/api/data/query/:fn', bodyParser, async (req, res) => {
    var datafetch = req.body.data;
    var fn = req.params.fn;
    console.log(fn);
    var data;
    try {
        if (fn == 1) {
            console.log('fn 1');
            data = await query.getUser(datafetch);
            data.status = 200;
            res.send(data);
        }
        if (fn == 2) {
            console.log('fn 2');
            data = await query.getProblemwithuser(datafetch);
            data.status = 200;
            res.send(data);
        }
        if (fn == 3) {
            console.log('fn 3');
            data = await query.getUserid(datafetch);
            data.status = 200;
            res.send(data);
        }

    } catch (error) {
        console.log(error);
        error.status = 401;
        res.json(error);
    }
});

app.post('/api/feed', bodyParser, async (req, res) => {
    var data;
    try {
        data = await query.feed();
        res.json(data);
    } catch (error) {
        error.status = 404;
        res.json(error);
    }
});

app.post('/api/data/insert/problem', bodyParser, async (req, res) => {
    var description = req.body.description;
    var location = req.body.location;
    var category = req.body.category;
    var title = req.body.title;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var address = req.body.address;
    var ph_number = req.body.ph_number;
    var data;
    try {
        data = await insert.addProblem(description, location, category, title, first_name, last_name, email, address, ph_number);
        var texttosend = template.template(name, subject, description);
        email.sendOurMail(sendto, subjectmessage, texttosend);
        data.status = 200;
        res.send(data);
    } catch (err) {
        err.status = 401;
        res.json(err);
    }
});
app.post('/api/data/insert/user', bodyParser, async (req, res) => {
    var address = req.body.address;
    var email = req.body.email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var ph_number = req.body.ph_number;
    console.log(ph_number);
    var data;
    try {
        data = await insert.addUser(address, email, first_name, last_name, ph_number);
        data.status = 200;
        res.send(data);
    } catch (err) {
        err.status = 401;
        res.json(err);
    }
});

//problems once uploaded will not be deleted

// app.post('/api/data/delete/:fn', bodyParser, async (req, res) => {
//     var data = req.body.data;
//     var fn = req.params.fn;
//     var result;
//     try {
//         if (fn == 1) {
//             result = await del.deleteProblem(data);
//             result.status = 200;
//             res.json(result);
//         }
//         if (fn == 2) {
//             result = await del.deleteUser(data);
//             result.status = 200;
//             res.json(result);
//         }
//     } catch (err) {
//         err.status = 401;
//         res.json(err);
//     }
// });
app.post('/api/data/update/problems', bodyParser, async (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var location = req.body.location;
    var category = req.body.category;
    var result;
    try {
        result = await update.updateProblem(category, title, description, location);
        result.status = 200;
        res.json(result);
    } catch (err) {
        err.status = 401
        res.json(err);
    }
});
app.post('/api/data/update/user', bodyParser, async (req, res) => {
    var ph_number = req.body.ph_number;
    var ph_number_new = req.body.ph_number_new;
    var address = req.body.address;
    var email = req.body.email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var result;
    try {
        result = await update.updateUser(ph_number, address, email, first_name, last_name, ph_number_new);
        result.status = 200;
        res.json(result);
    } catch (err) {
        err.status = 401;
        res.json(err);
    }
});

app.post('/api/notification/sms', bodyParser, async (req, res) => {
    var message = req.body.message;
    var ph_number = req.body.ph_number;
    try {
        let result = await sms.sendsms(message, ph_number);
        result.status = 200;
        await res.json(result.data.Status);
    } catch (error) {
        error.status = 401;
        res.json(error);
    }
});
app.post('/api/notification/email', bodyParser, (req, res) => {
    sendto = req.body.sendto;
    sendmessage = req.body.message;
    subjectmessage = req.body.subject;
    email.sendOurMail(sendto, subjectmessage, sendmessage);
    res.json('Message Sent');
});
app.post('/api/file/upload', bodyParser, async (req, res) => {
    var name = req.files.name; //name is property of input eg: <input type="file" name="my_profile_pic" />
    try {
        file = fileupload.upload(name, 'uuid for my new file + filename');
        console.log(file); //testing purpose
        file.status = 200;
        res.send(file);
    } catch (err) {
        error.status = 401;
        console.log(err);
        res.send(err);
    }
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});