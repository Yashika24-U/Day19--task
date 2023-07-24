const formElement = document.createElement("form");
var currentidx = 0;
var maxIndex = 0;

var globalData = [];
const fields = [
  { type: "input", name: "firstName", id: "firstName" },
  // {type:"input",name:"lastName",id: "lastName"},
  // {type:"email",name:"Email",id: "email"},
  // {type:"input",name:"Address",id: "address"},
  { type: "input", name: "country", id: "country" },
];

fields.map((student) => {
  const studentDiv = document.createElement("div");
  const studentLabel = document.createElement("label");
  studentLabel.classList.add("m-3", "form-label");
  studentLabel.innerText = student.name;
  studentLabel.setAttribute("for", student.id);
  const studentInput = document.createElement("input");
  studentInput.classList.add("ml-3", "form-control");
  studentInput.id = student.id;
  studentInput.name = student.name;
  studentDiv.append(studentLabel, studentInput);
  formElement.append(studentDiv);
});
const btnForm = document.createElement("button");
btnForm.innerText = "Check";
btnForm.id = "Check";
btnForm.classList.add("m-3");
formElement.append(btnForm);

const tableDiv = document.createElement("div");
tableDiv.id = "tableDIV";
tableDiv.classList.add("container");
const table = document.createElement("table");
table.className = "table table-bordered";
tableDiv.id = "table";
table.style.justifyContent = "center";
const tHead = document.createElement("thead");
const tBody = document.createElement("tBody");
tHead.classList.add("table-dark");
const hRow = document.createElement("tr");
const tData = document.createElement("td");
tData.innerText = "UNIVERSITIES";
tData.style.textAlign = "Center";
hRow.append(tData);
tHead.append(hRow);
table.append(tHead, tBody);

const btnsDiv = document.createElement("div");
const btnFields = [
  { type: "button", name: "prev", id: "prev" },
  { type: "button", name: "next", id: "next" },
];

btnFields.map((btn) => {
  const newBtn = document.createElement("button");
  newBtn.id = btn.id;
  newBtn.style.margin = "20px";
  if (btn.name == "next") {
    newBtn.innerText = "Next";
    newBtn.setAttribute("onClick", "funnext()");
  } else {
    newBtn.innerText = "Prev";
    newBtn.setAttribute("onClick", "funprev()");
  }
  newBtn.style.width = "100px";
  btnsDiv.append(newBtn);
});

tableDiv.append(table, btnsDiv);
tableDiv.style.textAlign = "center";
tableDiv.style.display = "none";

const btnSubmit = document.createElement("button");
btnSubmit.innerText = "SUBMIT";
btnSubmit.id = "submit";
btnSubmit.classList.add("m-3");
btnSubmit.setAttribute("onclick", "takedata()");
btnSubmit.style.display = "none";

const stuDetailTable = document.createElement("table");
stuDetailTable.className = "table table-bordered";
const stuThead = document.createElement("thead");
stuThead.classList.add("table-dark");
const stuTbody = document.createElement("tbody");
const stuTr = document.createElement("tr");

["NAME", "COUNTRY", "UNIVERSITY"].map((obj) => {
  const stuTd = document.createElement("td");
  stuTd.innerText = obj;
  stuTd.style.textAlign = "Center";
  stuTr.append(stuTd);
});
stuThead.append(stuTr);
stuDetailTable.append(stuThead, stuTbody);

document.body.append(formElement, tableDiv, btnSubmit, stuDetailTable);

formElement.addEventListener("submit", (e) => {
  window.alert("select a college and click submit");
  e.preventDefault();
  const elements = e.target.elements;
  data = {};
  for (i = 0; i < elements.length; i++) {
    if (elements[i].nodeName == "INPUT") {
      data[elements[i].name] = elements[i].value;
    }
  }
  const { country } = data;
  fetch(`http://universities.hipolabs.com/search?country=${country}`)
    .then((value) => {
      return value.json();
    })
    .then((univerity) => {
      maxIndex = univerity.length;
      tBody.innerText = "";
      globalData = univerity;
      tableDiv.style.display = "block";
      univerity.slice(0, 5).forEach(({ name }) => {
        const innertr = document.createElement("tr");
        const innername = document.createElement("td");
        const radiolabel = document.createElement("label");
        const radiobtn = document.createElement("input");
        radiolabel.for = name;
        radiobtn.type = "radio";
        radiobtn.name = "radio";
        radiobtn.id = name;
        radiobtn.value = name;
        radiolabel.innerText = name;
        innername.append(radiobtn, radiolabel);
        innertr.append(innername);
        tBody.append(innertr);
      });
    });
  btnSubmit.style.display = "block";
});

const funnext = () => {
  currentidx += 5;
  var nextidx = currentidx + 5;
  if (currentidx < maxIndex) {
    tBody.innerText = "";
    globalData.slice(currentidx, nextidx).forEach(({ name }) => {
      // const innertr = document.createElement('tr');
      // const innername = document.createElement('td');
      // innername.innerText = name
      const innertr = document.createElement("tr");
      const innername = document.createElement("td");
      const radiolabel = document.createElement("label");
      const radiobtn = document.createElement("input");
      radiolabel.for = name;
      radiobtn.type = "radio";
      radiobtn.name = "radio";
      radiobtn.id = name;
      radiobtn.value = name;
      radiolabel.innerText = name;
      innername.append(radiobtn, radiolabel);
      innertr.append(innername);
      tBody.append(innertr);
    });
  } else {
    currentidx = maxIndex - 5;
  }
};
const funprev = () => {
  currentidx -= 5;
  var nextidx = currentidx + 5;
  console.log(currentidx, nextidx);
  if (currentidx >= 0) {
    tBody.innerText = "";
    globalData.slice(currentidx, nextidx).forEach(({ name }) => {
      // const innertr = document.createElement('tr');
      // const innername = document.createElement('td');
      // innername.innerText = name
      const innertr = document.createElement("tr");
      const innername = document.createElement("td");
      const radiolabel = document.createElement("label");
      const radiobtn = document.createElement("input");
      radiolabel.for = name;
      radiobtn.type = "radio";
      radiobtn.name = "radio";
      radiobtn.id = name;
      radiobtn.value = name;
      radiolabel.innerText = name;
      innername.append(radiobtn, radiolabel);
      innertr.append(innername);
      tBody.append(innertr);
    });
  } else {
    currentidx = 0;
  }
};

const takedata = () => {
  const nameele = document.getElementById("firstName");
  const countryele = document.getElementById("country");
  var universe = document.querySelector('input[name="radio"]:checked').value;
  console.log(nameele.value, countryele.value, universe);
  const innertr = document.createElement("tr");
  const innername = document.createElement("td");
  innername.innerText = nameele.value;
  const innercountry = document.createElement("td");
  innercountry.innerText = countryele.value;
  const universityele = document.createElement("td");
  universityele.innerText = universe;
  innertr.append(innername, innercountry, universityele);
  stuTbody.append(innertr);
};
