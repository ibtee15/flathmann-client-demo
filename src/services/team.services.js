import Api from '../utils/Api';

export const getAllTeams = token => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('team', config);
};

export const getUserTeams = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('team/my/' + id, config);
};

export const getOneTeam = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('team/' + id, config);
};

export const createTeam = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.post('admin/createTeam', data, config);
};

export const editTeam = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.patch('admin/updateTeam', data, config);
};

export const deleteTeam = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.delete('team/' + id, config);
};
