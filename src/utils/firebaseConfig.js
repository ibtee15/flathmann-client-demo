import React from 'react';
import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

// const firebaseConfig = {
//   apiKey: 'AIzaSyClsd1bvinOtt592WPaa-vkZqygj3SGZeI',
//   authDomain: 'flethman-1bbbd.firebaseapp.com',
//   projectId: 'flethman-1bbbd',
//   storageBucket: 'flethman-1bbbd.appspot.com',
//   messagingSenderId: '778897144921',
//   appId: '1:778897144921:web:39a4e6218b67a8fa74c548',
//   measurementId: 'G-CJ13P3R4MF',
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const firebaseConfig = {
//   apiKey: 'AIzaSyC6UkpyCZrJ7_EnM5XtIIdUxgs6XxLVK5k',
//   authDomain: 'hazir-sain-store.firebaseapp.com',
//   projectId: 'hazir-sain-store',
//   storageBucket: 'hazir-sain-store.appspot.com',
//   messagingSenderId: '485677407968',
//   appId: '1:485677407968:web:8cfd0d95de4e3a3ac5ba85',
//   measurementId: 'G-1VDYNYS0R2',
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export const getDeviceTokenFCM = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    const deviceToken = await messaging().getToken();
    // console.log('Device tokennn ==>> ', deviceToken);
    if (deviceToken) {
      return deviceToken;
    }
  } catch (e) {
    console.log('Err at getDeviceToken()', e);
    console.error('Err at getDeviceToken()', e);
  }
};

export default () => {
  return {
    // firebase,
    // auth,
    messaging,
  };
};
