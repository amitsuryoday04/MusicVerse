const songInput = document.getElementById("songLink");
const addBtn = document.getElementById("addSong");
const playlist = document.getElementById("playlist");
const player = document.getElementById("youtubePlayer");
const search = document.getElementById("search");

let songs = JSON.parse(localStorage.getItem("songs")) || [];
let currentIndex = 0;

// YouTube ID nikalna
function getVideoId(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Playlist dikhana
function renderPlaylist(list = songs) {
    playlist.innerHTML = "";

    list.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerHTML = `🎵 Song ${index + 1}`;

        li.onclick = () => {
            currentIndex = index;
            playSong(song.id);
        };

        playlist.appendChild(li);
    });

    localStorage.setItem("songs", JSON.stringify(songs));
}

// Song play
function playSong(id) {
    player.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
}

// Add song
addBtn.onclick = () => {
    const url = songInput.value.trim();

    const id = getVideoId(url);

    if (!id) {
        alert("Invalid YouTube Link");
        return;
    }

    songs.push({ id });

    songInput.value = "";

    renderPlaylist();
};

// Search
search.onkeyup = () => {

    const value = search.value.toLowerCase();

    const filtered = songs.filter((song, index) =>
        ("Song " + (index + 1)).toLowerCase().includes(value)
    );

    renderPlaylist(filtered);

};

// Next
document.getElementById("next").onclick = () => {

    if (songs.length == 0) return;

    currentIndex++;

    if (currentIndex >= songs.length)
        currentIndex = 0;

    playSong(songs[currentIndex].id);

};

// Previous
document.getElementById("prev").onclick = () => {

    if (songs.length == 0) return;

    currentIndex--;

    if (currentIndex < 0)
        currentIndex = songs.length - 1;

    playSong(songs[currentIndex].id);

};

// Play button
document.getElementById("play").onclick = () => {

    if (songs.length == 0) return;

    playSong(songs[currentIndex].id);

};

// Load saved playlist
renderPlaylist();
