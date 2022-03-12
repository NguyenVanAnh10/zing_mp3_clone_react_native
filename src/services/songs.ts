import apis from 'services/api';
import endpointSong from 'constants/api';

export default {
  getSong: (params: {[key: string]: any}) =>
    apis.GET(endpointSong.getSong, params),
  getSongs: (params: {[key: string]: any}) =>
    apis.GET(endpointSong.getSongs, params),
};
