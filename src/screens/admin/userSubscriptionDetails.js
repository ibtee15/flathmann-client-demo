import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {Colors, Dim} from '../../constants/Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DeleteOverlay from '../../components/overlays/DeleteOverlay';
import {getUserSubscriptionDetails} from '../../services/user.services';

const UserSubscriptionDetails = props => {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {isClockOnly} = props.route.params;
  const {isValid} = props.route.params;

  const subscriptionId = props.route.params.subscriptionId;
  // console.log('getting the ID####!!!!!', subscriptionId);

  // console.log(isClockOnly, 'yessssssssssssssss');
  // console.log(isValid, 'yessssssssss it is valid');

  const toggleDelete = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getUserSubscriptionDetails(subscriptionId);
        // console.log(
        //   'CHECKKK getUserSubscriptionDetails successfull =====>>>',
        //   response.data,
        // );
        setSubscriptionData(response.data);
      } catch (err) {
        console.log('errorrrrrr in getUserSubscriptionDetails', err);
      } finally {
        setLoading(false);
      }
    };
    fnt();
  }, []);

  const goBackHandler = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <Image
        style={{position: 'absolute', bottom: 0}}
        source={require('../../assets/images/racket.png')}
      />
      <ImageBackground
        source={require('../../assets/images/header.png')}
        style={{width: Dim.w, height: Dim.w * 0.45, marginBottom: 20}}>
        <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
          <Entypo name="chevron-left" size={25} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>SUBSCRIPTION DETAILS</Text>
      </ImageBackground>

      <TouchableOpacity onPress={toggleDelete} style={styles.deleteBtn}>
        <MaterialIcons name="delete" size={25} color={Colors.red} />
      </TouchableOpacity>

      <DeleteOverlay
        isVisible={isVisible}
        onBackdropPress={() => toggleDelete(false)}
        navigation={props.navigation}
      />

      <View style={styles.container2}>
        <View style={styles.horizontalView}>
          <View>
            <Text style={styles.subHead}>Clock type :</Text>
            <Text style={styles.blueTxt}>
              {isClockOnly ? 'Clock Only' : 'Clock with Stats'}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.subHead}>Cost :</Text>
            <Text style={styles.blueTxt}>$9 </Text>
          </View>
        </View>
        <View style={styles.horizontalView}>
          <View>
            <Text style={styles.subHead}>Duration :</Text>
            <Text style={styles.blueTxt}>6 months</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.subHead}>
              {isValid ? 'Validity :' : 'Expiry :'}
            </Text>
            <Text
              style={{
                ...styles.blueTxt,
                color: isValid ? Colors.blue : Colors.red,
              }}>
              {isValid ? '45 days left' : ' 12/12/12'}
            </Text>
          </View>
        </View>
        <View style={styles.horizontalView}>
          <View style={{alignSelf: 'flex-start'}}>
            <Text style={styles.subHead}>Subscription Date :</Text>
            <Text style={styles.blueTxt}>12/12/12 </Text>
          </View>

          {/* {isValid ? (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(
                  isClockOnly ? 'CreateClockOnly' : 'CreateClockStats',
                )
              }
              style={styles.createBtn}>
              <Text style={styles.btnTxt}>Create Game</Text>
            </TouchableOpacity>
          ) : ( */}
          <TouchableOpacity onPress={goBackHandler} style={styles.createBtn}>
            <Text style={styles.btnTxt}>Go Back</Text>
          </TouchableOpacity>
          {/* )} */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserSubscriptionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: Dim.w * 0.05,
    paddingBottom: Dim.w * 0.02,
  },
  headerTxt: {
    fontSize: 23,
    fontWeight: 'bold',
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
    width: Dim.w * 0.6,
  },
  deleteBtn: {
    alignSelf: 'flex-end',
    marginRight: Dim.w * 0.08,
    top: -10,
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.8,
    marginBottom: 30,
  },
  container2: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHead: {
    fontSize: 18,
    color: Colors.darkgrey,
  },
  blueTxt: {
    color: Colors.blue,
    marginLeft: 3,
    fontWeight: 'bold',
    marginTop: 2,
    fontSize: 15,
  },
  createBtn: {
    width: 90,
    height: 90,
    backgroundColor: Colors.darkBlue,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  btnTxt: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 15,
  },
});
