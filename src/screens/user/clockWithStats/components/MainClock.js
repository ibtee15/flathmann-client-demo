import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Dim} from '../../../../constants/Theme';
import {Fonts} from '../../../../constants/fonts';
import BackgroundTimer from 'react-native-background-timer';
import {color} from 'react-native-reanimated';
// import {useSelector, useDispatch} from 'react-redux';

const MainClock = forwardRef((props, ref) => {
  // const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    let duration = props.rules.gamePeriods * props.rules.periodDuration;
    props.setCurrentGameTime(duration * 60); // game time in secs
  }, []);

  useImperativeHandle(ref, () => ({
    refStartClock() {
      StartMainClock();
    },
    refStopClock() {
      StopMainClock();
    },
  }));

  const StartMainClock = () => {
    props.setClockIsRunning(true);
    BackgroundTimer.runBackgroundTimer(() => {
      props.setCurrentGameTime(secs => {
        if (secs > 0) {
          return secs - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  };

  const StopMainClock = () => {
    props.setClockIsRunning(false);
    BackgroundTimer.stopBackgroundTimer();
    // props.handleStartBtn();
  };

  useEffect(() => {
    if (props.timeOn) {
      StartMainClock();
    } else {
      StopMainClock();
    }
    return () => {
      StopMainClock();
    };
  }, [props.timeOn]);

  const clockify = () => {
    let mins = Math.floor(props.currentGameTime / 60);
    let secs = props.currentGameTime % 60;

    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = secs < 10 ? `0${secs}` : secs;

    return {displayMins, displaySecs};
  };

  return (
    <Text
      style={{
        ...styles.XX,
        color: props.currentGameTime < 121 ? Colors.red : Colors.white,
      }}>
      {props.mainClockIsHide ? null : clockify().displayMins}
      {props.mainClockIsHide ? null : ':'}
      {props.mainClockIsHide ? null : clockify().displaySecs}
    </Text>
  );
});
export default MainClock;

const styles = StyleSheet.create({
  XX: {
    fontSize: Dim.w * 0.1,
    color: Colors.white,
    fontFamily: Fonts.medium,
    lineHeight: Dim.w * 0.1,
  },
});
