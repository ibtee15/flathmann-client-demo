import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';

import {useSelector, useDispatch} from 'react-redux';
import {GetAllUserAction} from '../../../redux/actions/user.actions';
import {GetAllRulesAction} from '../../../redux/actions/game.actions';
import {
  GetAllSubscriptionTypeAction,
  GetAllSubscriptionAction,
} from '../../../redux/actions/subscriptions.actions';
import {GetAllTeamsAction} from '../../../redux/actions/team.actions';

const AdminDashboard = props => {
  const dispatch = useDispatch();
  const drawerToggleHandler = () => {
    props.navigation.toggleDrawer();
  };

  useEffect(() => {
    dispatch(GetAllUserAction());
    dispatch(GetAllRulesAction());
    dispatch(GetAllSubscriptionTypeAction());
    dispatch(GetAllSubscriptionAction());
    dispatch(GetAllTeamsAction());
  }, []);

  const allSubscriptions = useSelector(
    state => state.subscriptionsReducer.allSubscriptions,
  );
  const allUsers = useSelector(state => state.userReducer.allUsers);
  const allTeams = useSelector(state => state.teamReducer.allTeams);

  return (
    <ImageBackground
      source={require('../../../assets/images/player.png')}
      style={styles.container}>
      <View style={{...styles.container, backgroundColor: 'rgba(0,0,0,0.8)'}}>
        <StatusBar backgroundColor={Colors.darkBlue} />

        <ImageBackground
          source={require('../../../assets/images/laxHeader.png')}
          style={{width: Dim.w, height: Dim.w * 0.45}}>
          <TouchableOpacity
            onPress={drawerToggleHandler}
            style={styles.menuBtn}>
            <Entypo name="menu" size={30} color={Colors.darkBlue} />
          </TouchableOpacity>
        </ImageBackground>

        <Image
          source={require('../../../assets/icons/dashboard.png')}
          style={styles.logo}
        />

        <View style={styles.rowView}>
          <View style={styles.subsContainer}>
            <Text style={styles.subTxt}>Number of Users</Text>
            <Text style={styles.number}>{allUsers?.length}</Text>
          </View>
          <View style={styles.subsContainer}>
            <Text style={styles.subTxt}>Number of Teams</Text>
            <Text style={styles.number}>{allTeams.length}</Text>
          </View>
        </View>

        <View style={styles.subsContainer2}>
          <Text style={{...styles.subTxt, width: Dim.w * 0.7}}>
            Total Num of Games
          </Text>
          <Text style={styles.number}>28</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  menuBtn: {
    padding: Dim.w * 0.03,
    marginTop: Dim.w * 0.28,
  },
  logo: {
    width: Dim.w * 0.5,
    height: Dim.w * 0.26,
    alignSelf: 'center',
    marginVertical: Dim.w * 0.08,
  },
  rowView: {
    width: Dim.w * 0.93,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  subsContainer: {
    width: Dim.w * 0.45,
    borderRadius: 15,
    backgroundColor: Colors.whiteO,
    padding: 10,
    paddingVertical: 15,
  },
  subTxt: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: Colors.darkBlue,
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.blue,
    width: Dim.w * 0.4,
    textAlign: 'center',
    paddingBottom: 5,
  },
  number: {
    fontSize: 30,
    color: Colors.darkBlue,
    alignSelf: 'center',
    marginTop: 5,
  },
  startBtn: {
    width: Dim.w * 0.65,
    borderRadius: 20,
    backgroundColor: Colors.darkBlue,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  btnTxt: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: 25,
  },
  subsContainer2: {
    width: Dim.w * 0.8,
    borderRadius: 15,
    backgroundColor: Colors.whiteO,
    padding: 10,
    paddingVertical: 15,
    alignSelf: 'center',
  },
});
