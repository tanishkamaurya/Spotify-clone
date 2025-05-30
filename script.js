window.addEventListener("load", function () {
console.log("Welcome to Spotify");
//console.log(document.getElementById('masterPlay')); // Should not be null

let songIndex = 0;

let audioElement = new Audio('1.mp3');

let masterPlay = document.getElementById('masterPlay');
let masterSongName = this.document.getElementById('masterSongName');
//let icon = masterPlay.querySelector('i');
let icon = document.getElementById('masterPlayicon'); // Not querySelector
let myProgressBar = document.getElementById('myProgressBar');
let gif= document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let song = [
    {
        songName: "Summertime Sadness",
        filePath: "1.mp3",
        coverPath: "song1.jpg"
    },
    {
        songName: "Say Yes to Heaven",
        filePath: "2.mp3",
        coverPath: "cover2.jpg"
    },
    {
        songName: "Young & Beautiful",
        filePath: "2.mp3",
        coverPath: "song1.jpg"
    },
    {
        songName: "Cinnamon Girl",
        filePath: "2.mp3",
        coverPath: "cover2.jpg"
    },
    {
        songName: "Dark Paradise",
        filePath: "2.mp3",
        coverPath: "song1.jpg"
    },
    {
        songName: "Dark Paradise",
        filePath: "2.mp3",
        coverPath: "cover2.jpg"
    }
];

songItems.forEach((element,i) => {  //=> -- callback function
    element.getElementsByTagName("img")[0].src = song[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = song[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    console.log("masterPlay clicked");
    console.log("Before toggle:", icon.className);
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play().catch(e => console.error("Play error:", e));
        icon.classList.remove('fa-circle-play');
        icon.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        icon.classList.remove('fa-circle-pause');
        icon.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        // masterPlay.classList.remove('fa-pause'); //cannot add fa-3x fa-solid fa-circle-play as class needs only one name per arguement
        // masterPlay.classList.add('fa-circle-play');
    }
    console.log("After toggle:", icon.className);
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
});
    myProgressBar.addEventListener('change', ()=>{
        audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
    })

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
        console.log(element, index);
        if(element){
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
        }else {
      console.warn('Undefined element at index:', index);
    }
    })
}    

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,i) => {
    element.addEventListener('click', (e)=> {
        const clickedIcon = e.target;
        //console.log(e.target); //gives element which is clicked upon
        
        songIndex= i;
        //index = parseInt(e.target.id);
        if(clickedIcon.classList.contains('fa-circle-play')){
            makeAllPlays();
            masterSongName.innerText=song[songIndex].songName;
            clickedIcon.classList.remove('fa-circle-play');
            clickedIcon.classList.add('fa-circle-pause');

            icon.classList.remove('fa-circle-play');
            icon.classList.add('fa-circle-pause');

            audioElement.src=song[songIndex].filePath;
            audioElement.currentTime=0;
            audioElement.play();
            gif.style.opacity = 1;
        }
        else{
            clickedIcon.classList.remove('fa-circle-pause');
            clickedIcon.classList.add('fa-circle-play');

            audioElement.pause();
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
        // makeAllPlays();
        // e.target.classList.remove('fa-circle-play');
        // e.target.classList.add('fa-circle-pause');

        // audioElement.src="1.mp3";
        // audioElement.currentTime=0;
        // audioElement.play();
    });
});

this.document.getElementById('next').addEventListener('click',() =>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.currentTime=0;
    audioElement.src=song[songIndex].filePath;
    masterSongName.innerText=song[songIndex].songName;
    icon.classList.remove('fa-circle-play');
    audioElement.play();
    icon.classList.add('fa-circle-pause');
})
this.document.getElementById('previous').addEventListener('click',() =>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.currentTime=0;
    audioElement.src=song[songIndex].filePath;
    audioElement.play();
    masterSongName.innerText=song[songIndex].songName;
    icon.classList.remove('fa-circle-pause');
    icon.classList.add('fa-circle-play');
})
});

