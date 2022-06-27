import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';
import {Overlay} from 'react-native-elements';
// import BackgroundTimer from 'react-native-background-timer';
// import CountDown from 'react-native-countdown-component';

const CountdownTimer = props => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (time > 0) {
      setTime(secs => {
        return secs - 1;
      });
    }
  }, [props.gameTime]);

  useEffect(() => {
    if (props.countdownTimer.duration > 0) {
      setTime(props.countdownTimer.duration * 60 + 1);
      props.setMainClockIsHide(true);
      props.setGameTime(props.gameTime + props.countdownTimer.duration * 60);
    }
  }, [props.countdownTimer.duration]);

  // useEffect(() => {
  //   if (props.countdownTimer.isVisible) {
  //     props.setCurrentPeriod(prev => prev - 1);
  //   }
  // }, [props.countdownTimer.isVisible]);

  useEffect(() => {
    if (time <= 0) {
      // BackgroundTimer.stopBackgroundTimer();
      props.closeCountdown();
      props.setMainClockIsHide(false);
    }
    if (time > 0 && !props.clockIsRunning) {
      props.startMainClock();
    }
  }, [time]);

  return (
    <Overlay
      overlayStyle={styles.modalView}
      visible={props.countdownTimer.isVisible}>
      <View style={styles.view}>
        <Text style={styles.txtHeading}>{props.countdownTimer.heading}</Text>
        <View style={styles.viewTime}>
          <Text style={styles.textTime}>{Math.floor(time / 60)} : </Text>
          <Text style={styles.textTime}>{time % 60}</Text>
        </View>
      </View>
    </Overlay>
  );
};
export default CountdownTimer;

const styles = StyleSheet.create({
  modalView: {
    height: Dim.h * 0.95,
    width: Dim.w * 0.9,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    alignItems: 'center',
    width: Dim.w * 0.7,
    borderRadius: 20,
    backgroundColor: Colors.darkBlue,
    paddingVertical: 15,
  },
  textTime: {
    fontSize: 50,
    color: Colors.white,
    fontFamily: Fonts.heading,
  },
  viewTime: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
  },
  txtHeading: {
    color: Colors.btnGreen,
    fontSize: 35,
    fontFamily: Fonts.heading,
    textAlign: 'center',
    lineHeight: 35,
  },
});
