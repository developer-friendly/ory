export default function createForm() {
  var div = document.createElement("div");
  var h1 = document.createElement("h1");
  h1.innerHTML = "Welcome to Developer Friendly";
  var h2 = document.createElement("h2");
  h2.innerHTML = "This is a sample client for Ory Ecosystem";
  div.appendChild(h1);
  div.appendChild(h2);
  return div;
}
