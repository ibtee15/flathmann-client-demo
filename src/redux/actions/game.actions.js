import {getRules} from '../../services/game.services';
export const GET_ALL_RULES = 'GET_ALL_RULES';
export const LOGOUT = 'LOGOUT';

export const GetAllRulesAction = () => {
  return async (dispatch, getState) => {
    const {
      authReducer: {user},
    } = await getState();
    try {
      let result = await getRules(user?.token);
      // console.log('GetAllRulesAction =>> ', result.data);
      dispatch({
        type: GET_ALL_RULES,
        payload: result.data,
      });
    } catch (e) {
      console.log('error at GetAllRulesAction =====>', e);
    }
  };
};
