import React, {useState, useEffect} from 'react';
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
import {FACE_OFF_ATTEMPT} from '../../../../../redux/actions/clockStats.actions';
import {useDispatch} from 'react-redux';
import ViolationTypeOverlay from './ViolationTypeOverlay';
import WonTypeOverlay from './WonTypeOverlay';
import FOattemptOverlay from './FOattemptType';

const FaceOffType = props => {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [wonTypeVisible, setWonTypeVisible] = useState(false);
  const [FOattempt, setFOattempt] = useState(false);

  const toggleWonType = () => {
    setWonTypeVisible(!wonTypeVisible);
  };
  const toggleViolation = () => {
    setIsVisible(!isVisible);
  };
  const toggleFOattempt = () => {
    setFOattempt(!FOattempt);
  };

  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={props.onBackdropPress}
      visible={props.isVisible}>
      <TouchableOpacity onPress={toggleFOattempt}>
        <Text style={styles.option}>FaceOff Attempt</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleViolation}>
        <Text style={styles.option}>FaceOff Violation</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleWonType}>
        <Text style={styles.option}>FaceOff Won</Text>
      </TouchableOpacity>

      <FOattemptOverlay
        isVisible={FOattempt}
        onBackdropPress={() => toggleFOattempt(false)}
        teamA={props.teamA}
        playersA={props.playersA}
        teamB={props.teamB}
        playersB={props.playersB}
        FOtime={props.FOtime}
        quarter={props.quarter}
      />

      <ViolationTypeOverlay
        isVisible={isVisible}
        onBackdropPress={() => toggleViolation(false)}
        teamA={props.teamA}
        playersA={props.playersA}
        teamB={props.teamB}
        playersB={props.playersB}
        FOtime={props.FOtime}
        quarter={props.quarter}
      />

      <WonTypeOverlay
        isVisible={wonTypeVisible}
        onBackdropPress={() => toggleWonType(false)}
        navigation={props.navigation}
        teamA={props.teamA}
        playersA={props.playersA}
        teamB={props.teamB}
        playersB={props.playersB}
        FOtime={props.FOtime}
        quarter={props.quarter}
      />
    </Overlay>
  );
};
export default FaceOffType;

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
    fontSize: 16,
    marginBottom: 5,
    // borderBottomWidth: 1,
  },
});
