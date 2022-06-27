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
import {GetMySubscriptionAction} from '../../../redux/actions/subscriptions.actions';
import {GetAllTeamsAction} from '../../../redux/actions/team.actions';

const UserDashboard = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.user);
  const mySubscriptions = useSelector(
    state => state.subscriptionsReducer.mySubscriptions,
  );
  const allTeams = useSelector(state => state.teamReducer.allTeams);

  const drawerToggleHandler = () => {
    props.navigation.toggleDrawer();
  };

  useEffect(() => {
    if (user) {
      dispatch(GetMySubscriptionAction({userId: user._id}, user?.token));
    }
    dispatch(GetAllTeamsAction(user?.token));
  }, [user]);

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
            <Text style={styles.subTxt}>My Subscriptions</Text>
            <Text style={styles.number}>{mySubscriptions.length}</Text>
          </View>
          <View style={styles.subsContainer}>
            <Text style={styles.subTxt}>Total Teams</Text>
            <Text style={styles.number}>{allTeams.length}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('MySubscriptions')}
          style={styles.startBtn}>
          <Text style={styles.btnTxt}>START NOW</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default UserDashboard;

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
    borderRadius: 10,
    backgroundColor: Colors.whiteO,
    padding: 10,
    paddingVertical: 15,
    // height: 110,
    // justifyContent: 'space-between',
  },
  subTxt: {
    fontSize: 12,
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
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
    fontFamily: Fonts.regular,
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
    color: Colors.white,
    fontSize: 46,
    fontFamily: Fonts.heading,
  },
});
