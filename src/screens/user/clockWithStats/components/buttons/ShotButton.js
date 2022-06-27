import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';

import ShotBtnModal from '../overlays/ShotBtnOverlay';

const ShotButton = props => {
  const [selectedType, setSelectedType] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const resetShotClock = () => {
    props.setShotClockTime(80);
  };

  const handleLostPossession = () => {
    resetShotClock();
    props.setPossessingTeam(prev => {
      if (prev === 'teamA') {
        return 'teamB';
      } else if (prev === 'teamB') {
        return 'teamA';
      } else {
        return;
      }
    });
  };

  return (
    <>
      <TouchableOpacity
        disabled={!props.clockIsRunning}
        onPress={toggleModal}
        style={styles.goalBtn}>
        <Text style={styles.goalTxt}>SHOT</Text>
      </TouchableOpacity>
      <ShotBtnModal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
        team={props.team}
        handleLostPossession={handleLostPossession}
        pressTime={props.pressTime}
        quarter={props.quarter}
      />
    </>
  );
};

export default ShotButton;

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
