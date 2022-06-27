import {getUsers} from '../../services/user.services';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const LOGOUT = 'LOGOUT';

export const GetAllUserAction = () => {
  return async (dispatch, getState) => {
    const {
      authReducer: {user},
    } = await getState();
    try {
      let result = await getUsers(user?.token);
      // console.log('GetAllUserAction =>> ', result.data);
      dispatch({
        type: GET_ALL_USERS,
        payload: result.data,
      });
    } catch (e) {
      console.log('error at GetAllUserAction', e?.message);
    }
  };
};
