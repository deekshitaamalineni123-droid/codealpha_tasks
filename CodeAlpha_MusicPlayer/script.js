const songs = [
  {
    title: "National Anthem",
    artist: "India",
    src: "songs/song2.mp3.mp3",
    cover:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Peaceful Music",
    artist: "Relax Beat",
    src: "songs/song1.mp3.mp3",
    cover:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Night Vibes",
    artist: "DJ Mix",
    src: "songs/song3.mp3.mp3",
    cover:
      "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=1200&auto=format&fit=crop",
  },
];

const audio = document.getElementById("audio");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById(
  "progressContainer"
);

const currentTimeEl =
  document.getElementById("currentTime");

const durationEl =
  document.getElementById("duration");

const volume = document.getElementById("volume");

const playlist = document.getElementById("playlist");

const enterBtn = document.getElementById("enterBtn");

const welcomePage =
  document.getElementById("welcomePage");

const playerPage =
  document.getElementById("playerPage");

let songIndex = 0;

let isPlaying = false;

/* ENTER BUTTON */

enterBtn.addEventListener("click", () => {
  welcomePage.style.display = "none";
  playerPage.style.display = "flex";
});

/* LOAD SONG */

function loadSong(song) {
  title.innerText = song.title;

  artist.innerText = song.artist;

  cover.src = song.cover;

  audio.src = song.src;
}

loadSong(songs[songIndex]);

/* PLAY SONG */

function playSong() {
  isPlaying = true;

  audio.play();

  playBtn.innerHTML = "⏸";
}

/* PAUSE SONG */

function pauseSong() {
  isPlaying = false;

  audio.pause();

  playBtn.innerHTML = "▶";
}

/* PLAY / PAUSE BUTTON */

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

/* NEXT SONG */

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

/* PREVIOUS SONG */

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

/* UPDATE PROGRESS BAR */

audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;

  const progressPercent =
    (currentTime / duration) * 100;

  progress.style.width =
    `${progressPercent}%`;

  /* DURATION */

  let durationMinutes =
    Math.floor(duration / 60);

  let durationSeconds =
    Math.floor(duration % 60);

  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  if (durationSeconds) {
    durationEl.innerText =
      `${durationMinutes}:${durationSeconds}`;
  }

  /* CURRENT TIME */

  let currentMinutes =
    Math.floor(currentTime / 60);

  let currentSeconds =
    Math.floor(currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  currentTimeEl.innerText =
    `${currentMinutes}:${currentSeconds}`;
});

/* CLICK PROGRESS BAR */

progressContainer.addEventListener(
  "click",
  (e) => {
    const width =
      progressContainer.clientWidth;

    const clickX = e.offsetX;

    const duration = audio.duration;

    audio.currentTime =
      (clickX / width) * duration;
  }
);

/* VOLUME */

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

/* AUTOPLAY NEXT SONG */

audio.addEventListener("ended", () => {
  nextSong();
});

/* CREATE PLAYLIST */

songs.forEach((song, index) => {
  const div = document.createElement("div");

  div.classList.add("playlist-item");

  div.innerHTML = `
  
    <img src="${song.cover}">
    
    <div>
      <h4>${song.title}</h4>
      <p>${song.artist}</p>
    </div>
  
  `;

  div.addEventListener("click", () => {
    songIndex = index;

    loadSong(songs[songIndex]);

    playSong();
  });

  playlist.appendChild(div);
});