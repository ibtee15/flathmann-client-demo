import {
  getAllSubscriptionsType,
  getAllSubscriptions,
  getMySubscriptions,
} from '../../services/subscriptions.services';
export const GET_SUBSCRIPTION_TYPES = 'GET_SUBSCRIPTION_TYPES';
export const GET_ALL_SUBSCRIPTIONS = 'GET_ALL_SUBSCRIPTIONS';
export const GET_MY_SUBSCRIPTIONS = 'GET_MY_SUBSCRIPTIONS';
export const LOGOUT = 'LOGOUT';

export const GetAllSubscriptionTypeAction = () => {
  return async (dispatch, getState) => {
    const {
      authReducer: {user},
    } = await getState();
    try {
      let result = await getAllSubscriptionsType(user?.token);
      // console.log('GetAllSubscriptionTypeAction ==>>', result.data);
      dispatch({
        type: GET_SUBSCRIPTION_TYPES,
        payload: result.data,
      });
    } catch (e) {
      console.log('error in  getAllSubscriptionsType =====>>!!');
    }
  };
};

export const GetAllSubscriptionAction = () => {
  return async (dispatch, getState) => {
    const {
      authReducer: {user},
    } = await getState();
    try {
      let result = await getAllSubscriptions(user?.token);
      // console.log('GetAllSubscriptionAction ==>>', result.data);
      dispatch({
        type: GET_ALL_SUBSCRIPTIONS,
        payload: result.data,
      });
    } catch (e) {
      console.log('error in  GetAllSubscriptionAction =====>>', e);
    }
  };
};

export const GetMySubscriptionAction = data => {
  return async (dispatch, getState) => {
    const {
      authReducer: {user},
    } = await getState();
    try {
      let result = await getMySubscriptions(data, user?.token);
      // console.log('GetMySubscriptionAction ==>>', result.data);
      dispatch({
        type: GET_MY_SUBSCRIPTIONS,
        payload: result.data,
      });
    } catch (e) {
      console.log('error in  GetMySubscriptionAction =====>>', e);
    }
  };
};
