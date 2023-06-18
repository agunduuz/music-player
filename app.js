const container = document.querySelector('.container');

const image = document.querySelector('#music-image');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');

const prev = document.querySelector('#controls #prev');
const play = document.querySelector('#controls #play');
const next = document.querySelector('#controls #next');

const currentTime = document.querySelector('#current-time');
const duration = document.querySelector('#duration');
const progressBar = document.querySelector('#progress-bar');

const volume = document.querySelector('#volume');
const volumeBar = document.querySelector('#volume-bar');

const ul = document.querySelector('ul');
const listBtn = document.querySelector('.playlist');
const list = document.querySelector('#music-list');

const player = new MusicPlayer(musicList);

window.addEventListener('load', () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

function displayMusic(music) {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = 'img/' + music.image;
  audio.src = 'mp3/' + music.file;
}

// START - STOP BUTTON
play.addEventListener('click', () => {
  const isMusicPlay = container.classList.contains('playing');
  isMusicPlay ? pauseMusic() : playMusic();
});
const pauseMusic = () => {
  container.classList.remove('playing');
  play.classList = 'fa-solid fa-play';
  audio.pause();
};
const playMusic = () => {
  container.classList.add('playing');
  play.classList = 'fa-solid fa-pause';
  audio.play();
};

//PREV BUTTON
prev.addEventListener('click', () => {
  prevMusic();
});
const prevMusic = () => {
  player.prev();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
};

//NEXT BUTTON
next.addEventListener('click', () => {
  nextMusic();
});
const nextMusic = () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  pauseMusic();
  isPlayingNow();
};

// PROGRESS-BAR SHOW with JS
// TIME CALCULATE
calculateTime = (totalSecond) => {
  const minute = Math.floor(totalSecond / 60);
  const second = Math.floor(totalSecond % 60);
  const updateSecond = second < 10 ? `0${second}` : `${second}`;
  const result = `${minute}:${updateSecond}`;
  return result;
};
// DURATION SHOW & PROGRESS BAR
audio.addEventListener('loadedmetadata', () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});
// CURRENT TIME SHOW & PROGRESS BAR
audio.addEventListener('timeupdate', () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});
// PROGRESS BAR
progressBar.addEventListener('input', () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

// VOLUME
let muteState = 'unmuted';
volume.addEventListener('click', () => {
  if (muteState === 'unmuted') {
    audio.muted = true;
    muteState = 'muted';
    volume.classList = 'fa-solid fa-volume-xmark';
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    muteState = 'unmuted';
    volume.classList = 'fa-solid fa-volume-high';
    volumeBar.value = 100;
  }
});

// VOLUME BAR
volumeBar.addEventListener('click', (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    muteState = 'muted';
    volume.classList = 'fa-solid fa-volume-xmark';
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    muteState = 'unmuted';
    volume.classList = 'fa-solid fa-volume-high';
  }
});

// LIST BTN
listBtn.addEventListener('click', () => {
  const isListShow = list.classList.contains('show');
  isListShow ? noneList() : showList();
});
const noneList = () => {
  container.classList.remove('show');
  list.classList = 'collapse';
};
const showList = () => {
  container.classList.add('show');
  list.classList = 'show';
};

// MUSIC LIST
const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
    <li li-index='${i}' onclick="selectedMusic(this)" class="list-group">
            <span>${list[i].getName()} - ${list[i].getSinger()} </span>
            <span id="music-${i}" class="badge"></span>
            <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
          </li>
    `;
    ul.insertAdjacentHTML('beforeend', liTag);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);

    liAudioTag.addEventListener('loadeddata', () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

const selectedMusic = (li) => {
  player.index = li.getAttribute('li-index');
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};

const isPlayingNow = () => {
  for (let li of ul.querySelectorAll('li')) {
    if (li.classList.contains('playing')) {
      li.classList.remove('playing');
    }
    if (li.getAttribute('li-index') == player.index) {
      li.classList.add('playing');
    }
  }
};

audio.addEventListener('ended', () => {
  nextMusic();
});
