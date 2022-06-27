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
  TextInput,
  Image,
  Linking,
  Alert,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Clipboard from '@react-native-community/clipboard';
import {Link} from 'native-base';

const ContactUs = props => {
  const goBackHandler = () => {
    props.navigation.goBack();
  };

  const copyLink = () => {
    Clipboard.setString('www.laxstatclock.com');
  };

  const number = '021021021';
  const message = 'testing email check ';
  const link = 'www.laxstatclock.com';

  const openUrl = async url => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`not opening linkkkkkkk: ${url}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <Image
        style={{position: 'absolute', bottom: 0}}
        source={require('../../../assets/images/racket.png')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/header.png')}
          style={{width: Dim.w, height: Dim.w * 0.45}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.whiteO} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>CONTACT US</Text>
        </ImageBackground>

        <Image
          source={require('../../../assets/icons/dashboard.png')}
          style={styles.logo}
        />

        <Text style={styles.infoTxt}>The finest Lacrosse Time Clock</Text>
        <Text style={styles.infoTxt}>Management & Real-time Statistics</Text>
        <Text style={styles.infoTxt}>Product in the market.</Text>

        <Text style={{...styles.subHead, marginTop: Dim.w * 0.15}}>
          Contact us
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${number}`);
          }}
          style={{alignSelf: 'center'}}>
          <Text style={styles.txt}>123456789</Text>
        </TouchableOpacity>

        <Text style={styles.subHead}>Email us</Text>
        <TouchableOpacity
          // onPress={() => copyEmail()}
          onPress={() => {
            Linking.openURL(
              `mailto:zoha.hasan@gmail.com?subject=testmail&body=${message}`,
            );
          }}
          style={{alignSelf: 'center'}}>
          <Text style={styles.txt}>laxstat@gmail.com</Text>
        </TouchableOpacity>

        <Text style={styles.subHead}>Browse our website</Text>
        <TouchableOpacity
          onPress={() => {
            // openUrl(link);
            Linking.openURL('https://www.youtube.com/');
          }}
          style={{alignSelf: 'center', marginBottom: 20}}>
          <Text style={styles.txt}>www.laxstatclock.com</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.white,
    backgroundColor: Colors.darkBlue,
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
  logo: {
    width: Dim.w * 0.35,
    height: Dim.w * 0.18,
    alignSelf: 'center',
    marginVertical: Dim.w * 0.12,
    tintColor: Colors.white,
  },
  infoTxt: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    fontSize: 17,
    alignSelf: 'center',
  },
  subHead: {
    marginTop: 10,
    fontFamily: Fonts.heading,
    color: Colors.whiteO,
    fontSize: 15,
    alignSelf: 'center',
  },
  txt: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: Fonts.semiBold,
  },
});
