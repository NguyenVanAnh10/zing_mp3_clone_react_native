import React from 'react';

type TSongsState = {
  state: {songs: any[]};
  dispatch: React.Dispatch<any>;
};
const initialState: TSongsState = {
  state: {
    songs: [],
  },
  dispatch: () => {},
};

export default React.createContext(initialState);
