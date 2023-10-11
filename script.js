"use strict";

const dateOfBirth = document.getElementById("date-of-birth");
const checkAgeBtn = document.getElementById("submit-btn");
const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const errorMsg = document.getElementById("error-display");

let checkAge = function (e) {
  e.preventDefault();

  //RESET DOM
  errorMsg.textContent = "";
  yearsEl.innerText = "--";
  monthsEl.innerText = "--";
  daysEl.innerText = "--";

  //RETRIEVE DATE INPUT AND CURRENT DATE
  let inputDate = dateOfBirth.value;
  let currentDate = new Date().toLocaleDateString();

  let input = inputDate.split("-");
  let current = currentDate.split("/").reverse();

  //ERROR MESSAGE FOR EMPTY IMPUT
  if (input.length <= 2) {
    errorMsg.textContent = "Date of birth is required";
    return;
  }

  //CALCULATE NUMBER OF DAYS FROM MILLISECONDS AND DATE
  let milliInput = Number(new Date(input));
  let milliCurrent = Number(new Date(current));

  let ageIndays = (milliCurrent - milliInput) / (1000 * 60 * 60 * 24);

  let yearAge;
  let monthAge;
  let dayAge;

  //CALCULATE AGE FROM NUMBER OF DAYS
  function calcAge() {
    yearAge = Math.floor(ageIndays / 365);
    monthAge = Math.floor((ageIndays % 365) / 30);
    dayAge = Math.trunc(((ageIndays % 365) / 30) % 30);
  }
  calcAge();

  //DISPLAY AGE IN THE DOM
  if (
    isNaN(yearAge) ||
    isNaN(monthAge) ||
    isNaN(dayAge) ||
    yearAge < 0 ||
    monthAge < 0 ||
    dayAge < 0
  ) {
    errorMsg.textContent = "Enter a valid date of birth";
  } else {
    yearsEl.innerText = `${yearAge}`.padStart(2, "0");
    monthsEl.innerText = `${monthAge}`.padStart(2, "0");
    daysEl.innerText = `${dayAge}`.padStart(2, "0");
  }
};

checkAgeBtn.addEventListener("click", checkAge);
