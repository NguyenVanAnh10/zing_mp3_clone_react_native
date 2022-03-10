import sound from 'assets/musics/test-music.mp3';

const songs = [
  {
    url: sound, // Load media from the app bundle
    title: 'Chiều thành đô',
    artist: 'Tuấn Vũ',
  },
  {
    url: sound, // Load media from the app bundle
    title: '2',
    artist: 'Tuấn Vũ 2',
  },
];

const TIME_OUT = 300;

const getSongs = (): Promise<any[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve(songs);
    }, TIME_OUT);
  });
};

export default {getSongs};
