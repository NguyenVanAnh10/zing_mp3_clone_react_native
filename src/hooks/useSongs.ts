import {useContext, useMemo} from 'react';

import SongContext from 'context/songs';
import songAPIs from 'services/songs';
import actions from 'actions/song';
import {Song} from 'models/song';
import configs from 'configs/configs';
import {getSigNumber} from 'utils/zingmp3';
import endpointSong from 'constants/api';

const useSongs = (): [{songs: Song[]}, {getSongs: () => void}] => {
  const {
    state: {songs, songIds},
    dispatch,
  } = useContext(SongContext);
  const getSongs = async () => {
    const songData = await songAPIs.getSongs({
      id: 'ZUOOZ00D',
      ctime: configs.ctime,
      version: configs.appVersion,
      sig: getSigNumber({
        id: 'ZUOOZ00D',
        ctime: configs.ctime,
        api: endpointSong.getSongs,
      }) as string,
      apiKey: configs.apiKey,
    });
    console.log('songData', songData);
    dispatch(
      actions.getSongs(
        (songData?.data?.song?.items || []).map((song: Song) => ({
          ...song,
          url: song.url || 'default',
        })),
      ),
    );
  };

  const songData = useMemo(
    () => (songIds || []).map(id => songs[id]),
    [songIds, songs],
  );

  return [{songs: songData}, {getSongs}];
};

export const useSong = (): [{song: Song}, {getSong: (id: string) => void}] => {
  const {
    state: {songs, getSong: getSongState},
    dispatch,
  } = useContext(SongContext);
  const getSong = async (songId: string) => {
    const songData = await songAPIs.getSong({
      id: songId,
      ctime: '1646909202',
      version: configs.appVersion,
      sig: '23ca64dab4586262433ee55ad9ea6a487bba0df812a2343dc2e80960b4b775d04a66950e6316b9ebe2609b1c17c3cf06f0fa38bb252490a01c37299ca9f3b6a3',
      apiKey: configs.apiKey,
    });
    console.log('songData', songData);

    dispatch(
      actions.getSong({
        id: songId,
        url:
          songData?.data?.['320'] && songData?.data?.['320'] !== 'VIP'
            ? songData?.data?.['320']
            : songData?.data?.['128'],
      }),
    );
  };
  return [{song: songs?.[getSongState?.id as string]}, {getSong}];
};

export default useSongs;
