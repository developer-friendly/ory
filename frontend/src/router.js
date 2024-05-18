import IndexForm from "./index.js";
import LoginForm from "./login.js";
import RegisterForm from "./register.js";
import VerifyForm from "./verify.js";
import RecoveryForm from "./recovery.js";
import SettingsForm from "./settings.js";
import LogOutForm from "./logout.js";

const Router = {
  init: async function init_() {
    document.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", function overrideNavlinks(event) {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        Router.go(href);
      });
    });

    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
      return;
    });
    var route = location.pathname + location.search;
    await Router.go(route);
  },
  go: async function go_(route, addToHistory = true) {
    console.log("Navigating to", route);

    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;

    var flowId = new URL(location.href).searchParams.get("flow");

    switch (true) {
      case route == "/":
        document.title = "Developer Friendly";
        pageElement = await IndexForm();
        break;
      case route.startsWith("/login"):
        document.title = "Login - Developer Friendly";
        pageElement = await LoginForm(flowId);
        break;
      case route.startsWith("/register"):
        document.title = "Register - Developer Friendly";
        pageElement = await RegisterForm(flowId);
        break;
      case route.startsWith("/verify"):
        document.title = "Verify - Developer Friendly";
        pageElement = await VerifyForm(flowId);
        break;
      case route.startsWith("/recovery"):
        document.title = "Recovery - Developer Friendly";
        pageElement = await RecoveryForm(flowId);
        break;
      case route.startsWith("/settings"):
        document.title = "Settings - Developer Friendly";
        pageElement = await SettingsForm(flowId);
        break;
      case route.startsWith("/logout"):
        document.title = "Log Out - Developer Friendly";
        pageElement = await LogOutForm(flowId);
        break;
      default:
        document.title = "Developer Friendly";
        pageElement = document.createElement("h1");
        pageElement.textContent = `Page ${route}`;
    }
    if (pageElement) {
      var app = document.getElementById("app");

      app.innerHTML = "";
      app.appendChild(pageElement);
    }

    window.scrollX = 0;
  },
};

export default Router;
