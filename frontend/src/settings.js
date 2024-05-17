import { createFlowForm, getFlowInfo, initFlow, whoami } from "./utils.js";

async function createForm(flowId) {
  console.log("Settings Flow ID", flowId);
  var flowInfo;

  if (!flowId) {
    flowInfo = await initFlow("settings");

    flowId = new URL(flowInfo.url).searchParams.get("flow");
  }

  if (!flowId && (await whoami()).status == 200) {
    window.location.href = "/";
  }

  flowInfo = await getFlowInfo("settings", flowId);

  if (flowInfo.status != 200) {
    return await createForm();
  }

  var settingsJson = await flowInfo.json();

  console.log(settingsJson);

  var form = createFlowForm(settingsJson);

  return form;
}

export default createForm;
