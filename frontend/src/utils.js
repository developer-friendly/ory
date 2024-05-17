import { kratosHost, baseUrl } from "./config.js";

var fetchOptions = {
  credentials: "include",
};

export async function whoami() {
  return await fetch(`${kratosHost}/sessions/whoami`, fetchOptions);
}

export async function getFlowInfo(flow, flowId, extraHeaders = {}) {
  switch (flow) {
    case "login":
    case "registration":
    case "verification":
    case "recovery":
    case "settings":
    case "logout":
      return await fetch(
        `${kratosHost}/self-service/${flow}/flows?id=${flowId}`,
        {
          ...fetchOptions,
          headers: {
            ...extraHeaders,
          },
        }
      );
    default:
      console.error("Unknown flow type", flow);
  }
}

export function createFlowForm(flowInfo, submitLabel = "Submit") {
  var form = document.createElement("form");

  var bareAction = flowInfo.ui.action;
  form.action =
    bareAction +
    (bareAction.includes("?") ? "&" : "?") +
    `return_to=${baseUrl}`;
  form.method = flowInfo.ui.method;

  var autofocus = false;

  var passwordField, passwordLabel;

  flowInfo.ui.nodes.forEach(function parseNode(node) {
    if (node.type == "input") {
      var attr = node.attributes;
      var isSubmit = attr.type == "submit";
      var isPassword = attr.type == "password";
      var input = document.createElement("input");
      var label = document.createElement("label");

      if (isSubmit) {
        input = document.createElement("button");
      }

      if (node.meta && node.meta.label && node.meta.label.text) {
        label.innerText = node.meta.label.text;
      }
      input.type = attr.type;
      input.name = attr.name;
      input.value = attr.value || "";

      if (isSubmit) {
        input.classList.add("button");
        var span = document.createElement("span");
        span.innerText = submitLabel;
        input.appendChild(span);
      }
      if (attr.required) {
        input.required = true;
        if (attr.type != "hidden") {
          var required = document.createElement("span");
          required.innerText = " *";
          required.className = "required";
          label.appendChild(required);
        }
      }
      if (attr.disabled) {
        input.disabled = true;
      }
      if (!isSubmit && !isPassword) {
        form.appendChild(label);
      }

      if (!autofocus && input.type != "hidden") {
        input.autofocus = true;
        autofocus = true;
      }

      if (!isPassword) {
        form.appendChild(input);
      } else {
        passwordField = input;
        passwordLabel = label;
      }
    }
  });

  if (passwordField) {
    form[form.length - 1].insertAdjacentElement("beforebegin", passwordLabel);
    form[form.length - 1].insertAdjacentElement("beforebegin", passwordField);
  }

  return form;
}

export async function initFlow(flow, extraHeaders = {}) {
  return await fetch(
    `${kratosHost}/self-service/${flow}/browser`,
    {
      ...fetchOptions,
      headers: {
        ...extraHeaders,
      },
    }
  );
}

export async function isLoggedIn() {
  try {
    var whoamiResponse = await whoami();
    return whoamiResponse.status == 200;
  } catch (e) {
    console.error(e);
    return false;
  }
}
