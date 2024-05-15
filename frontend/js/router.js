import LoginForm from "./login.js";

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

    switch (true) {
      case route.startsWith("/login"):
        pageElement = await LoginForm();
        break;
      default:
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
