const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const btnNext = document.querySelector(".btn-next");
const lang = document.querySelector(".lang");
const langItem = document.querySelectorAll(".lang__item");
let langQuotes = "en";

async function getQuotes(lang) {
  const numRandom = getRandomInt(0, 100);
  if (lang === "en") {
    const res = await fetch("./../quotes-en.json");
    const data = await res.json();
    const objEn = data[numRandom];
    setTimeout(() => {
      quote.textContent = objEn.text;
      author.textContent = objEn.author;
    }, 500);
  } else {
    const res = await fetch("./../quotes-ru.json");
    const data = await res.json();
    const objRu = data[numRandom];
    setTimeout(() => {
      quote.textContent = objRu.text;
      author.textContent = objRu.author;
    }, 500);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const quotesSubscribe = () => {
  getQuotes(langQuotes);

  btnNext.addEventListener("click", function () {
    getQuotes(langQuotes);
  });

  lang.addEventListener("click", (event) => {
    if (event.target.dataset.lang) {
      langItem.forEach((el) => el.classList.remove("lang-active"));

      langQuotes = event.target.dataset.lang;
      event.target.classList.add("lang-active");
      getQuotes(langQuotes);
    }
  });
};

export default quotesSubscribe;