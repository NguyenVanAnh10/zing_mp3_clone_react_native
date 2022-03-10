import {useContext} from 'react';

import SongContext from 'context/songs';
import apis from 'mocks/api';
import actions from 'actions/song';

const useSongs = (): [{songs: any[]}, {getSongs: () => void}] => {
  const {
    state: {songs},
    dispatch,
  } = useContext(SongContext);
  const getSongs = async () => {
    const songData: any[] = await apis.getSongs();
    dispatch(actions.getSongs(songData));
  };
  return [{songs}, {getSongs}];
};

export default useSongs;
