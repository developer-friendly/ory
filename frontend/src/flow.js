import { createFlowForm, getFlowInfo, initFlow, whoami } from "./utils.js";

async function createForm(flowId, flowName) {
  console.log(flowName, "Flow ID", flowId)

  var flowInfo;

  if (!flowId) {
    flowInfo = await initFlow(flowName);

    flowId = new URL(flowInfo.url).searchParams.get("flow");
  }

  if (!flowId && (await whoami()).status == 200) {
    window.location.href = "/";
  }

  flowInfo = await getFlowInfo(flowName, flowId);

  if (flowInfo.status != 200) {
    return await createForm(null, flowName);
  }

  var flowJson = await flowInfo.json();

  console.log(flowJson);

  var form = createFlowForm(flowJson);

  return form;
}

export default createForm;
