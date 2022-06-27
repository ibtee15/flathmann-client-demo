import Api from '../utils/Api';

export const loginRequest = data => {
  return Api.post('auth/login', data);
};
