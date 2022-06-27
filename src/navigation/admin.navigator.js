import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AdminDrawerNavigator from './admin.drawer.navigator';
import Welcome from '../screens/user/welcome';
import AdminDashboard from '../screens/admin/dashboard';
import CreateTeam from '../screens/admin/createTeam';
import EditTeam from '../screens/admin/editTeam';
// import EditPlayers from '../screens/admin/editPlayer';
import CreateUser from '../screens/admin/createUser';
import AllUsers from '../screens/admin/allUsers';
import UserDetails from '../screens/admin/userDetails';
import EditUser from '../screens/admin/editUser';
import UserTeams from '../screens/admin/userTeams';
import TeamDetails from '../screens/admin/teamDetails';
import GameRules from '../screens/admin/gameRules';
import RuleDetail from '../screens/admin/ruleDetails';
import AddRule from '../screens/admin/addRule';
import GameLog from '../screens/admin/gameLog';
import GameLogDetails from '../screens/admin/logDetails';
import AllSubscriptions from '../screens/admin/allSubscriptions';
import UserSubscriptionDetails from '../screens/admin/userSubscriptionDetails';
import AuthNavigator from './auth.navigator';

const Stack = createStackNavigator();

function AdminNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AdminDrawerNavigator"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="AdminDrawerNavigator"
        component={AdminDrawerNavigator}
      />
      <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="CreateTeam" component={CreateTeam} />
      <Stack.Screen name="EditTeam" component={EditTeam} />
      {/* <Stack.Screen name="EditPlayers" component={EditPlayers} /> */}
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="AllUsers" component={AllUsers} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="EditUser" component={EditUser} />
      <Stack.Screen name="UserTeams" component={UserTeams} />
      <Stack.Screen name="TeamDetails" component={TeamDetails} />
      <Stack.Screen name="GameRules" component={GameRules} />
      <Stack.Screen name="RuleDetail" component={RuleDetail} />
      <Stack.Screen name="AddRule" component={AddRule} />
      <Stack.Screen name="GameLog" component={GameLog} />
      <Stack.Screen name="GameLogDetails" component={GameLogDetails} />
      <Stack.Screen name="AllSubscriptions" component={AllSubscriptions} />
      <Stack.Screen
        name="UserSubscriptionDetails"
        component={UserSubscriptionDetails}
      />
    </Stack.Navigator>
  );
}

export default AdminNavigator;
