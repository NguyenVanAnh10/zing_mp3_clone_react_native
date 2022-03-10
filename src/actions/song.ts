export const actionTypes = {
  GET_SONG: 'GET_SONG',
  GET_SONGS: 'GET_SONGS',
};

export default {
  getSong: (data: any) => ({type: actionTypes.GET_SONG, payload: data}),
  getSongs: (data: any) => ({type: actionTypes.GET_SONGS, payload: data}),
};
