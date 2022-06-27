import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import rootReducer from './reducers/root.reducer';
import AsyncStorage from '@react-native-community/async-storage';
// import logger from 'redux-logger';

const middleware = applyMiddleware(thunk);

const persistedConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['authReducer', 'userReducer', 'homeReducer'],
  // blacklist: ['clockStatsReducer'],
};

const persistedReducer = persistReducer(persistedConfig, rootReducer);
// const persistedReducer = persistReducer(persistedConfig);
const store = createStore(persistedReducer, middleware);
const persister = persistStore(store);

export {store, persister};
