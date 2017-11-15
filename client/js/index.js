document.getElementById("submitEntity").onmousedown = function() {
  let entityType = document.getElementById("entityType").value;
  let entityID = document.getElementById("entityID").value;
  if(entityType && entityID) {
    window.location.replace("homepage.html?type=" + entityType + "&id=" + entityID);
  }
};
