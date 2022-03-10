import {Track} from 'react-native-track-player';

export interface Song extends Track {
  encodeId?: string;
  artist?: string;
  album?: string;
  genre?: string;
  date?: string;
  thumbnail?: string;
  artistName?: string;
}
