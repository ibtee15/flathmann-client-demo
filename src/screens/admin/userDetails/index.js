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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

import DeleteOverlay from '../../../components/overlays/DeleteOverlay';
import PlayerAssignSubscription from '../../../components/overlays/PlayerSubscription';
import ErrorOverlay from '../../../components/overlays/ErrorOverlay';
import {getOneUser} from '../../../services/user.services';
import {getUserSubscriptions} from '../../../services/user.services';
import {deleteUser} from '../../../services/user.services';

const UserDetails = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.authReducer.user);

  const userId = props.route.params.userId;
  // console.log('userId 1 found ========> FOUND', userId);

  const toggleDelete = () => {
    setIsVisible(!isVisible);
  };
  const goBackHandler = () => {
    props.navigation.goBack();
  };

  const toggleModal = () => {
    setModalIsVisible(!modalIsVisible);
  };

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getOneUser(userId, user?.token);
        // console.log('user details successfull =====>>>', response.data);
        setUserData(response.data);
      } catch (err) {
        console.log('errorrrrrr in user details', err);
      } finally {
        setLoading(false);
      }
    };
    fnt();
  }, []);

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getUserSubscriptions(
          {userId: userId},
          user?.token,
        );
        // console.log('getUserSubscriptions =====>>>', response.data);
        setSubscriptionData(response.data);
      } catch (error) {
        console.log('errorrrrrrr getUserSubscriptions!!!', error);
      } finally {
        setLoading(false);
      }
    };
    fnt();
  }, []);

  const handleDelete = async () => {
    // console.log(initialStateForm);
    try {
      const response = await deleteUser(userId, user?.token);
      console.log('DELETE USER request workingggggg', response.data);
      props.navigation.navigate('AdminDrawerNavigator');
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <ErrorOverlay
        onBackdropPress={() => setError(null)}
        visible={error ? true : false}
        error={error}
        // message={error?.message ? error.message : 'Error while creating team'}
        message={error?.response?.data?.message || error?.message}
      />
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
          style={{width: Dim.w, height: Dim.w * 0.45, marginBottom: 50}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>USER</Text>
        </ImageBackground>

        {/* <TouchableOpacity onPress={toggleDelete} style={styles.deleteBtn}>
          <MaterialIcons name="delete" size={25} color={Colors.red} />
        </TouchableOpacity> */}

        <DeleteOverlay
          isVisible={isVisible}
          onBackdropPress={() => toggleDelete(false)}
          navigation={props.navigation}
          handleDelete={handleDelete}
        />

        <View style={styles.viewRow}>
          <View>
            <Text style={styles.TxT}>User Name</Text>
            {/* <Text style={styles.subTxt}>Alex Landolf</Text> */}
            <Text style={styles.subTxt}>{userData?.userName}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity style={{padding: 5}} onPress={toggleDelete}>
              <MaterialIcons name="delete" size={25} color={Colors.red} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewRow}>
          <View>
            <Text style={styles.TxT}>Email Address</Text>
            <Text style={styles.subTxt}>{userData?.email}</Text>
          </View>
          <View>
            <Text style={styles.TxT}>Contact #</Text>
            <Text style={styles.subTxt}>{userData?.contactNumber}</Text>
          </View>
        </View>

        {/* <View> */}
        <Text style={styles.subscriptionHead}>User Subscriptions</Text>
        {subscriptionData &&
          subscriptionData.map((v, i) => {
            return (
              <View style={styles.row}>
                <Text style={styles.subTxt}>
                  {v.subscriptionType.subscriptionName} (
                  {v.subscriptionType.type})
                </Text>
                {/* {Number(v.endTime) - Date.now() > 0 ? (
                  <Text>
                    {((Number(v.endTime) - Date.now()) / 86400000).toFixed(1)}{' '}
                    days left
                  </Text>
                ) : (
                  <Text>Expired</Text>
                )} */}

                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('UserSubscriptionDetails', {
                      subscriptionId: v.subscriptionType._id,
                    })
                  }>
                  <Entypo name="eye" size={20} color={Colors.darkBlue} />
                </TouchableOpacity>
              </View>
            );
          })}
        {/* </View> */}

        <View style={styles.addView}>
          <Text style={styles.addTxt}>Add a Subscription</Text>
          <TouchableOpacity onPress={toggleModal}>
            <AntDesign name="pluscircle" size={25} color={Colors.blue} />
          </TouchableOpacity>
        </View>

        <PlayerAssignSubscription
          onBackdropPress={() => toggleModal(false)}
          isVisible={modalIsVisible}
          userId={userId}
        />

        <View style={{...styles.viewRow, width: Dim.w * 0.6}}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('EditUser', {userId: userId})
            }
            style={styles.btn}>
            <Text style={styles.whiteTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('UserTeams', {userId: userId})
            }
            style={{...styles.btn, width: Dim.w * 0.28}}>
            <Text style={styles.whiteTxt}>View Teams</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetails;

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
  deleteBtn: {
    alignSelf: 'flex-end',
    marginRight: Dim.w * 0.08,
    top: -10,
    marginBottom: 20,
  },
  addView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.8,
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginTop: 20,
  },
  subscriptionHead: {
    width: Dim.w * 0.8,
    alignSelf: 'center',
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: 16,
    marginBottom: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.8,
    alignSelf: 'center',
    marginBottom: 2,
  },
  addTxt: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    marginRight: 15,
    color: Colors.darkBlue,
  },
  viewRow: {
    width: Dim.w * 0.8,
    alignSelf: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TxT: {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
  subTxt: {
    color: Colors.blue,
    fontSize: 15,
    fontFamily: Fonts.regular,
  },
  whiteTxt: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: Fonts.regular,
  },
  btn: {
    paddingVertical: 6,
    width: Dim.w * 0.25,
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnSubscription: {
    paddingVertical: 5,
    width: Dim.w * 0.3,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    marginTop: 10,
  },
});
