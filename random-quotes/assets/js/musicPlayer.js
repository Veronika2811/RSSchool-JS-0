const player = document.querySelector(".btn-player");
const audio = document.querySelector(".audio");
const prevBtn = document.querySelector(".btn-player__prev");
const playBtn = document.querySelector(".btn-player__play");
const nextBtn = document.querySelector(".btn-player__next");
const imgSrc = document.querySelector(".img__src");

const songs = [
  "Skylar Grey - I Know You",
  "Jessie Ware - Meet Me In The Middle",
  "Vaults - One Last Night",
];

let songIndex = 0;

function loadSong(song) {
  audio.src = `./assets/audio/${song}.mp3`;
}

function playSong() {
  player.classList.add("play");
  imgSrc.src = "./assets/img/svg/pause.svg";
  audio.play();
}

function pauseSong() {
  player.classList.remove("play");
  imgSrc.src = "./assets/img/svg/play.svg";
  audio.pause();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

const musicSubscribe = () => {
  playBtn.addEventListener("click", () => {
    const isPlay = player.classList.contains("play");
    if (isPlay) {
      pauseSong();
    } else {
      playSong();
    }
  });
  nextBtn.addEventListener("click", nextSong);
  prevBtn.addEventListener("click", prevSong);
};

export default musicSubscribe;
