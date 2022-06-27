import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {getUserSubscriptions} from '../../../services/user.services';
import {useSelector} from 'react-redux';

const MySubscriptions = props => {
  const userId = props.route?.params?.userId;
  const user = useSelector(state => state.authReducer.user);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getUserSubscriptions(
          {
            userId: userId ? userId : user._id,
          },
          user?.token,
        );
        console.log('getUserSubscriptions =====>>>', response.data);
        setSubscriptionData(response.data);
      } catch (error) {
        console.log('errorrrrrrr getUserSubscriptions!!!', error);
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
          <Text style={styles.headerTxt}>MY SUBSCRIPTIONS</Text>
        </ImageBackground>

        {subscriptionData &&
          subscriptionData.map((v, i) => {
            return (
              <View style={styles.subsView}>
                <Text style={styles.blueTxt}>{v.subscriptionType.type}</Text>

                <View style={styles.line} />
                {Number(v.endTime) - Date.now() > 0 ? (
                  <Text style={styles.status}>Active</Text>
                ) : (
                  <Text style={{...styles.status, color: Colors.red}}>
                    Expired
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('SubscriptionDetails', {
                      subscriptionId: v._id,
                    })
                  }
                  style={styles.viewBtn}>
                  <Text style={styles.viewTxt}>View Details</Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MySubscriptions;

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
  },
  subsView: {
    marginBottom: 15,
    width: Dim.w * 0.9,
    borderRadius: 15,
    paddingVertical: 5,
    backgroundColor: Colors.lightgrey,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  blueTxt: {
    fontSize: 15,
    color: Colors.darkBlue,
    width: Dim.w * 0.25,
    textAlign: 'center',
    fontFamily: Fonts.regular,
  },
  line: {
    width: 1,
    height: 25,
    backgroundColor: Colors.darkgrey,
  },
  status: {
    fontSize: 13,
    color: Colors.darkBlue,
    fontFamily: Fonts.bold,
    width: Dim.w * 0.17,
    textAlign: 'center',
    // backgroundColor: 'pink',
  },
  viewBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: Colors.darkBlue,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  viewTxt: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: Fonts.semiBold,
  },
});
