const btn = document.createElement("button");
const fun1 = async (email) => {
  const valu = await fetch(
    // `https://emailvalidation.abstractapi.com/v1/?api_key=95ae6cbe3fc04e9c94791562eabdaf0d&email=${email}`
    `https://emailvalidation.abstractapi.com/v1/?api_key=d14374922f8241178a51c960b04ebc74&email={email}.com`
  
  );
  const result = await valu.json();

  const displaytext = result.deliverability;
  btn.style.display = "block";
  btn.innerHTML = displaytext;
  console.log(displaytext);
  if (displaytext == "DELIVERABLE") {
    btn.setAttribute("class", "btn btn-primary");
  } else {
    btn.setAttribute("class", "btn btn-danger");
  }
  document.body.append(btn);
};

const inputEle = document.getElementById("form");

inputEle.addEventListener("submit", (e) => {
  btn.style.display = "none";
  e.preventDefault();
  const inputValue = document.getElementById("email");
  fun1(inputValue.value);
});
