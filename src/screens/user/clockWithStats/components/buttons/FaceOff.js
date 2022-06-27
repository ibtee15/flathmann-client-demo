import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';

import {useDispatch} from 'react-redux';
import {FACE_OFF_ATTEMPT} from '../../../../../redux/actions/clockStats.actions';
import FaceOffType from '../overlays/FaceOffType';

const FaceoffButton = props => {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const toggleType = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleType} style={styles.faceOffBtn}>
        <Text style={styles.goalTxt}>FACE OFF</Text>
      </TouchableOpacity>
      <FaceOffType
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        teamA={props.teamA}
        playersA={props.playersA}
        teamB={props.teamB}
        playersB={props.playersB}
        FOtime={props.FOtime}
        quarter={props.quarter}
      />
    </>
  );
};

export default FaceoffButton;

const styles = StyleSheet.create({
  faceOffBtn: {
    // width: Dim.w * 0.5,
    // height: 40,
    // alignSelf: 'center',
    // backgroundColor: Colors.btnRed,
    // borderRadius: 20,
    // marginBottom: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: Colors.whiteclock,

    // width: Dim.w * 0.41,
    // height: 35,
    // alignSelf: 'center',
    // backgroundColor: Colors.btnRed,
    // borderRadius: 20,
    // marginBottom: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: Colors.whiteclock,

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
    fontSize: 30,
    fontFamily: Fonts.heading,
    color: Colors.white,
  },
});
