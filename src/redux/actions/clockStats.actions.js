// import {getRules} from '../../services/game.services';
export const GROUND_BALL = 'GROUND_BALL';
export const CAUSED_TURNOVER = 'CAUSED_TURNOVER';
export const TAKEAWAY = 'TAKEAWAY';
export const TURNOVER = 'TURNOVER';
export const GOALIE_CLEAR = 'GOALIE_CLEAR';
export const CLEAR_SUCCESS = 'CLEAR_SUCCESS';
export const CLEAR_FAILED = 'CLEAR_FAILED';
export const PLAYER_SUBSTITUTION = 'PLAYER_SUBSTITUTION';
export const LOGOUT = 'LOGOUT';
export const TEAM_A_DETAILS = 'TEAM_A_DETAILS';
export const TEAM_B_DETAILS = 'TEAM_B_DETAILS';
export const GENERAL_DETAILS = 'GENERAL_DETAILS';
export const GAME_RULES = 'GAME_RULES';
export const CLOCK_SETTINGS = 'CLOCK_SETTINGS';
export const TEAM_A_SHOT = 'TEAM_A_SHOT';
export const TEAM_B_SHOT = 'TEAM_B_SHOT';
export const TEAM_A_GOAL = 'TEAM_A_GOAL';
export const TEAM_B_GOAL = 'TEAM_B_GOAL';
export const TEAM_A_SAVE = 'TEAM_A_SAVE';
export const TEAM_B_SAVE = 'TEAM_B_SAVE';
export const LOST_POSSESSION_A = 'LOST_POSSESSION_A';
export const LOST_POSSESSION_B = 'LOST_POSSESSION_B';
export const BALL_POSSESSION = 'BALL_POSSESSION';
export const TEAM_A_PENALTY = 'TEAM_A_PENALTY';
export const REMOVE_TEAM_A_PENALTY = 'REMOVE_TEAM_A_PENALTY';
export const REMOVE_TEAM_B_PENALTY = 'REMOVE_TEAM_B_PENALTY';

export const TEAM_B_PENALTY = 'TEAM_B_PENALTY';
export const PENALTY_TIME_TEAM_A = 'PENALTY_TIME_TEAM_A';
export const PENALTY_TIME_TEAM_B = 'PENALTY_TIME_TEAM_B';
export const TIMEOUT = 'TIMEOUT';
export const FACE_OFF_ATTEMPT = 'FACE_OFF_ATTEMPT';
export const FACE_OFF_VIOLATION = 'FACE_OFF_VIOLATION';
export const FACE_OFF_WON = 'FACE_OFF_WON';
export const CLEAR_ACTIVITY_LOG = 'CLEAR_ACTIVITY_LOG';
export const SAVE_ACTIVITY_LOG = 'SAVE_ACTIVITY_LOG';
export const TEAM_A_TIMEOUT = 'TEAM_A_TIMEOUT';
export const TEAM_B_TIMEOUT = 'TEAM_B_TIMEOUT';

// export const GetAllRulesAction = () => {
//   return async dispatch => {
//     try {
//       let result = await getRules();
//       console.log('GetAllRulesAction =>> ', result.data);
//       dispatch({
//         type: GET_ALL_RULES,
//         payload: result.data,
//       });
//     } catch (e) {
//       console.log('error at GetAllRulesAction =====>', e);
//     }
//   };
// };

// export const PossessBallAction = data => {
//   return async dispatch => {
//     try {
//       dispatch({
//         type: 'BALL_POSSESSION',
//         payload: data,
//       });
//     } catch (e) {
//       console.log('Err at PossessBallAction => ', e);
//     }
//   };
// };
