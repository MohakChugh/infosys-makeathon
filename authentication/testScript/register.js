var data = JSON.stringify({
    "email": "me.mohakchugh@gmail.com",
    "password": "test",
    "firstname": "mohak",
    "area": "123123",
    "city": "2",
    "phone": "1231231231",
    "state": "2",
    "lastname": "chugh"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        console.log(this.responseText);
    }
});

xhr.open("POST", "http://localhost:8000/auth/register");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);