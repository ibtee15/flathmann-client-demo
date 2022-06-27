import React, {useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
import {Colors, Dim} from '../../constants/Theme';
import {CommonActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const SplashScreen = props => {
  const user = useSelector(state => state.authReducer.user);

  // useEffect(() => {
  //   (async () => {
  //     getDeviceToken();
  //   })();
  // }, []);

  const delayedNavigation = name => {
    setTimeout(() => {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name}],
        }),
      );
    }, 3000);
  };

  useEffect(() => {
    if (user && user.isAdmin) {
      delayedNavigation('AdminNavigator');
      return;
    }
    if (user) {
      delayedNavigation('UserNavigator');
      return;
    } else {
      delayedNavigation('AuthNavigator');
    }
  }, [props.navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <ImageBackground
        style={styles.bgImg}
        source={require('../../assets/images/bgImg.png')}>
        <ImageBackground
          style={styles.headerImg}
          source={require('../../assets/images/headerLeft.png')}></ImageBackground>
        {/* <Image
          style={styles.logo}
          source={require('../../assets/icons/dashboard.png')}
        /> */}
        <Image
          style={styles.logo}
          source={require('../../assets/icons/drawer.png')}
        />
        {/* <Image
          style={{
            width: Dim.w * 0.6,
            height: Dim.h * 0.35,
            alignSelf: 'center',
            borderRadius: 30,
          }}
          source={require('../../assets/images/laxInfoImg.jpg')}
        /> */}
        <Image
          style={styles.bottomImg}
          source={require('../../assets/images/bottomHeader.png')}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    width: Dim.w,
    height: Dim.h,
    flex: 1,
    justifyContent: 'space-between',
  },
  headerImg: {
    width: Dim.w,
    height: Dim.w * 0.45,
  },
  logo: {
    width: Dim.w * 0.5,
    height: Dim.w * 0.437,
    alignSelf: 'center',
  },
  bottomImg: {
    width: Dim.w,
    height: Dim.w * 0.45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
  },
});
