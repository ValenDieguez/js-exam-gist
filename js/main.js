var optionArray = ["name", "phone", "email", "company", "city", "message"];
var atributeArray = [];
var form = document.getElementById("form");
var newsletter = false;
var linechange = document.createElement("br");
var subscribe = document.getElementById("subscribe");
var buttonId = document.getElementById("button");
var contact = {
    project : "inmobelt"
  };


function formPaint () {  
  //contact.project = getQueryVariable("project");
  apiInterestCall();
  var divGeneral = document.createElement("div");
  divGeneral.setAttribute ("class", "row");
  form.appendChild(divGeneral);
  for (let option in optionArray){
    var div = document.createElement("div");
    div.setAttribute ("class", "col-md-6");
    var title = document.createElement("h6");
    title.innerHTML = optionArray[option] + "<br>";
    div.appendChild(title);
    if(optionArray[option] == "message"){
      var input = document.createElement("textarea");
      input.setAttribute ("rows", 7);
      input.setAttribute ("cols", 100);
      div.setAttribute ("class", "col-md-8");
    }else{
      var input = document.createElement("input");
      div.setAttribute ("class", "col-md-6");
    }
    input.type = "text";
    input.className = "css-class-name";
    input.setAttribute("id", "input" + optionArray[option]);
    div.appendChild(linechange);
    div.appendChild(input);
    divGeneral.appendChild(div);


  }
  form.appendChild(linechange);
  var checkbox = document.createElement("input");
  checkbox.setAttribute("type","checkbox");
  checkbox.setAttribute("id","checkbox");
  checkbox.setAttribute("value","newsletter");
  checkbox.setAttribute("onclick", "showInterests()");
  subscribe.appendChild(checkbox);
  var label = document.createElement("label");
  label.setAttribute("for","checkbox");
  label.innerHTML =  "¿quieres recibir nuestros newsletters?";
  subscribe.appendChild(label);


  subscribe.appendChild(linechange);


  var button = document.createElement("button");

  button.setAttribute("onclick", "readForm()");
  button.innerHTML = "send" ;
  buttonId.appendChild(button);

}

function readForm(){
  
  for (option in optionArray){
    var name = optionArray[option];
    var statement = "input" + name ;
    var value = document.getElementById(statement).value;
    contact[name] = value;
  }
  if (newsletter){
    var interestsValue = getSelectValues(document.getElementById("atributes"));
    contact["interests"] = interestsValue;
  }
apiSend();
}

function apiInterestCall(){
  var url = "https://crm-api.dev.artecoapps.com/rest/pub/crm/subscription/interests?project="+contact.project;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      atributeArray = JSON.parse(xhttp.response).areas;
     return atributeArray;
   }
   
 };

 this.atributeArray = atributeArray;
 xhttp.open("GET", url, true);
 xhttp.send();
 ;
}

function apiSend(){
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   }
   
 };


 xhttp.open("POST", "https://crm-api.dev.artecoapps.com/rest/pub/crm/contact", true);
 xhttp.setRequestHeader('Content-Type', 'application/json');
 xhttp.send(JSON.stringify(contact));
}

function getSelectValues(select) {

  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;

}

function showInterests(){
  
  if (newsletter == false){
    newsletter = true;
    var select = document.createElement("select");
    select.setAttribute("id", "atributes");
    select.setAttribute("multiple", true);
    select.setAttribute("name", "atributes");
    var atributeContainer = document.createElement("optgroup");
    select.appendChild(atributeContainer);
    for (var attribute of atributeArray){
      var attributeOption = document.createElement("option");
      attributeOption.innerHTML = attribute.text;
      attributeOption.setAttribute ("value", attribute.id );
      atributeContainer.appendChild(attributeOption);

    }
    subscribe.appendChild(linechange);
    subscribe.appendChild(select);
  } else {
    newsletter = false;
    var select = document.getElementById("atributes");
    select.parentNode.removeChild(select);

  }
}

function getQueryVariable(variable) {
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0; i < vars.length; i++) {
       var pair = vars[i].split("=");
       if(pair[0] == variable) {
           return pair[1];
       }
   }
   return false;
}


formPaint();