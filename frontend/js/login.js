import { kratosHost } from "./config.js";
import { createFlowForm, getFlowInfo, isLoggedIn, whoami } from "./utils.js";

isLoggedIn();

var loginInfo = await getFlowInfo("login");
var loginJson = await loginInfo.json();

console.log(loginJson);

var app = document.getElementById("app");
var form = createFlowForm(loginJson);
app.insertBefore(form, app.childNodes[0]);
