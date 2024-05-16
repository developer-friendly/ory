import { whoami } from "./utils.js";

var response = await whoami();

if (response.status == 401) {
  window.location = "/login.html";
}
const data = await response.json();

let table = document.createElement("table");

let headers = ["Email", "Job Title", "Last Name", "First Name", "Company Name"];
let traits = data.identity.traits;
let values = [
  traits.email,
  traits.job_title,
  traits.last_name,
  traits.first_name,
  traits.company_name,
];

function createRow(header, value) {
  let tr = document.createElement("tr");

  let th = document.createElement("th");
  th.textContent = header;
  tr.appendChild(th);

  let td = document.createElement("td");
  td.textContent = value;
  tr.appendChild(td);

  return tr;
}

headers.forEach((header, index) => {
  var row = createRow(header, values[index]);
  table.appendChild(row);
});

var emailVerified = data.identity.verifiable_addresses[0].verified;
table.appendChild(createRow("Email Verified", emailVerified));

var authenticationMethod = data.authentication_methods[0].method;
table.appendChild(createRow("Authentication Method", authenticationMethod));

document.getElementById("app").appendChild(table);
