import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  RefreshControl,
  Image,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {getUsers} from '../../../services/user.services';
import {useSelector} from 'react-redux';

const AllUsers = props => {
  const goBackHandler = () => {
    props.navigation.goBack();
  };

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.authReducer.user);

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getUsers(user?.token);
        // console.log('user list successfull =====>>>', response.data);
        setUserData(response.data);
      } catch (error) {
        console.log('errorrrrrrr in all user list', error);
      } finally {
        setLoading(false);
      }
    };
    fnt();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <Image
        style={{position: 'absolute', bottom: 0}}
        source={require('../../../assets/images/racket.png')}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[Colors.blue, Colors.white]}
            refreshing={loading}
            // onRefresh={() => RefreshPage()}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/header.png')}
          style={{width: Dim.w, height: Dim.w * 0.45, marginBottom: 20}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>ALL USERS</Text>
        </ImageBackground>

        {/* {AllUsersList.map((v, i) => { */}
        {userData &&
          userData.map((v, i) => {
            return (
              <View style={styles.userView}>
                <View style={styles.userIcon}>
                  <Feather name="user" size={35} color={Colors.darkBlue} />
                </View>
                <View style={styles.subView}>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.name}>{v.userName}</Text>
                      {/* <Text style={styles.id}>[id #{v.number}]</Text> */}
                    </View>
                    {/* <Text style={styles.pckgName}>{v.pckg}</Text> */}
                    <Text style={styles.pckgName}>{v.email}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('UserDetails', {userId: v._id})
                    }>
                    <Entypo
                      name="chevron-right"
                      size={25}
                      color={Colors.darkBlue}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: Dim.w * 0.05,
    paddingBottom: Dim.w * 0.05,
  },
  headerTxt: {
    fontSize: 33,
    fontFamily: Fonts.heading,
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
  },
  userView: {
    width: Dim.w * 0.8,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userIcon: {
    borderRadius: 100,
    height: Dim.w * 0.16,
    width: Dim.w * 0.16,
    borderWidth: 3,
    borderColor: Colors.darkBlue,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backgroundColor: 'white',
  },
  subView: {
    width: Dim.w * 0.7,
    backgroundColor: Colors.lightgrey,
    left: -Dim.w * 0.08,
    paddingLeft: Dim.w * 0.07,
    paddingRight: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 5,
    borderTopWidth: 0.15,
    borderBottomWidth: 0.15,
    borderColor: Colors.grey,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: Colors.blue,
    fontSize: 15,
    marginRight: 10,
    fontFamily: Fonts.medium,
  },
  id: {
    color: Colors.darkBlue,
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  pckgName: {
    color: Colors.darkBlue,
    fontSize: 11,
    fontFamily: Fonts.bold,
  },
});
