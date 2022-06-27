import {combineReducers} from 'redux';
import userReducer from './user.reducer';
import authReducer from './auth.reducer';
import gameReducer from './game.reducer';
import subscriptionsReducer from './subscriptions.reducer';
import clockStatsReducer from './clockStats.reducer';
import clockOnlyReducer from './clockOnly.reducer';
import teamReducer from './team.reducer';

const rootReducer = combineReducers({
  userReducer,
  authReducer,
  gameReducer,
  subscriptionsReducer,
  clockStatsReducer,
  clockOnlyReducer,
  teamReducer,
});

export default rootReducer;
