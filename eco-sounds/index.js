const audio = document.querySelector("audio");

// Hamburger
const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");

function toggleMenu() {
  hamburger.classList.toggle("open");
  navigation.classList.toggle("open");
}

navigation.addEventListener("click", (event) => {
  if (event.target.classList.contains("navigation__item")) {
    toggleMenu();
  }
});

hamburger.addEventListener("click", toggleMenu);

// Image
const navigationBirds = document.querySelector(".header-wrapper");

function changeImage(event) {
  const main = document.querySelector(".main");
  const currentBird = event.target.dataset.bird;

  main.style.backgroundImage = `url('./assets/img/jpg/${currentBird}.jpg')`;
  audio.src = `./assets/audio/${currentBird}.mp3`;
  audio.currentTime = 0;
  playAudio();
}

navigationBirds.addEventListener("click", function changeClassActive(event) {
  const navigationItems = document.querySelectorAll(".navigation__item");
  if (event.target.classList.contains("navigation__item")) {
    navigationItems.forEach((btn) => {
      btn.classList.remove("active");
    });
    changeImage(event);
  }
  event.target.classList.add("active");
});

// Play music
const songs = ["forest", "solovey", "drozd", "javoronok", "zarynka", "slavka"];
const playBtn = document.querySelector(".btn-play");
let isPlay = false;
let songIndex = 0;

function loadSong(song) {
  audio.src = `./assets/audio/${song}.mp3`;
}

loadSong(songs[songIndex]);

function playAudio() {
  isPlay = true;
  audio.classList.add("play");
  playBtn.style.backgroundImage = "url('./assets/img/svg/pause.svg')";
  audio.play();
}

function pauseAudio() {
  isPlay = false;
  audio.classList.remove("play");
  playBtn.style.backgroundImage = "url('./assets/img/svg/play.svg')";
  audio.pause();
}

playBtn.addEventListener("click", () => isPlay? pauseAudio() : playAudio());

// Progress-bar
const progressBar = document.querySelector(".progress-bar");

function updateProgress(e) {
  const progress = document.querySelector(".progress");
  const { duration, currentTime } = e.srcElement;
  const progressPerсent = (currentTime / duration) * 100;
  progress.style.width = `${progressPerсent}%`;
  if (progressPerсent === 100) {
    pauseAudio();
    progress.style.width = 0;
  }
}

audio.addEventListener("timeupdate", updateProgress);

// Set progress start
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressBar.addEventListener("click", setProgress);
