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

headers.forEach((header, index) => {
  let tr = document.createElement("tr");

  let th = document.createElement("th");
  th.textContent = header;
  tr.appendChild(th);

  let td = document.createElement("td");
  td.textContent = values[index];
  tr.appendChild(td);

  table.appendChild(tr);
});

document.getElementById("app").appendChild(table);
