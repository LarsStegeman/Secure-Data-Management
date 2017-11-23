const SERVER_URL = "http://localhost:8080/";

function httpGetAsync(theUrl, callback)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200){
        callback(xmlHttp.responseText);
      }
      else{
        console.log("get state = " + xmlHttp.readyState);
        console.log("get status = " + xmlHttp.status);
        //console.log(xmlHttp.responseText);
      }
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send();
}

function httpPostAsync(theUrl, data, callback)
{
    let jsonData = JSON.stringify(data);
    console.log("AFTER STRINGIFY:");
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
    if (data == null || !data){
      console.log("e");
      xmlHttp.send('');
    }
    else{
      xmlHttp.setRequestHeader("Content-type", "application/json");
      console.log("g");
      xmlHttp.send(jsonData);
    }
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200){
        console.log("d");
        callback(xmlHttp.responseText);
      }
      else{
        console.log("post request state = " + xmlHttp.readyState);
        console.log("post request code = " + xmlHttp.status);
        //console.log(xmlHttp.responseText);
      }
    };
}

function httpPutAsync(theUrl, data, callback)
{
    let params = JSON.stringify(data);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUT", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200){
        callback(xmlHttp.responseText);
      }
    };
    xmlHttp.send(params);
}

module.exports.SERVER_URL = SERVER_URL;
module.exports.httpGetAsync = httpGetAsync;
module.exports.httpPostAsync = httpPostAsync;
module.exports.httpPutAsync = httpPutAsync;
