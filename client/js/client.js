function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
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
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
    xmlHttp.send(data);
}

function httpPutAsync(theUrl, data, callback)
{
    var json = JSON.stringify(data);
    console.log("json");
    console.log(json);
    var params = JSON.stringify({ notes: data });
    console.log("params");
    console.log(params);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("PUT", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.send(params);
}

module.exports.httpGetAsync = httpGetAsync;
module.exports.httpPostAsync = httpPostAsync;
module.exports.httpPutAsync = httpPutAsync;
