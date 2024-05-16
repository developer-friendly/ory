import { whoami } from "./utils";

function defaultForm() {
  var div = document.createElement("div");
  var h1 = document.createElement("h1");
  h1.innerHTML = "Welcome to Developer Friendly";
  var h2 = document.createElement("h2");
  h2.innerHTML = "This is a sample client for Ory Ecosystem";
  div.appendChild(h1);
  div.appendChild(h2);
  return div;
}

function loggedInForm(userJson) {
  var columns = {
    "Email": userJson.identity.traits.email,
    "First Name": userJson.identity.traits.first_name,
    "Last Name": userJson.identity.traits.last_name,
    "Company Name": userJson.identity.traits.company_name,
    "Job Title": userJson.identity.traits.job_title,
  }

  console.log(userJson);
  var email = userJson.identity.traits.email;
  var table = document.createElement("table");

  for (var key in columns) {
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerHTML = key;
    var td = document.createElement("td");
    td.innerHTML = columns[key];
    tr.appendChild(th);
    tr.appendChild(td);
    table.appendChild(tr);
  }

  table.classList.add("form");

  return table;
}

export default async function createForm() {
  var userInfo = await whoami();

  if (userInfo.status != 200) {
    return defaultForm();
  } else {
    return loggedInForm(await userInfo.json());
  }

}
