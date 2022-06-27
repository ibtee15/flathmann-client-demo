import Api from '../utils/Api';

// ADMIN SIDE
export const getUsers = token => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('user', config);
};

export const getOneUser = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('user/' + id, config);
};

export const createUser = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.post('admin/createUser', data, config);
};

export const createUserSubscription = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.post('admin/createSubscription', data, config);
};

export const editUser = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.patch('admin/updateUser', data, config);
};

//USER SIDE
export const getUserSubscriptionDetails = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('subscription/' + id, config);
};

export const getUserSubscriptions = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.post('subscription/my', data, config);
};

export const deleteUser = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.delete('admin/deleteUser/' + id, config);
};
