import './styles.css';
import './favicon.ico';
import Router from "./src/router.js";

window.addEventListener("DOMContentLoaded", async function initRouter() {
  console.log("DOM is ready");
  await Router.init();
});
