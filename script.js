import countryList from "./module/countreyList.js";
const BASE_URL =
  "https://v6.exchangerate-api.com/v6/1feb74007966161ff28e7b57/latest";

let dropDown = document.querySelectorAll(".dropdown select");
let btn = document.getElementById("getExchangeRate");
let fromCrun = document.querySelector(".from select");
let toCrun = document.querySelector(".to select");
let message = document.querySelector(".msg");

for (let select of dropDown) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

function updateFlag(elm) {
  let currCode = elm.value;
  let countryCode = countryList[currCode];
  let img = elm.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let inputVal = amount.value;
  if (inputVal === "" || inputVal < 1) {
    inputVal = 1;
    amount.value = 1;
  }
  fetchData(inputVal);
});

let fetchData = async (inputVal) => {
  let fromCur = fromCrun.value;
  let toCru = toCrun.value;
  //   console.log(fromCur);

  let URL = `${BASE_URL}/${fromCur}`;
  try {
    let response = await fetch(URL);
    let data = await response.json();
    let Exchangerate = data.conversion_rates[toCru];
    let convertedAmount = inputVal * Exchangerate;
    let CalculatedAmout = convertedAmount.toFixed(2);
    message.innerHTML = `${inputVal} ${fromCur} = ${CalculatedAmout} ${toCru}`;
  } catch (error) {
    // console.error("Error fetching data:", error);
    message.innerHTML = "Error fetching exchange rate data.";
  }
};

window.addEventListener("load", () => {
  fetchData(1);
});

// console.log(fromCrun);
