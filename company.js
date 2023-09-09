const tablebody = document.querySelector("tbody");
const fun1 = async (company) => {
  const response = await fetch(
   
    `https://companyenrichment.abstractapi.com/v1/?api_key=a742b1d68f574c7ab945c7fe19ef1f71&domain=${company}.com`
  );
  const value = await response.json();
  console.log(value);

  const bodyrow = document.createElement("tr");
  const bodycomp = document.createElement("td");
  bodycomp.innerText = value.name;
  if (bodycomp.innerText == "") {
    window.alert("company not present in API");
  } else {
    const bodyFound = document.createElement("td");
    bodyFound.innerText = value.year_founded;

    const bodyHq = document.createElement("td");
    bodyHq.innerText = value.country + ` ( ${value.locality} )`;

    const bodyDomain = document.createElement("td");
    bodyDomain.innerText = value.domain;

    const bodyempCount = document.createElement("td");
    bodyempCount.innerText = value.employees_count;

    bodyrow.append(bodycomp, bodyFound, bodyHq, bodyDomain, bodyempCount);
    tablebody.append(bodyrow);
  }
};

const formEle = document.getElementById("form");
formEle.addEventListener("submit", (e) => {
  e.preventDefault();
  tablebody.innerText = "";
  const element = e.target.elements;
  const inputEle = document.getElementById("company");
  console.log(inputEle.value);
  fun1(inputEle.value);
});
