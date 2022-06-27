import {
  GET_SUBSCRIPTION_TYPES,
  GET_ALL_SUBSCRIPTIONS,
  GET_MY_SUBSCRIPTIONS,
  LOGOUT,
} from '../actions/subscriptions.actions';

const INITIAL_STATE = {
  subscriptionTypes: null,
  allSubscriptions: null,
  mySubscriptions: [],
};

const subscriptionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTION_TYPES:
      return {...state, subscriptionTypes: action.payload};
    case GET_ALL_SUBSCRIPTIONS:
      return {...state, allSubscriptions: action.payload};
    case GET_MY_SUBSCRIPTIONS:
      return {...state, mySubscriptions: action.payload};
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default subscriptionsReducer;
