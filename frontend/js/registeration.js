import { getFlowInfo, createFlowForm, isLoggedIn } from "./utils.js";

isLoggedIn();

var registerInfo = await getFlowInfo("registration");
var registerJson = await registerInfo.json();

console.log(registerJson);

var app = document.getElementById("app");
var form = createFlowForm(registerJson);
app.insertBefore(form, app.childNodes[0]);
