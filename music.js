class Music {
  constructor(title, singer, image, file) {
    this.title = title;
    this.singer = singer;
    this.image = image;
    this.file = file;
  }

  getName() {
    return this.title;
  }
  getSinger() {
    return this.singer;
  }
}

const musicList = [
  new Music('Giuro', 'MÖW', 'möw.jpeg', 'möw.mp3'),
  new Music('Bilboquet', 'Polo & Pan', 'polopan.jpeg', 'polopan.mp3'),
  new Music(
    "I Wish You'd Never",
    'Reset Robot',
    'iWish.jpeg',
    'reset-robot.mp3'
  ),
];
