import {
  GROUND_BALL,
  TAKEAWAY,
  TURNOVER,
  CAUSED_TURNOVER,
  GOALIE_CLEAR,
  CLEAR_SUCCESS,
  CLEAR_FAILED,
  PLAYER_SUBSTITUTION,
  BALL_POSSESSION,
  TEAM_A_PENALTY,
  TEAM_B_PENALTY,
  REMOVE_TEAM_A_PENALTY,
  REMOVE_TEAM_B_PENALTY,
  TIMEOUT,
  FACE_OFF_ATTEMPT,
  FACE_OFF_VIOLATION,
  FACE_OFF_WON,
  LOGOUT,
  GENERAL_DETAILS,
  CLOCK_SETTINGS,
  GAME_RULES,
  TEAM_A_SHOT,
  TEAM_B_SHOT,
  TEAM_A_GOAL,
  TEAM_B_GOAL,
  TEAM_A_SAVE,
  TEAM_B_SAVE,
  LOST_POSSESSION_A,
  LOST_POSSESSION_B,
  CLEAR_ACTIVITY_LOG,
  SAVE_ACTIVITY_LOG,
  TEAM_A_TIMEOUT,
  TEAM_B_TIMEOUT,
  TEAM_A_DETAILS,
  TEAM_B_DETAILS,
  PENALTY_TIME_TEAM_A,
  PENALTY_TIME_TEAM_B,
} from '../actions/clockStats.actions';

const INITIAL_STATE = {
  teamA: {penalties: []},
  teamB: {penalties: []},
  general: {},
  activityLog: [],
  rules: {},
  clockSetting: {},
};

const clockStatsReducer = (state = INITIAL_STATE, action) => {
  // console.log('action.paylod =>> ', action.payload);
  switch (action.type) {
    case TEAM_A_DETAILS:
      return {...state, teamA: {...action.payload, penalties: []}};
    case TEAM_B_DETAILS:
      return {...state, teamB: {...action.payload, penalties: []}};
    case GENERAL_DETAILS:
      return {...state, general: action.payload};
    case GAME_RULES:
      return {...state, rules: action.payload};
    case CLOCK_SETTINGS:
      return {...state, clockSetting: action.payload};
    case TEAM_A_SHOT:
      return {...state, teamA: {...state.teamA, goals: action.payload}};
    case TEAM_B_SHOT:
      return {...state, teamB: {...state.teamB, goals: action.payload}};
    case TEAM_A_GOAL:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case TEAM_B_GOAL:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case TEAM_A_SAVE:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case TEAM_B_SAVE:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case LOST_POSSESSION_A:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case LOST_POSSESSION_B:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case GROUND_BALL:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case CAUSED_TURNOVER:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case TAKEAWAY:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case TURNOVER:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case GOALIE_CLEAR:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case CLEAR_SUCCESS:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case CLEAR_FAILED:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case PLAYER_SUBSTITUTION:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case BALL_POSSESSION:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    // case PENALTY_TIME_TEAM_A:
    //   return {
    //     ...state,
    //     teamA: {
    //       ...state.teamA,
    //       penalties: [
    //         ...(state.teamA.penalties[action.payload.index].time =
    //           action.payload.time),
    //       ],
    //     },
    //   };
    case REMOVE_TEAM_A_PENALTY:
      return {
        ...state,
        teamA: {
          ...state.teamA,
          penalties: [...action.payload],
        },
      };
    case REMOVE_TEAM_B_PENALTY:
      return {
        ...state,
        teamA: {
          ...state.teamA,
          penalties: [...action.payload],
        },
      };

    case TEAM_A_PENALTY:
      return {
        ...state,
        activityLog: [...state.activityLog, action.payload],
        teamA: {
          ...state.teamA,
          penalties: [...state.teamA.penalties, action.payload],
        },
      };
    case TEAM_B_PENALTY:
      return {
        ...state,
        activityLog: [...state.activityLog, action.payload],
        teamB: {
          ...state.teamB,
          penalties: [...state.teamB.penalties, action.payload],
        },
      };
    case TIMEOUT:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case FACE_OFF_ATTEMPT:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case FACE_OFF_VIOLATION:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case FACE_OFF_WON:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    case TEAM_A_TIMEOUT:
      return {...state, teamA: {...state.teamA, timeoutsLeft: action.payload}};
    case TEAM_B_TIMEOUT:
      return {...state, teamB: {...state.teamB, timeoutsLeft: action.payload}};

    case SAVE_ACTIVITY_LOG:
      return {...state, activityLog: action.payload};
    case CLEAR_ACTIVITY_LOG:
      return {...state, activityLog: []};
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default clockStatsReducer;
