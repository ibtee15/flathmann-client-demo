import Api from '../utils/Api';

export const getRules = token => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('rule', config);
};

export const getOneRule = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('rule/' + id, config);
};

export const createRule = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.post('admin/createRule', data, config);
};

export const updateRule = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.patch('admin/updateRule', data, config);
};

export const saveGame = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.post('match/create', data, config);
};
