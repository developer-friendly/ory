import { createFlowForm, getFlowInfo, isLoggedIn } from "./utils.js";

async function createForm() {
  var flowId = new URLSearchParams(window.location.search).get("flow");

  console.log("Login Flow ID", flowId);

  if (!flowId) {
    isLoggedIn();
  }

  var loginInfo = await getFlowInfo("login", flowId);
  var loginJson = await loginInfo.json();

  console.log(loginJson);

  var form = createFlowForm(loginJson, "Log in");

  return form;
}

export default createForm;
