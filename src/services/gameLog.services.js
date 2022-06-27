import Api from '../utils/Api';

export const getUserLogs = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('match/my/' + id, config);
};

export const getOneLog = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('match/' + id, config);
};
