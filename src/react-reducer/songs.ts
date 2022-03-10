import produce from 'immer';

import {actionTypes} from 'actions/song';
import {Song} from 'models/song';
import {TSongsState} from 'context/type';

const songReducer = produce((state: TSongsState, action) => {
  switch (action.type) {
    case actionTypes.GET_SONGS:
      state.songIds = ((action.payload || []) as Song[]).map(
        song => song.encodeId as string,
      );
      state.songs = ((action.payload || []) as Song[]).reduce(
        (s, song) => ({
          ...s,
          [song.encodeId as string]: song,
        }),
        {},
      );
      break;
    case actionTypes.GET_SONG:
      state.songs[action.payload.id] = {
        ...state.songs[action.payload.id],
        ...action.payload,
      };
      state.getSong = {
        id: action.payload.id,
      };
      break;
    default:
      return state;
  }
});

export default songReducer;
