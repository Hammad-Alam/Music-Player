const song = document.querySelector('audio');
const playIcon = document.querySelector(".playimage");
const songImage = document.querySelector(".songimage");
const progressBar = document.querySelector('.progressbar');
const progress = document.getElementById('progress');
const playBtn = document.getElementById("play");
let currentTimeEl = document.getElementById('currenttime');
let totalTimeEl = document.getElementById('totaltime');
let isPlaying = false;

// To play Music
function playMusic() {
    isPlaying = true;
    songImage.classList.add("rotateThis");
    playIcon.src = "play.jpg";
    playIcon.title = "Play Music";
    song.play();
}

// To pause Music
function pauseMusic() {
    isPlaying = false;
    songImage.classList.remove("rotateThis");
    playIcon.src = "pause.jpg";
    playIcon.title = "Pause Music";
    song.pause();
}

function updateTime(duration, currentTime) {

    let progressPercent = Math.floor((currentTime / duration) * 100);
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`
    }
    // console.log("Duration : ", durationMinutes, durationSeconds);
    totalTimeEl.innerHTML = `${durationMinutes}:${durationSeconds}`;

    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    // console.log("Current: ", currentMinutes, currentSeconds);
    currentTimeEl.innerHTML = `${currentMinutes}:${currentSeconds}`;
}
 
function updateProgressBar(e) {
    const { duration, currentTime } = e.srcElement;
    updateTime(duration, currentTime);
}

function setProgressBar(e) {
    console.log(e);
    
    const width = this.clientWidth;
    const clickX = e.offsetX;

    //Progress width automatically changes because timeupdate event is changed
    const { duration } = song;
    song.currentTime = (clickX / width) * duration;
    console.log(width, clickX, song.currentTime);
}

playBtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()));
song.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click', setProgressBar);
song.addEventListener('ended', pauseMusic);