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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdminDashboard from '../screens/admin/dashboard';
import {useSelector, useDispatch} from 'react-redux';

const Drawer = createDrawerNavigator();

const AdminDrawerNavigator = props => {
  // alert(props.route.params.key);
  return (
    <Drawer.Navigator
      initialRouteName="AdminDashboard"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {width: Dim.w * 0.55},
      }}
      drawerContent={prop => <DrawerContent {...prop} {...props} />}>
      <Drawer.Screen
        name="AdminDashboard"
        // initialParams={{key: props.route.params.key}}
        component={AdminDashboard}
      />
    </Drawer.Navigator>
  );
};

function DrawerContent(props) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // console.log('Hiiiiiiiiii');
    props.navigation.navigate('AuthNavigator');
    dispatch({type: 'LOGOUT'});
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../assets/images/headerLeft.png')}
          style={styles.header}>
          <Image
            style={{width: Dim.w * 0.3, height: Dim.w * 0.265}}
            source={require('../assets/icons/drawer.png')}
          />
        </ImageBackground>

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
          onPress={() => props.navigation.navigate('CreateUser')}
          style={styles.btn}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image source={require('../assets/icons/addUsers.png')} /> */}
            <View style={styles.subIcon}>
              <MaterialIcons
                name="person-add-alt-1"
                size={16}
                color={Colors.darkBlue}
              />
            </View>
            <Text style={styles.txt}>Add Users</Text>
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
          onPress={() => props.navigation.navigate('AllUsers')}
          style={styles.btn}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{...styles.scroll, paddingVertical: 3}}>
              <MaterialCommunityIcons
                name="account-group"
                size={15}
                color={Colors.darkBlue}
              />
            </View>
            <Text style={styles.txt}>All Users</Text>
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
          onPress={() => props.navigation.navigate('AllSubscriptions')}
          style={{...styles.btn, marginBottom: 20}}>
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
      </ScrollView>

      <TouchableOpacity onPress={handleLogout} style={styles.logOutView}>
        <Image
          style={{marginRight: 10}}
          source={require('../assets/icons/logout.png')}
        />
        <Text style={styles.logOutTxt}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

// const mapStateToProps = state => {
//   return {
//     loading: state.userReducer.loading,
//     error: state.userReducer.error,
//     user: state.authReducer.user,
//   };
// };
// const actionDispatchToProps = dispatch => {
//   return {
//     logoutUser: bindActionCreators(logoutUserAction, dispatch),
//   };
// };
// export default connect(mapStateToProps, actionDispatchToProps)(DrawerNavigator);
export default AdminDrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    width: Dim.w * 0.55,
    height: Dim.w * 0.56,
    marginBottom: 10,
    paddingTop: Dim.w * 0.1,
    paddingLeft: Dim.w * 0.1,
  },
  btn: {
    width: Dim.w * 0.46,
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
    width: Dim.w * 0.4,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  logOutTxt: {
    fontSize: 16,
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
  },
});
