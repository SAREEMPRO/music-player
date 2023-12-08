const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img"),
    musicName = wrapper.querySelector(".name"),
    musicArtist = wrapper.querySelector(".artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    mainAudio = new Audio(),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    hdbtn = wrapper.querySelector(".hdbtn"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next");

let musicIndex = Math.floor(Math.random() * allMusic.length),
    isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb].name;
    musicArtist.innerText = allMusic[indexNumb].artist;
    musicImg.src = `/img/${allMusic[indexNumb].img}.jpg`;
    mainAudio.src = `/music/${allMusic[indexNumb].src}.mp3`;
}

function togglePlayPause() {
    if (isMusicPaused) {
        playMusic();
    } else {
        pausedMusic();
    }
}

function playMusic() {
    wrapper.classList.add("paused");
    musicImg.classList.add('rotate');
    playPauseBtn.innerHTML = '<i class="fi fi-sr-pause"></i>';
    mainAudio.play();
    isMusicPaused = false;
}

function pausedMusic() {
    wrapper.classList.remove("paused");
    musicImg.classList.remove('rotate');
    playPauseBtn.innerHTML = '<i class="fi fi-sr-play"></i>';
    mainAudio.pause();
    isMusicPaused = true;
}

function prevMusic() {
    musicIndex--;
    musicIndex < 0 ? (musicIndex = allMusic.length - 1) : musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function nextMusic() {
    musicIndex++;
    musicIndex >= allMusic.length ? (musicIndex = 0) : musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pausedMusic() : playMusic();
});

prevBtn.addEventListener("click", () => {
    prevMusic();
});

nextBtn.addEventListener("click", () => {
    nextMusic();
});



function nextMusic() {
    const h3AndLogoAndName = gsap.utils.toArray(["h3", ".logo", ".name"]);

    gsap.to(h3AndLogoAndName, {
        opacity: 0, duration: 0.5, stagger: 0.1, onComplete: () => {
            musicIndex++;
            musicIndex >= allMusic.length ? (musicIndex = 0) : musicIndex;
            loadMusic(musicIndex);

            gsap.set(h3AndLogoAndName, { opacity: 1 });

            gsap.from(h3AndLogoAndName, { opacity: 0, duration: 0.5, stagger: 0.1 });

            playMusic();
        }
    });
}

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb].name;
    musicArtist.innerText = allMusic[indexNumb].artist;
    musicImg.src = `/img/${allMusic[indexNumb].img}.jpg`;
    mainAudio.src = `/music/${allMusic[indexNumb].src}.mp3`;

 
    progressBar.style.width = '0%';

   
    mainAudio.addEventListener("loadeddata", () => {
        updateRemainingTime();
    });
}


function updateRemainingTime() {
    let mainAudioDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAudioDuration / 60);
    let totalSec = Math.floor(mainAudioDuration % 60);
    if (totalSec < 10) {
        totalSec = `0${totalSec}`;
    }
    wrapper.querySelector(".max-dura").innerText = `-${totalMin}:${totalSec}`;
}



window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb].name;
    musicArtist.innerText = allMusic[indexNumb].artist;
    musicImg.src = `/img/${allMusic[indexNumb].img}.jpg`;
    mainAudio.src = `/music/${allMusic[indexNumb].src}.mp3`;

    progressBar.style.width = '0%';

   
    mainAudio.addEventListener("loadeddata", () => {
        let mainAudioDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAudioDuration / 60);
        let totalSec = Math.floor(mainAudioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        wrapper.querySelector(".max-dura").innerText = `${totalMin}:${totalSec}`;
    });
}


mainAudio.addEventListener("timeupdate", () => {
    const currentTime = mainAudio.currentTime;
    const duration = mainAudio.duration;

    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

  
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    wrapper.querySelector(".current-time").innerHTML = `${currentMin}:${currentSec}`;

    let remainingTime = duration - currentTime;
    let remainingMin = Math.floor(remainingTime / 60);
    let remainingSec = Math.floor(remainingTime % 60);
    if (remainingSec < 10) {
        remainingSec = `0${remainingSec}`;
    }
    wrapper.querySelector(".max-dura").innerText = `-${remainingMin}:${remainingSec}`;
});



progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedoffsetX = e.offsetX;
    let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedoffsetX / progressWidth) * songDuration;
    playMusic();

});

mainAudio.addEventListener("ended", () => {
    nextMusic();
});



const leftMusicListButton = document.querySelector(".hdbtn.left");
const rightMusicListButton = document.querySelector(".hdbtn.right");
const musicListContainer = document.querySelector(".music-list-container");
const musicList = document.getElementById("musicList"); 

rightMusicListButton.addEventListener("click", () => {
   
    musicListContainer.classList.toggle("show");
});


musicList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        const selectedSongName = event.target.textContent;
        playSelectedSong(selectedSongName);

        musicListContainer.classList.remove("show");
    }
});
leftMusicListButton.addEventListener("click", () => {
  
    musicListContainer.classList.remove("show");
});

function playSelectedSong(songName) {

    const selectedSong = allMusic.find((music) => music.name === songName);
    if (selectedSong) {
        mainAudio.src = `/music/${selectedSong.src}.mp3`;
        loadMusic(allMusic.indexOf(selectedSong));
        playMusic();
    }
}

function createMusicList() {
    const musicListContainer = document.getElementById("musicList");

    allMusic.forEach((music) => {
        const listItem = document.createElement("li");
        listItem.textContent = music.name;
        musicListContainer.appendChild(listItem);
    });
}

createMusicList();


    
