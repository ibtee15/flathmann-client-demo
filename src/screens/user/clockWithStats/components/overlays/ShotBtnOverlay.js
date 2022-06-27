import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Modal,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Overlay} from 'react-native-elements';
import {Fonts} from '../../../../../constants/fonts';
import GoalOverlay from './GoalOverlay';
import SaveOverlay from './SaveOverlay';
import LostPossOverlay from './LostPossOverlay';
import RetainedPossOverlay from './RetainedPossOverlay';

const ShotBtnModal = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  const [lostPossVisible, setLostPossVisible] = useState(false);
  const [retainedPossVisible, setRetainedPossVisible] = useState(false);

  const toggleGoal = () => {
    setIsVisible(!isVisible);
  };
  const toggleSave = () => {
    setSaveVisible(!saveVisible);
  };
  const toggleLostPoss = () => {
    setLostPossVisible(!lostPossVisible);
  };
  const toggleRetainedPoss = () => {
    setRetainedPossVisible(!retainedPossVisible);
  };

  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={props.onBackdropPress}
      visible={props.isVisible}>
      <TouchableOpacity onPress={toggleGoal}>
        <Text style={styles.option}>Goal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleSave}>
        <Text style={styles.option}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleLostPoss}>
        <Text style={styles.option}>Lost Possession</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleRetainedPoss}>
        <Text style={styles.option}>Retained Possession</Text>
      </TouchableOpacity>

      <GoalOverlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        team={props.team}
        pressTime={props.pressTime}
        quarter={props.quarter}
      />
      <SaveOverlay
        isVisible={saveVisible}
        onBackdropPress={() => setSaveVisible(false)}
        team={props.team}
        pressTime={props.pressTime}
        quarter={props.quarter}
      />
      <LostPossOverlay
        isVisible={lostPossVisible}
        onBackdropPress={() => setLostPossVisible(false)}
        team={props.team}
        handleLostPossession={props.handleLostPossession}
        pressTime={props.pressTime}
        quarter={props.quarter}
      />
      <RetainedPossOverlay
        isVisible={retainedPossVisible}
        onBackdropPress={() => setRetainedPossVisible(false)}
        team={props.team}
        handleLostPossession={props.handleLostPossession}
        pressTime={props.pressTime}
        quarter={props.quarter}
      />
    </Overlay>
  );
};
export default ShotBtnModal;

const styles = StyleSheet.create({
  modalView: {
    paddingTop: 20,
    paddingBottom: 15,
    alignItems: 'center',
    width: Dim.w * 0.5,
    borderRadius: 20,
  },
  option: {
    color: Colors.darkBlue,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5,
    fontFamily: Fonts.heading,
    // borderBottomWidth: 1,
  },
});
