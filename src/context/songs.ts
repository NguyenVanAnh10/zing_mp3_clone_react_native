import React from 'react';

import {TSongsContext} from './type';

export const initialState: TSongsContext = {
  state: {
    songs: {},
    songIds: [],
    getSong: {},
  },
  dispatch: () => {},
};

export default React.createContext(initialState);
