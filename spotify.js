
// Initiaize variables
let songIndex = 0;
let audioElement = new Audio('Assets/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName : "Warriyo", filePath: "Assets/songs/1.mp3", coverPath:"Assets/images/1.jpg"},
    {songName : "Cielo", filePath: "Assets/songs/2.mp3", coverPath:"Assets/images/2.jpg"},
    {songName : "Deaf kev", filePath: "Assets/songs/3.mp3", coverPath:"Assets/images/3.jpg"},
    {songName : "Different Heaven", filePath: "Assets/songs/4.mp3", coverPath:"Assets/images/4.jpg"},
    {songName : "janji heroes- tonight", filePath: "Assets/songs/5.mp3", coverPath:"Assets/images/5.jpg"},
    {songName : "random1 heroes- tonight", filePath: "Assets/songs/5.mp3", coverPath:"Assets/images/6.jpg"},
    {songName : "random2 heroes- tonight", filePath: "Assets/songs/4.mp3", coverPath:"Assets/images/7.jpg"},
    {songName : "random3 heroes- tonight", filePath: "Assets/songs/3.mp3", coverPath:"Assets/images/8.jpg"},
    {songName : "random4 heroes- tonight", filePath: "Assets/songs/2.mp3", coverPath:"Assets/images/9.jpg"},
    {songName : "random5", filePath: "Assets/songs/1.mp3", coverPath:"Assets/images/10.jpg"}
]

//handle play/pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});
myProgressBar.addEventListener('change', ()=>{
    //to play the song from where we want using seekbar
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

songItems.forEach((element, i)=>{
    //to fetch the song name and cover image from songs array declared at top
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

/*this will make active only one play button. 
if another button will click previous one will automatically change to pause*/
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();//help in selecting one at a time.
        
        songIndex = parseInt(e.target.id);//fetch the value of song id which is from 0 to 9 
        //to change the circle play into pause icon in Banner
        
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Assets/songs/${songIndex+1}.mp3`; //here we used backticks 
        masterSongName.innerText =  songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

//next button
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex += 1; 
    }
    audioElement.src = `Assets/songs/${songIndex+1}.mp3`; //here we used backticks 
    masterSongName.innerText =  songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

//previous button
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=9;

    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Assets/songs/${songIndex+1}.mp3`; //here we used backticks
    masterSongName.innerText =  songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})