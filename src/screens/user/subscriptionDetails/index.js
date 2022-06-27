import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import {Fonts} from '../../../constants/fonts';
import {useSelector} from 'react-redux';
import {getUserSubscriptionDetails} from '../../../services/user.services';

const SubscriptionDetails = props => {
  const user = useSelector(state => state.authReducer.user);
  const subId = props.route.params.subscriptionId;
  // console.log('SUBSCRIPTION ID FOUND!!!!!!++++!!!!!', subId);

  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const {isClockOnly} = props.route.params;
  const {isValid} = props.route.params;

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getUserSubscriptionDetails(subId, user?.token);
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
        source={require('../../../assets/images/racket.png')}
      />
      <ImageBackground
        source={require('../../../assets/images/header.png')}
        style={{width: Dim.w, height: Dim.w * 0.45, marginBottom: 20}}>
        <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
          <Entypo name="chevron-left" size={25} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>SUBSCRIPTION DETAILS</Text>
      </ImageBackground>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[Colors.blue, Colors.white]}
            refreshing={loading}
            // onRefresh={() => RefreshPage()}
          />
        }
        showsVerticalScrollIndicator={false}>
        <View style={styles.container2}>
          <View style={styles.horizontalView}>
            <View>
              <Text style={styles.subHead}>Clock type :</Text>
              <Text style={styles.blueTxt}>
                {/* {subscriptionData?.subscriptionType.subscriptionName}{' '} */}
                {subscriptionData?.subscriptionType.type}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.subHead}>Cost :</Text>
              <Text style={styles.blueTxt}>
                {subscriptionData?.subscriptionType.cost}{' '}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalView}>
            <View>
              <Text style={styles.subHead}>Duration :</Text>
              <Text style={styles.blueTxt}>
                {subscriptionData?.subscriptionType.durationDays} days
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.subHead}>Validity</Text>
              {Number(subscriptionData?.endTime) - Date.now() > 0 ? (
                <Text style={styles.blueTxt}>
                  {(
                    (Number(subscriptionData?.endTime) - Date.now()) /
                    86400000
                  ).toFixed(1)}{' '}
                  days left
                </Text>
              ) : (
                <Text style={{...styles.blueTxt, color: Colors.red}}>
                  Expired
                </Text>
              )}
            </View>
          </View>
          <View style={styles.horizontalView}>
            <View style={{alignSelf: 'flex-start'}}>
              <Text style={styles.subHead}>Subscription Date :</Text>
              <Text style={styles.blueTxt}>
                {/* {(
                (Number(subscriptionData?.startTime) - Date.now()) /
                86400000
              ).toFixed(1)}{' '} */}
                {new Date(subscriptionData?.startTime).getDay()}/
                {new Date(subscriptionData?.startTime).getMonth()}/
                {new Date(subscriptionData?.startTime).getFullYear()} (d/m/y)
              </Text>
            </View>

            {Number(subscriptionData?.endTime) - Date.now() > 0 ? (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(
                    subscriptionData.subscriptionType.type === 'clock only'
                      ? 'CreateClockOnly'
                      : 'CreateClockStats',
                  )
                }
                style={styles.createBtn}>
                <Text style={styles.btnTxt}>Create Game</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('MySubscriptions')}
                style={styles.createBtn}>
                <Text style={styles.btnTxt}>Go Back</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionDetails;

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
    fontSize: 33,
    fontFamily: Fonts.heading,
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
    width: Dim.w * 0.6,
    lineHeight: 33,
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
    marginTop: Dim.h * 0.05,
  },
  subHead: {
    fontSize: 18,
    color: Colors.darkgrey,
    fontFamily: Fonts.medium,
    lineHeight: 18,
  },
  blueTxt: {
    color: Colors.blue,
    marginLeft: 3,
    fontFamily: Fonts.semiBold,
    marginTop: 2,
    fontSize: 16,
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
    fontFamily: Fonts.medium,
  },
});
