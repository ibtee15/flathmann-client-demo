import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';

const FOwonButton = props => {
  return (
    <TouchableOpacity onPress={props.toggle} style={styles.faceOffBtn}>
      <Text style={styles.goalTxt}>WON</Text>
    </TouchableOpacity>
  );
};

export default FOwonButton;

const styles = StyleSheet.create({
  faceOffBtn: {
    width: Dim.w * 0.16,
    height: 40,
    alignSelf: 'center',
    backgroundColor: Colors.goldenBrown,
    borderRadius: 100,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.whiteclock,
  },
  goalTxt: {
    fontSize: Dim.w * 0.06,
    fontFamily: Fonts.heading,
    color: Colors.white,
  },
});
