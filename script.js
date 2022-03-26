let musics = [

    {
        name: "Lose Yourself",
        cover: "images/amir.jpg",
        audio: new Audio("./musics/lose-yourself.mp3")
    },

    {
        name: "Bi ehsas",
        cover: "images/amir.jpg",
        audio: new Audio("./musics/biehsas.mp3")
    },

    {
        name: "Yakh zadam",
        cover: "images/amir.jpg",
        audio: new Audio("./musics/yakhzadam.mp3")
    }

];


let title = document.querySelector(".player__title");
let cover = document.querySelector(".player__cover");
let range = document.querySelector(".player__bar");
let playBtn = document.querySelector("#play");
let icon = document.querySelector("#play i");
let nextBtn = document.querySelector("#next");
let preBtn = document.querySelector("#pre");
let stateMusic = document.querySelector(".player__state");
let audio;

let currentMusic = 0;
title.innerText = musics[currentMusic].name;
cover.src = musics[currentMusic].cover;
audio = musics[currentMusic].audio;


function prepareMusic() {

    //is audio ready - define range
    audio.addEventListener("canplay", (e) => {
        range.max = audio.duration;

    })

    //update range with music time
    audio.addEventListener("timeupdate", () => {
        range.value = audio.currentTime;
    })

    //change music time when input  range change
    range.addEventListener("input", () => {
        audio.currentTime = range.value;
    })

}
prepareMusic();



playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        icon.classList.replace("fa-play", "fa-pause");
        stateMusic.innerText = "Is playing";

    } else {
        audio.pause();
        icon.classList.replace("fa-pause", "fa-play");
        stateMusic.innerText = "Stop";
    }
})

preBtn.addEventListener("click", () => {
    change("pre");
})

nextBtn.addEventListener("click", () => {
    change("next");
})

function change(state) {
    audio.pause()
    range.value = "0";
    audio.currentTime = 0;
    icon.classList.replace("fa-pause", "fa-play");
    stateMusic.innerText = "Stop";

    if (state === "next") {

        if (currentMusic == musics.length - 1) { currentMusic = 0; }
        else { currentMusic++ }

    } else {

        if (currentMusic == 0) { currentMusic = currentMusic.length - 1; }
        else { currentMusic--; }

    }

    title.innerText = musics[currentMusic].name;
    cover.src = musics[currentMusic].cover;
    audio = musics[currentMusic].audio;
    prepareMusic();
}