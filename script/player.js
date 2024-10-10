'use strict';

//youtube
const key = "AIzaSyDHzuIgyYyL8xh1ySnjZxVK8u5lIOz2p40";
const playlistId = "PLYecEw7qru4nki9MfC9Ul1pozxb_Ysw6o";
const info = document.querySelector(".playlist .article .song-info");

//music 객체 배열로 지정
const musicList = [
	{ title: 'Under control', artist: 'The internet' },
	{ title: 'Rawww', artist: '유라' },
	{ title: 'Poéme in F-sharp major Op. 32, No. 1', artist: 'Alexander scriabin' }
]

let list_index = 0;
let player;

function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    height: '100',
    width: '100%',
    playerVars: 
      {
        listType:'playlist',
        list: playlistId,
        index: 0,
        autoplay: 1,
        loop: 1,
      },
    events: {
      'onReady': initialize,
      'onError': onPlayerError,
      'onStateChange': onPlayerStateChange,
    }
  });

  function onPlayerError(event) {
    console.error("Player Error: ", event.data);
    info.innerHTML = `<h4>Sorry, something went wrong.<br/>Try again please.</h4>`;
  }

  function updateTimerDisplay(){
    // Update current time text display.
    $('.current-time').text(formatTime( player.getCurrentTime() ));
    $('.duration').text(formatTime( player.getDuration() ));
  }
  
  function formatTime(time){
    time = Math.round(time);
  
    var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    return minutes + ":" + seconds;
  }
  
  function updateProgressBar(){
    // Update the value of our progress bar accordingly.
    $('.progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
  }

  function songInfo(){
    if (player.getPlayerState() == 1 && musicList.length > 0) {
      info.innerHTML = `
        <h4>${musicList[list_index].title}</h4>
        <p>${musicList[list_index].artist}</p>`;
    }
    if (player.getPlayerState() == -1){
      info.innerHTML = `
        <h4>Sorry, I'm late.</h4>
        <p>You'd better click any button.</p>`;
    } else if (player.getPlayerState() == 5){
      info.innerHTML = `
        <h4>Sorry, something went wrong.</h4>
        <p>Try again please.</p>`;
    }
  }

  function initialize(){
    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();
    songInfo();
  
    // Clear any old interval.
    clearInterval(time_update_interval);
  
    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    var time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)
  
  }

  function onPlayerStateChange(event) {
    var currentIndex = event.target.getPlaylistIndex();
    if (event.data == YT.PlayerState.PLAYING){
      console.log(currentIndex);
      list_index = currentIndex;
    }
    songInfo();
  }

  document.querySelector('.prev').onclick = function() {
    list_index--;
    if( list_index < 0 ){ list_index = musicList.length -1; };
    player.previousVideo();
    songInfo();
  };
  document.querySelector('.next').onclick = function() {
    list_index++;
    list_index=list_index%musicList.length;
    player.nextVideo();
    songInfo();
  };

  document.querySelector(".play_pause").addEventListener('click', function (event) {
    if (player.getPlayerState() == 1) { //Returns true if video is playing
      player.pauseVideo();
    } else {
      player.playVideo(); 
    }
});

};

onYouTubePlayerAPIReady();