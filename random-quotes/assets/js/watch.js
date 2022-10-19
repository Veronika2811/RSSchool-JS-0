const time = document.querySelector(".time");
const date = document.querySelector(".date");
const today = document.querySelector(".today");

function digitalClock() {
  const currentDate = new Date();

  time.textContent =
    addZero(currentDate.getHours()) +
    " : " +
    addZero(currentDate.getMinutes()) +
    " : " +
    addZero(currentDate.getSeconds());

  date.textContent =
    addZero(currentDate.getDate()) +
    " / " +
    addZero(currentDate.getMonth() + 1) +
    " / " +
    currentDate.getFullYear();

  const arrDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  today.textContent = arrDay[currentDate.getDay()];
}

function addZero(num) {
  if (num <= 9) {
    return "0" + num;
  }
  return num;
}

setInterval(digitalClock, 1000);

export default digitalClock;
