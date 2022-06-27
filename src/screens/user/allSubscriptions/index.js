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
import {getAllSubscriptionsType} from '../../../services/subscriptions.services';
import {useSelector} from 'react-redux';

const AllSubscriptions = props => {
  const user = useSelector(state => state.authReducer.user);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getAllSubscriptionsType(user?.token);
        console.log('all subscriptions successfull =====>>>', response.data);
        setSubscriptionData(response.data);
      } catch (error) {
        console.log('errorrrrrrr in all subscriptions!!!', error);
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
          style={{width: Dim.w, height: Dim.w * 0.45}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>ALL SUBSCRIPTIONS</Text>
        </ImageBackground>

        {/* Clock Only */}
        <Text style={styles.MainTxt}>Clock Only</Text>

        <View style={styles.line}>
          <Text style={styles.txt}>Free Trial</Text>
          <Text style={styles.txt}>1x use</Text>
          <Text style={{...styles.txt, marginRight: 0}}>Free</Text>
        </View>

        {subscriptionData &&
          subscriptionData.map((v, i) => {
            if (v.type == 'clock only') {
              return (
                <View style={styles.line}>
                  <Text style={styles.txt}>{v.subscriptionName}</Text>
                  <Text style={styles.txt}>{v.durationDays} days</Text>
                  <Text style={{...styles.txt, marginRight: 0}}>${v.cost}</Text>
                </View>
              );
            }
          })}
        {/* 
      

        {/* Clock with Stats */}
        <Text style={styles.MainTxt}>Clock with Stats</Text>

        <View style={styles.line}>
          <Text style={styles.txt}>Free Trial</Text>
          <Text style={styles.txt}>1x use</Text>
          <Text style={{...styles.txt, marginRight: 0}}>Free</Text>
        </View>

        {subscriptionData &&
          subscriptionData.map((v, i) => {
            if (v.type == 'clock with stats') {
              return (
                <View style={styles.line}>
                  <Text style={styles.txt}>{v.subscriptionName}</Text>
                  <Text style={styles.txt}>{v.durationDays} days</Text>
                  <Text style={{...styles.txt, marginRight: 0}}>${v.cost}</Text>
                </View>
              );
            }
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllSubscriptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: Dim.w * 0.05,
    paddingBottom: Dim.w * 0.03,
  },
  headerTxt: {
    fontSize: 33,
    fontFamily: Fonts.heading,
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
  },
  MainTxt: {
    fontSize: 22,
    color: Colors.darkBlue,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    paddingBottom: 5,
    paddingHorizontal: 15,
    fontFamily: Fonts.bold,
  },
  line: {
    width: Dim.w * 0.95,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  txt: {
    color: Colors.blue,
    marginRight: 20,
    fontFamily: Fonts.medium,
  },
  btn: {
    height: 42,
    width: Dim.w * 0.6,
    alignSelf: 'center',
    marginVertical: 30,
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: Colors.white,
    fontFamily: Fonts.bold,
  },
});
