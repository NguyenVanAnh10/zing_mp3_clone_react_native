import {useContext, useMemo} from 'react';

import SongContext from 'context/songs';
import songAPIs from 'services/songs';
import actions from 'actions/song';
import {Song} from 'models/song';
import configs from 'configs/configs';
import {getSigNumber} from 'utils/zingmp3';
import endpointSong from 'constants/api';

const useSongs = (): [
  {songs: Song[]},
  {getSongs: (id: string) => Promise<void>},
] => {
  const {
    state: {songs, songIds},
    dispatch,
  } = useContext(SongContext);

  const getSong = async (songId: string) => {
    const songData = await songAPIs.getSong({
      id: songId,
      ctime: configs.ctime,
      version: configs.appVersion,
      sig: getSigNumber({
        id: songId,
        ctime: configs.ctime,
        api: endpointSong.getSong,
      }),
      apiKey: configs.apiKey,
    });
    return {
      ...songData,
      id: songId,
      url:
        songData?.data?.['320'] && songData?.data?.['320'] !== 'VIP'
          ? songData?.data?.['320']
          : songData?.data?.['128'] || 'default',
    };
  };

  const getSongs = async (listId: string) => {
    const songData = await songAPIs.getSongs({
      id: listId,
      ctime: configs.ctime,
      version: configs.appVersion,
      sig: getSigNumber({
        id: listId,
        ctime: configs.ctime,
        api: endpointSong.getSongs,
      }),
      apiKey: configs.apiKey,
    });
    const data = await Promise.all(
      ((songData?.data?.song?.items || []) as Song[]).map(async song => {
        const detailSong = await getSong(song.encodeId as string);
        return {
          ...song,
          ...detailSong,
        };
      }),
    );
    dispatch(actions.getSongs(data));
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

  const getSong = (id: string) => {
    dispatch(actions.getSong({id}));
  };

  return [{song: songs?.[getSongState?.id as string]}, {getSong}];
};

export default useSongs;
