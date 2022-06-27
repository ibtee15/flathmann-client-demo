import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';
import {useDispatch, useSelector} from 'react-redux';
import TimeoutOverlay from '../../../../../components/ClockComponents/TimeoutOverlay';

const TimeoutButton = ({
  teamA,
  teamB,
  gameTime,
  durationTime,
  stopMainClock,
  // startMainClock,
  incrementPeriod,
  setCountdownTimer,
  pressTime,
  quarter,
}) => {
  const [timeoutVisible, setTimeoutVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const rules = useSelector(state => state.clockStatsReducer.rules);

  const toggleTimeout = () => {
    setTimeoutVisible(!timeoutVisible);
    // if (timeoutVisible) {
    //   stopMainClock();
    // }
  };

  const handleOnPress = () => {
    stopMainClock();
    // incrementPeriod();
    setCountdownTimer('TIME OUT');
    // startMainClock();
  };

  useEffect(() => {
    // When only four game periods match
    if (rules.gamePeriods === 4) {
      if (Math.floor(durationTime / 4) === gameTime) {
        setIsDisabled(true);
      } else if (Math.floor(durationTime / 2) === gameTime) {
        setIsDisabled(true);
      } else if (Math.floor((durationTime * 3) / 4) === gameTime) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
    // When only two game periods match
    if (rules.gamePeriods === 2) {
      if (Math.floor(durationTime / 2) === gameTime) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }, [gameTime]);

  return (
    <>
      <TouchableOpacity
        disabled={gameTime === durationTime || isDisabled}
        onPress={toggleTimeout}
        style={styles.timeoutBtn}>
        <Text style={styles.goalTxt}>TIME OUT</Text>
      </TouchableOpacity>
      <TimeoutOverlay
        isVisible={timeoutVisible}
        onBackdropPress={() => setTimeoutVisible(false)}
        handleOnPress={handleOnPress}
        teamA={teamA}
        teamB={teamB}
        pressTime={pressTime}
        quarter={quarter}
      />
    </>
  );
};

export default TimeoutButton;

const styles = StyleSheet.create({
  timeoutBtn: {
    width: Dim.w * 0.32,
    height: 40,
    backgroundColor: Colors.darkBlue,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.goalWhite,
  },
  goalTxt: {
    fontSize: 25,
    fontFamily: Fonts.heading,
    color: Colors.white,
    lineHeight: 30,
  },
});
