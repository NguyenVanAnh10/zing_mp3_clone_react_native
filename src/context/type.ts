import {Song} from 'models/song';

export type TSongsState = {
  songs: {
    [id: string]: Song;
  };
  songIds: string[];
  getSong: {
    id?: string;
  };
};

export type TSongsContext = {
  state: TSongsState;
  dispatch: React.Dispatch<any>;
};
