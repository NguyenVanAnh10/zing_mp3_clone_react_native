import {actionTypes} from 'actions/song';

type TState = {
  songs: any[];
};

export const initialState: TState = {songs: []};

function songReducer(state: TState, action: {type: string; data: any}) {
  switch (action.type) {
    case actionTypes.GET_SONGS:
      return {songs: action.data};
    default:
      return state;
  }
}

export default songReducer;
