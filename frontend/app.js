import Router from "./js/router.js";

window.addEventListener("DOMContentLoaded", async function initRouter() {
  console.log("DOM is ready");
  await Router.init();
});
