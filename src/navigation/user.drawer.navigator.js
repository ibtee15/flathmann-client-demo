import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Colors, Dim} from '../constants/Theme';
import {Fonts} from '../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserDashboard from '../screens/user/dashboard';
import {useSelector, useDispatch} from 'react-redux';

const Drawer = createDrawerNavigator();

const UserDrawerNavigator = props => {
  return (
    <Drawer.Navigator
      initialRouteName="UserDashboard"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {width: Dim.w * 0.55},
      }}
      drawerContent={prop => <DrawerContent {...prop} {...props} />}>
      <Drawer.Screen
        name="UserDashboard"
        // initialParams={{key: props.route.params.key}}
        component={UserDashboard}
      />
    </Drawer.Navigator>
  );
};

function DrawerContent(props) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    props.navigation.navigate('AuthNavigator');
    dispatch({type: 'LOGOUT'});
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../assets/images/headerLeft.png')}
          style={styles.header}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/drawer.png')}
          />
        </ImageBackground>

        <View style={{marginBottom: 5}}>
          <Text style={styles.wlcmTxt}>Welcome!</Text>
          {/* <Text style={styles.wlcmTxt}>{user?.username}</Text> */}
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('MySubscriptions')}
          style={styles.btn}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="youtube-subscription"
              size={18}
              color={Colors.darkBlue}
              style={styles.subIcon}
            />
            <Text style={styles.txt}>My Subscriptions</Text>
          </View>
          <Entypo name="chevron-right" size={20} color={Colors.darkBlue} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('MyTeams')}
          style={styles.btn}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{...styles.scroll, paddingVertical: 3}}>
              <MaterialCommunityIcons
                name="account-group"
                size={15}
                color={Colors.darkBlue}
              />
            </View>
            <Text style={styles.txt}>My Teams</Text>
          </View>
          <Entypo name="chevron-right" size={20} color={Colors.darkBlue} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('CreateTeam')}
          style={styles.btn}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{...styles.scroll, paddingVertical: 3}}>
              <MaterialIcons
                name="group-add"
                size={15}
                color={Colors.darkBlue}
              />
            </View>
            <Text style={styles.txt}>Create Team</Text>
          </View>
          <Entypo name="chevron-right" size={20} color={Colors.darkBlue} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('GameLog')}
          style={styles.btn}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                ...styles.scroll,
                paddingVertical: 2,
                paddingHorizontal: 2,
              }}>
              <MaterialCommunityIcons
                name="history"
                size={18}
                color={Colors.darkBlue}
              />
            </View>
            <Text style={styles.txt}>Game Log</Text>
          </View>
          <Entypo name="chevron-right" size={20} color={Colors.darkBlue} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('GameRules')}
          style={styles.btn}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.scroll}>
              <FontAwesome5 name="scroll" size={12} color={Colors.darkBlue} />
            </View>
            <Text style={styles.txt}>Game Rules</Text>
          </View>
          <Entypo name="chevron-right" size={20} color={Colors.darkBlue} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('AllSubscriptions')}
          style={styles.btn}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="youtube-subscription"
              size={18}
              color={Colors.darkBlue}
              style={styles.subIcon}
            />
            <Text style={styles.txt}>All Subscriptions</Text>
          </View>
          <Entypo name="chevron-right" size={20} color={Colors.darkBlue} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('ContactUs')}
          style={{...styles.btn, marginBottom: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                ...styles.scroll,
                paddingVertical: 2,
                paddingHorizontal: 2,
              }}>
              <MaterialIcons
                name="phone-enabled"
                size={18}
                color={Colors.darkBlue}
              />
            </View>
            <Text style={styles.txt}>Contact us</Text>
          </View>
          <Entypo name="chevron-right" size={20} color={Colors.darkBlue} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logOutView}>
          <Image
            style={{marginRight: 10}}
            source={require('../assets/icons/logout.png')}
          />
          <Text style={styles.logOutTxt}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default UserDrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    width: Dim.w * 0.55,
    height: Dim.w * 0.56,
    paddingTop: Dim.w * 0.05,
  },
  icon: {
    alignSelf: 'center',
    width: Dim.w * 0.3,
    height: Dim.w * 0.265,
  },
  wlcmTxt: {
    color: Colors.darkBlue,
    fontSize: 35,
    alignSelf: 'center',
    fontFamily: Fonts.heading,
    marginVertical: 10,
  },
  userIcon: {
    borderRadius: 100,
    height: 60,
    width: 60,
    borderWidth: 3,
    borderColor: Colors.white,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: Dim.w * 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.blue,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  subIcon: {
    borderWidth: 1,
    borderRadius: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    paddingLeft: 3,
  },
  txt: {
    // fontSize: 15,
    color: Colors.darkBlue,
    marginLeft: 5,
    fontFamily: Fonts.regular,
  },
  scroll: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    padding: 3,
    paddingVertical: 4,
  },
  logOutView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: -5,
  },
  logOutTxt: {
    fontSize: 16,
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
  },
});
