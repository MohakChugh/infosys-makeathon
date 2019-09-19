var data = JSON.stringify({
    "email": "me.mohakchugh@gmail.com",
    "password": "test"
  });
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", "http://localhost:8000/auth/login");
  xhr.setRequestHeader("Content-Type", "application/json");
  
  xhr.send(data);