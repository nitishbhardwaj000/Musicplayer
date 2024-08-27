
let modal = document.getElementById("downloadModal");

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}
function downloadbutton() {
    openModal(); // Call the openModal() function to open the modal
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Function to handle the download action
function downloadSong() {
    let songName = document.getElementById('downloadInput').value.trim();
    // You can add validation for songName here
    if (songName !== "") {
        // Here you would add logic to download the song
        // For simplicity, let's just display a confirmation message
        alert(`Downloading ${songName}...`);
        closeModal();
    } else {
        // If the input field is empty, prompt the user to enter a song name
        alert("Please enter a song name.");
    }
}












let progress = document.getElementById("progress");


let songs = [
    { title: "Karan Aujla - Winning Speech", src: "../musicfiles/Winning-Speech-Karan-Aujla.mp3" },
    { title: "Sidhu Moosewala- LEVELS", src: "../musicfiles/Levels-Sidhu_Moose_Wala-(Djjaani.com).mp3"},  
    { title: "Karan Aujla- 52 Bars", src: ".././musicfiles/52_Bars-Karan_Aujla-(Djjaani.com).mp3" } ,
    {title:"Karan Aujla -Goin Off",src:"../musicfiles/Goin_Off_-Karan_Aujla-(Djjaani.com).mp3"}
];

let song = document.getElementById("audio");
let controlic = document.getElementById("ctrlicon");
let songTitleElement = document.getElementById("songTitle");

let currentSongIndex = 0;
loadSong(currentSongIndex);

song.addEventListener('loadedmetadata', function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
});
function loadSong(index) {
    song.src = songs[index].src;
    songTitleElement.textContent = songs[index].title;
    song.load();
    song.removeEventListener('loadedmetadata', updateProgressBar); // Remove existing listener
    song.addEventListener('loadedmetadata', updateProgressBar); // Add new listener

    // Add event listener to start playing the song when it's loaded
    song.addEventListener('loadeddata', function() {
        song.play();
        controlic.classList.add("fa-pause");
        controlic.classList.remove("fa-play");
    });
}

function updateProgressBar() {
    progress.max = song.duration;
    progress.value = 0;
}

function playsong() {
    if (controlic.classList.contains("fa-pause")) {
        song.pause();
        controlic.classList.remove("fa-pause");
        controlic.classList.add("fa-play");
    } else {
        song.play();
        controlic.classList.add("fa-pause");
        controlic.classList.remove("fa-play");
    }
}

// Update progress bar more frequently (e.g., every 1000 milliseconds)
setInterval(function() {
    if (!song.paused && !song.ended) {
        progress.value = song.currentTime;
    }
}, 1000);
function downloadbutton()
{

}

progress.onchange = () => {
    song.currentTime = progress.value;
    if (song.paused) {
        song.play();
        controlic.classList.add("fa-pause");
        controlic.classList.remove("fa-play");
    }
};

// Add event listener to update the progress bar when the song is playing
song.addEventListener('timeupdate', function() {
    if (!progress.getAttribute('max')) progress.setAttribute('max', song.duration);
    progress.value = song.currentTime;
});

function nextsong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    console.log("next song");
    song.play();
    controlic.classList.add("fa-pause");
    controlic.classList.remove("fa-play");
}

function prevsong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    song.play();
    controlic.classList.add("fa-pause");
    controlic.classList.remove("fa-play");
}




