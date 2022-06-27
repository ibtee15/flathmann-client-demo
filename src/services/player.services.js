import Api from '../utils/Api';

export const getPlayers = token => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('player', config);
};

export const getTeamPlayers = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('player/my/' + id, config);
};

export const getOnePlayer = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('player/' + id, config);
};

export const createPlayer = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.post('admin/createPlayer', data, config);
};

export const updatePlayer = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.patch('admin/updatePlayer', data, config);
};
