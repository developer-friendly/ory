import { createFlowForm, getFlowInfo, initFlow, whoami } from "./utils.js";

async function createForm(flowId) {
  console.log("Verify Flow ID", flowId);
  var flowInfo;

  if (!flowId) {
    flowInfo = await initFlow("verification");

    flowId = new URL(flowInfo.url).searchParams.get("flow");
  }

  if (!flowId && (await whoami()).status == 200) {
    window.location.href = "/";
  }

  flowInfo = await getFlowInfo("verification", flowId);

  if (flowInfo.status != 200) {
    return await createForm();
  }

  var verifyJson = await flowInfo.json();

  console.log(verifyJson);

  var form = createFlowForm(verifyJson);

  return form;
}

export default createForm;
