import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import UserNavigator from './user.navigator';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

function AuthNavigator() {
  const user = useSelector(state => state.authReducer.user);
  console.log('User at authNavigator =>> ', user);

  return (
    <Stack.Navigator
      initialRouteName={
        user?.isAdmin ? 'AdminNavigator' : user ? 'UserNavigator' : 'Login'
      }
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="UserNavigator" component={UserNavigator} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
