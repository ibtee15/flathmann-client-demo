import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/src/integration/react';
// import {PersistGate} from 'redux-persist';
import {store, persister} from './src/redux/Store';
import RootNavigator from './src/navigation/root.navigator';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
