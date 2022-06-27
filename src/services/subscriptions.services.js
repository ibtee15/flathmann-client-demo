import Api from '../utils/Api';

//ADMIN ALL SUBSCRIPTIONS

export const getAllSubscriptionsType = token => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('subscription-type', config);
};

export const getAllSubscriptions = token => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('subscription', config);
};

export const getOneSubscriptionType = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.get('subscription-type/' + id, config);
};

export const createSubscriptionType = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.post('admin/create-subscription-type', data, config);
};

export const getMySubscriptions = (data, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.post('subscription/my', data, config);
};

// export const deleteUserSubscription = (id, token) => {
//   const config = {headers: {Authorization: `Bearer ${token}`}};
//   return Api.delete('team/' + id, config);
// };

export const deleteSubscriptionType = (id, token) => {
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return Api.delete('admin/delete-subscription-type/' + id, config);
};
