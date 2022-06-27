import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';

import {useSelector, useDispatch} from 'react-redux';

const GoalButton = props => {
  const dispatch = useDispatch();
  const teamA = useSelector(state => state.clockStatsReducer.teamA);
  const teamB = useSelector(state => state.clockStatsReducer.teamB);

  const handleShot = team => {
    if (team === 'teamA') {
      console.log('coming heree');
      dispatch({
        type: 'TEAM_A_SHOT',
        payload: teamA?.goals ? teamA.goals + 1 : 1,
      });
    }
    if (team === 'teamB') {
      dispatch({
        type: 'TEAM_B_SHOT',
        payload: teamB?.goals ? teamB.goals + 1 : 1,
      });
    }
  };

  return (
    <TouchableOpacity
      disabled={!props.clockIsRunning}
      onPress={() => handleShot(props.team)}
      style={styles.goalBtn}>
      <Text style={styles.goalTxt}>GOAL</Text>
    </TouchableOpacity>
  );
};

export default GoalButton;

const styles = StyleSheet.create({
  goalBtn: {
    width: Dim.w * 0.22,
    height: 45,
    backgroundColor: Colors.goalWhite,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTxt: {
    fontSize: 25,
    fontFamily: Fonts.heading,
    color: Colors.white,
  },
});
