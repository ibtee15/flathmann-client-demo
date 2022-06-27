export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const DEVICE_TOKEN = 'DEVICE_TOKEN';

import {loginRequest} from '../../services/auth.services';

export const loginUserAction = (data, navigation, setLoading, setError) => {
  return async dispatch => {
    // console.log('username at loginUserAction => ', data);
    try {
      setLoading(true);
      let result = await loginRequest(data);
      navigation.navigate(
        result.data?.isAdmin ? 'AdminNavigator' : 'UserNavigator',
      );

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: result.data,
      });
    } catch (e) {
      setError(e);
      console.log('error at loginnnn', e);
    } finally {
      setLoading(false);
    }
  };
};
