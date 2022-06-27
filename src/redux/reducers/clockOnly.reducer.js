import {
  TEAM_A_DETAILS,
  TEAM_B_DETAILS,
  GENERAL_DETAILS,
  CLOCK_SETTINGS,
  GAME_RULES,
  TEAM_A_SHOT,
  TEAM_B_SHOT,
  POSSESSION_BALL,
} from '../actions/clockOnly.actions';

const INITIAL_STATE = {
  teamA: {},
  teamB: {},
  general: {},
  rules: {},
  clockSetting: {},
};

const clockOnlyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAM_A_DETAILS:
      return {...state, teamA: action.payload};
    case TEAM_B_DETAILS:
      return {...state, teamB: action.payload};
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
    case POSSESSION_BALL:
      return {...state, activityLog: [...state.activityLog, action.payload]};
    default:
      return state;
  }
};

export default clockOnlyReducer;
