import {GET_ALL_RULES, LOGOUT} from '../actions/game.actions';

const INITIAL_STATE = {
  allRules: null,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_RULES:
      return {...state, allRules: action.payload};
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default gameReducer;
