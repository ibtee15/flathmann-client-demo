import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import UserDrawerNavigator from './user.drawer.navigator';
import Welcome from '../screens/user/welcome';
import UserDashboard from '../screens/user/dashboard';
import MySubscriptions from '../screens/user/mySubscriptions';
import SubscriptionDetails from '../screens/user/subscriptionDetails';
import AllSubscriptions from '../screens/user/allSubscriptions';
import CreateClockStats from '../screens/user/createGame/ClockStats.js';
import CreateClockOnly from '../screens/user/createGame/ClockOnly.js';
import OpponentTeam from '../screens/user/opponentTeam';
import LicenseTeam from '../screens/user/licenseTeam';
import EditGameRules from '../screens/user/editGameRules';
import GameRules from '../screens/user/gameRules';
import RuleDetail from '../screens/user/ruleDetail';
import MyTeams from '../screens/user/myTeams';
import CreateTeam from '../screens/user/createTeam';
import EditTeam from '../screens/user/editTeams';
import GameLog from '../screens/user/gameLog';
import GameLogDetails from '../screens/user/logDetails';
import ClockOnly from '../screens/user/clockOnly';
import ClockWithStats from '../screens/user/clockWithStats';
import ContactUs from '../screens/user/contactUs';
import AuthNavigator from './auth.navigator';
const Stack = createStackNavigator();

function UserNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="UserDrawerNavigator"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="UserDrawerNavigator"
        component={UserDrawerNavigator}
      />
      <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="UserDashboard" component={UserDashboard} />
      <Stack.Screen name="MySubscriptions" component={MySubscriptions} />
      <Stack.Screen
        name="SubscriptionDetails"
        component={SubscriptionDetails}
      />
      <Stack.Screen name="AllSubscriptions" component={AllSubscriptions} />
      <Stack.Screen name="CreateClockStats" component={CreateClockStats} />
      <Stack.Screen name="CreateClockOnly" component={CreateClockOnly} />
      <Stack.Screen name="OpponentTeam" component={OpponentTeam} />
      <Stack.Screen name="LicenseTeam" component={LicenseTeam} />
      <Stack.Screen name="EditGameRules" component={EditGameRules} />
      <Stack.Screen name="GameRules" component={GameRules} />
      <Stack.Screen name="RuleDetail" component={RuleDetail} />
      <Stack.Screen name="MyTeams" component={MyTeams} />
      <Stack.Screen name="CreateTeam" component={CreateTeam} />
      <Stack.Screen name="GameLog" component={GameLog} />
      <Stack.Screen name="GameLogDetails" component={GameLogDetails} />
      <Stack.Screen name="ClockOnly" component={ClockOnly} />
      <Stack.Screen name="ClockWithStats" component={ClockWithStats} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="EditTeam" component={EditTeam} />
    </Stack.Navigator>
  );
}

export default UserNavigator;
