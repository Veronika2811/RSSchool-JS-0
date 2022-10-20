const btnNext = document.querySelector(".btn-next");

function imageUpload() {
  const img = new Image();
  img.src = `./assets/img/jpg/${Math.floor(Math.random() * 20)}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('./assets/img/jpg/${Math.floor(
      Math.random() * 20
    )}.jpg')`;
  };
}

imageUpload()

const imageSubscribe = () => {
  btnNext.addEventListener("click", imageUpload);
};

export default imageSubscribe;
