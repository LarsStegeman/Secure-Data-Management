const SERVER_URL = "http://localhost:8080/";

function httpGetAsync(theUrl, callback)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200){
        callback(xmlHttp.responseText);
      }
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send();
}

function httpPostAsync(theUrl, data, callback)
{
    let jsonData = JSON.stringify(data);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
    if (data == null || !data){
      xmlHttp.send('');
    }
    else{
      xmlHttp.setRequestHeader("Content-type", "application/json");
      xmlHttp.send(jsonData);
    }
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200){
        callback(xmlHttp.responseText);
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

function httpDelAsync(theUrl, callback)
{
    console.log("a");
    let xmlHttp = new XMLHttpRequest();
    console.log("B");
    xmlHttp.open("DELETE", theUrl, true); // true for asynchronous
    console.log("C");
    xmlHttp.onreadystatechange = function() {
      console.log(xmlHttp.readyState + " " + xmlHttp.status);
      if (xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200){
        callback(xmlHttp.responseText);
      }
    };
    xmlHttp.send();
}

module.exports.SERVER_URL = SERVER_URL;
module.exports.httpGetAsync = httpGetAsync;
module.exports.httpPostAsync = httpPostAsync;
module.exports.httpPutAsync = httpPutAsync;
module.exports.httpDelAsync = httpDelAsync;
