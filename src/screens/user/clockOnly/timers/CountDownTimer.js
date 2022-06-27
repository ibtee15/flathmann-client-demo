import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Dim} from '../../../../constants/Theme';
import {Overlay} from 'react-native-elements';
import BackgroundTimer from 'react-native-background-timer';

const CountdownTimer = props => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (props.countdownTimer.duration > 0) {
      setTime(props.countdownTimer.duration * 60);
    }
  }, [props.countdownTimer.duration]);

  const startCounter = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setTime(secs => {
        if (secs > 0) {
          return secs - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    if (time <= 0) {
      BackgroundTimer.stopBackgroundTimer();
      props.closeCountdown();
    }
  }, [time]);

  useEffect(() => {
    if (props.countdownTimer.isVisible) {
      startCounter();
    }
  }, [props.countdownTimer.isVisible]);

  return (
    <Overlay
      overlayStyle={styles.modalView}
      // onBackdropPress={props.onBackdropPress}
      visible={props.countdownTimer.isVisible}
      // visible={true}
    >
      <Text style={styles.txtHeading}>{props.countdownTimer.heading}</Text>
      <View style={styles.viewTime}>
        <Text style={styles.textTime}>{Math.floor(time / 60)} : </Text>
        <Text style={styles.textTime}>{time % 60}</Text>
      </View>
    </Overlay>
  );
};
export default CountdownTimer;

const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    width: Dim.w * 0.7,
    borderRadius: 20,
    backgroundColor: '#000',
    paddingVertical: 10,
  },
  textTime: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  viewTime: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
  },
  txtHeading: {
    color: 'red',
    fontSize: 16,
  },
});
