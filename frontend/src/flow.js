import { createFlowForm, getFlowInfo, initFlow, whoami } from "./utils.js";

async function createForm(flowId, flowName) {
  console.log(flowName, "Flow ID", flowId);

  var flowInfo, flowJson;

  if (!flowId) {
    var headers = {
      accept: "application/json",
    };

    flowInfo = await initFlow(flowName, headers);
    flowJson = await flowInfo.json();

    flowId = flowJson.id;
  }

  if (!flowId && (await whoami()).status == 200) {
    window.location.href = "/";
  }

  if (!flowInfo) {
    flowInfo = await getFlowInfo(flowName, flowId);
  }

  if (flowInfo.status != 200) {
    return await createForm(null, flowName);
  }

  if (!flowJson) {
    flowJson = await flowInfo.json();
  }

  console.log(flowJson);

  var form = createFlowForm(flowJson);

  return form;
}

export default createForm;
