import {getAllTeams} from '../../services/team.services';
export const ALL_TEAMS = 'ALL_TEAMS';
export const LOGOUT = 'LOGOUT';

export const GetAllTeamsAction = () => {
  return async (dispatch, getState) => {
    const {
      authReducer: {user},
    } = await getState();
    // console.log('GetAllTeamsAction authToken ==>> ', user?.token);
    try {
      let result = await getAllTeams(user?.token);
      // console.log('GetAllTeamsAction ==>>', result.data);
      dispatch({
        type: ALL_TEAMS,
        payload: result.data,
      });
    } catch (e) {
      console.log(
        'error in  GetAllTeamsAction =====>>!!',
        e?.response?.data?.responseMessage,
      );
    }
  };
};
