import React from 'react';
import {View, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import Swiper from 'react-native-swiper';
import Hello from '../../../components/containers/WelcomeHello';
import Introduction from '../../../components/containers/WelcomeIntro';
import Enjoy from '../../../components/containers/WelcomeEnjoy';

const Welcome = props => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <Swiper
        // autoplay={true}
        bounces={true}
        dotColor={Colors.blue}
        activeDotColor={Colors.darkBlue}>
        <Hello />
        <Introduction />
        <Enjoy navigation={props.navigation} />
      </Swiper>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  heading: {
    alignSelf: 'center',
    marginTop: Dim.h * 0.1,
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.darkBlue,
  },
});
