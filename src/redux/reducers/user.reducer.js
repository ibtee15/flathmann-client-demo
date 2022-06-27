import {GET_ALL_USERS, LOGOUT} from '../actions/user.actions';

const INITIAL_STATE = {
  allUsers: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, allUsers: action.payload};
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
