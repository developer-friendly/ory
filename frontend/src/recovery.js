import { createFlowForm, getFlowInfo, initFlow, whoami } from "./utils.js";

async function createForm(flowId) {
  console.log("Recovery Flow ID", flowId);
  var flowInfo;

  if (!flowId) {
    flowInfo = await initFlow("recovery");

    flowId = new URL(flowInfo.url).searchParams.get("flow");
  }

  if (!flowId && (await whoami()).status == 200) {
    window.location.href = "/";
  }

  flowInfo = await getFlowInfo("recovery", flowId);

  if (flowInfo.status != 200) {
    return await createForm();
  }

  var recoveryJson = await flowInfo.json();

  console.log(recoveryJson);

  var form = createFlowForm(recoveryJson);

  return form;
}

export default createForm;
