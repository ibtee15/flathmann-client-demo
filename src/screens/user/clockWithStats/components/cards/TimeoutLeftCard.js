import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Dim, Colors} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';
import {useSelector, useDispatch} from 'react-redux';

const TimeoutLeftCard = props => {
  const dispatch = useDispatch();

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.txt1}>Timeouts Left</Text>
      <Text style={styles.txt2}>
        {props.teamA.timeoutsLeft} - <Text style={styles.txt3}>TOL</Text> -{' '}
        {props.teamB.timeoutsLeft}
      </Text>
    </View>
  );
};

export default TimeoutLeftCard;

const styles = StyleSheet.create({
  txt1: {
    fontSize: 15,
    fontFamily: Fonts.heading,
    color: Colors.white,
    lineHeight: 15,
  },
  txt2: {
    fontSize: 25,
    fontFamily: Fonts.heading,
    color: Colors.white,
    lineHeight: 25,
    // marginTop: -2,
  },
  txt3: {
    fontSize: 20,
    fontFamily: Fonts.heading,
    color: Colors.goldenBrown,
  },
});
