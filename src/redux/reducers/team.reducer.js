import {ALL_TEAMS, LOGOUT} from '../actions/team.actions';

const INITIAL_STATE = {
  allTeams: [],
};

const teamReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_TEAMS:
      return {...state, allTeams: action.payload};
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default teamReducer;
