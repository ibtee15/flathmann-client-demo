import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import UserNavigator from './user.navigator';
import AdminNavigator from './admin.navigator';
import AuthNavigator from './auth.navigator';
import SplashScreen from '../screens/splashscreen';
import {getDeviceTokenFCM} from '../utils/firebaseConfig';
import firebase from '@react-native-firebase/app';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: 'AIzaSyC6UkpyCZrJ7_EnM5XtIIdUxgs6XxLVK5k',
  authDomain: 'hazir-sain-store.firebaseapp.com',
  projectId: 'hazir-sain-store',
  storageBucket: 'hazir-sain-store.appspot.com',
  messagingSenderId: '485677407968',
  appId: '1:485677407968:web:8cfd0d95de4e3a3ac5ba85',
  measurementId: 'G-1VDYNYS0R2',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function RootNavigator(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    handleSetDeviceToken();
  }, []);

  const handleSetDeviceToken = async () => {
    let res = await getDeviceTokenFCM();
    // console.log('res of device tokenn', res);
    dispatch({
      type: 'DEVICE_TOKEN',
      payload: res,
    });
  };

  return (
    <Stack.Navigator
      initialRouteName={'SplashScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="UserNavigator" component={UserNavigator} />
      <Stack.Screen name="AdminNavigator" component={AdminNavigator} />
      <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
