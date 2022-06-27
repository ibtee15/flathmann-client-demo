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

const FaceOffType = props => {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleGenerate = () => {
    dispatch({
      type: FACE_OFF_ATTEMPT,
      payload: {
        statement: 'Faceoff Attempt',
      },
    });
    props.onBackdropPress();
  };
  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={props.onBackdropPress}
      visible={props.isVisible}>
      <TouchableOpacity onPress={handleGenerate}>
        <Text style={styles.option}>FaceOff Attempt</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.option}>FaceOff Violation</Text>
      </TouchableOpacity>

      <ViolationTypeOverlay
        isVisible={isVisible}
        onBackdropPress={() => toggleModal(false)}
        teamA={props.teamA}
        playersA={props.playersA}
        teamB={props.teamB}
        playersB={props.playersB}
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
