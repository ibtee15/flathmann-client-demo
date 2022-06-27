import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';

import {useDispatch} from 'react-redux';
import {CLEAR_FAILED} from '../../../../../redux/actions/clockStats.actions';
import PlayersList from '../overlays/PlayersList';

const ClearFailedButton = props => {
  const dispatch = useDispatch();

  const handleGenerate = () => {
    dispatch({
      type: CLEAR_FAILED,
      payload: {
        type: 'clear',
        team: props.team,
        clockTime:
          `${props.clearTime().displayMins}:${props.clearTime().displaySecs}` +
          `- ${
            props.quarter === 1
              ? '1st'
              : props.quarter === 2
              ? '2nd'
              : props.quarter === 3
              ? '3rd'
              : props.quarter === 4
              ? '4th'
              : '0'
          } QTR`,
        statement: 'Clear Failed',
      },
    });
    props.onBackdropPress();
  };

  return (
    <TouchableOpacity onPress={handleGenerate} style={styles.faceOffBtns}>
      <Text style={styles.smallTxt2}>CLEAR FAILED</Text>
    </TouchableOpacity>
  );
};

export default ClearFailedButton;

const styles = StyleSheet.create({
  rowTxT: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dim.w * 0.85,
    justifyContent: 'space-between',
  },
  faceOffBtns: {
    width: Dim.w * 0.41,
    height: 40,
    marginBottom: 10,
    backgroundColor: Colors.btnGreen,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallTxt2: {
    fontSize: 13,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
