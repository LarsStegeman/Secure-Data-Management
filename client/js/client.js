const SERVER_URL = "http://localhost:8080/";

function httpGetAsync(theUrl, callback)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send();
}

function httpPostAsync(theUrl, data, callback)
{
    let jsonData = JSON.stringify(data);
    console.log("JSON POST:");
    console.log(jsonData);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-type", "application/json;");
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.send(jsonData);
}

function httpPutAsync(theUrl, data, callback)
{
    let json = JSON.stringify(data);
    let params = JSON.stringify({ notes: data });
    console.log("params");
    console.log(params);
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open("PUT", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-type", "application/json;");
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.send(params);
}

module.exports.SERVER_URL = SERVER_URL;
module.exports.httpGetAsync = httpGetAsync;
module.exports.httpPostAsync = httpPostAsync;
module.exports.httpPutAsync = httpPutAsync;
