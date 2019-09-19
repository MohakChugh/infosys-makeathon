const login = (email, password) => {
    var data = JSON.stringify({
        "email": `${email}`,
        "password": `${password}`
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:8080/api/auth/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
};
const getUserData = (data) => {
    var data = JSON.stringify({
        "data": `${data}`
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:8080/api/data/query/1");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
};
const getProblemWithUser = (data) => {
    var data = JSON.stringify({
        "data": `${data}`
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:8080/api/data/query/2");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
};
const getUserId = (data) => {
    var data = JSON.stringify({
        "data": `${data}`
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:8080/api/data/query/3");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
};
const insertuser = (address, email, first_name, last_name, ph_number) => {
    var data = JSON.stringify({
        "address": `${address}`,
        "email": `${email}`,
        "first_name": `${first_name}`,
        "last_name": `${last_name}`,
        "ph_number": `${ph_number}`
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:8080/api/data/insert/user");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
};
const insertproblem = (description, localhost, title, first_name, last_name, email, address, ph_number, userid) => {
    var data = JSON.stringify({
        "description": `${description}`,
        "location": `${localhost}`,
        "title": `${title}`,
        "first_name": `${first_name}`,
        "last_name": `${last_name}`,
        "email": `${email}`,
        "address": `${address}`,
        "ph_number": `${ph_number}`,
        "userid": `${userid}`
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:8080/api/data/insert/problem");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}
const sms = (message, ph_number) => {
    var data = JSON.stringify({
        "message": `${message}`,
        "ph_number": `${ph_number}`
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:8080/api/notification/sms");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
};
const email = (message, sendto, subject) => {
    var data = JSON.stringify({
        "message": `${message}`,
        "sendto": `${sendto}`,
        "subject": `${subject}`
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:8080/api/notification/email");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}
const feed = () => {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        console.log(this.responseText);
    }
    });

    xhr.open("POST", "http://localhost:8080/api/feed");

    xhr.send(data);
}