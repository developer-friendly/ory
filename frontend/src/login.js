import { createFlowForm, getFlowInfo, initFlow, whoami } from "./utils.js";
import { kratosHost } from "./config.js";

async function createForm(flowId) {
  console.log("Login Flow ID", flowId);

  window.location.href = `${kratosHost}/self-service/login/browser`;
  return;

  var flowInfo;

  if (!flowId) {
    flowInfo = await initFlow("login");

    flowId = new URL(flowInfo.url).searchParams.get("flow");
  }

  if (!flowId && (await whoami()).status == 200) {
    window.location.href = "/";
  }

  flowInfo = await getFlowInfo("login", flowId);

  if (flowInfo.status != 200) {
    return await createForm();
  }

  var loginJson = await flowInfo.json();

  console.log(loginJson);

  var form = createFlowForm(loginJson, "Log in");

  return form;
}

export default createForm;
