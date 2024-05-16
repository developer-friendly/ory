import { createFlowForm, getFlowInfo, initFlow } from "./utils.js";
import { kratosHost } from "./config.js";

async function createForm(flowId) {
  console.log("Login Flow ID", flowId);
  var flowInfo;

  if (!flowId) {
    flowInfo = await initFlow("login");

    flowId = new URL(flowInfo.url).searchParams.get("flow");
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
