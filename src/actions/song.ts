export const actionTypes = {
  GET_SONGS: 'GET_SONGS',
};

export default {
  getSongs: (data: any) => ({type: actionTypes.GET_SONGS, payload: data}),
};
