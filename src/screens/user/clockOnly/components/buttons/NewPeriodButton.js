import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';
import {useSelector} from 'react-redux';

const NewPeriodButton = ({
  gameTime,
  durationTime,
  stopMainClock,
  incrementPeriod,
  setCountdownTimer,
  clockIsRunning,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const rules = useSelector(state => state.clockStatsReducer.rules);

  const handleOnPress = () => {
    stopMainClock();
    incrementPeriod();
    incrementPeriod();
    setCountdownTimer('Period countdown time');
  };

  useEffect(() => {
    // When only four game periods match
    if (rules.gamePeriods === 4) {
      if (Math.floor(durationTime / 4) === gameTime) {
        setIsDisabled(false);
      } else if (Math.floor(durationTime / 2) === gameTime) {
        setIsDisabled(false);
      } else if (Math.floor((durationTime * 3) / 4) === gameTime) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
    // When only two game periods match
    if (rules.gamePeriods === 2) {
      if (Math.floor(durationTime / 2) === gameTime) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [gameTime]);

  return (
    <TouchableOpacity
      disabled={clockIsRunning || gameTime === durationTime || isDisabled}
      onPress={handleOnPress}
      style={styles.timeoutBtn}>
      <Text style={styles.goalTxt}>NEW PERIOD</Text>
    </TouchableOpacity>
  );
};

export default NewPeriodButton;

const styles = StyleSheet.create({
  timeoutBtn: {
    width: Dim.w * 0.32,
    height: 45,
    backgroundColor: Colors.btnGreen,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  goalTxt: {
    fontSize: 25,
    fontFamily: Fonts.heading,
    color: Colors.white,
  },
});
