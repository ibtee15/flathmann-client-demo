import {
  LOGIN_USER_SUCCESS,
  LOGOUT,
  DEVICE_TOKEN,
} from '../actions/auth.actions';

const INITIAL_STATE = {
  user: null,
  deviceToken: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {...state, user: action.payload};
    case DEVICE_TOKEN:
      return {...state, deviceToken: action.payload};
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
