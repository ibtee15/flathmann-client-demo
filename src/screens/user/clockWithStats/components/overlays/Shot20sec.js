import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Overlay} from 'react-native-elements';
import {Fonts} from '../../../../../constants/fonts';

const Shot20secModal = props => {
  const handleSelect = () => {
    // props.setSelectedPlayer(playerName);
    props.onBackdropPress();
  };
  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={props.onBackdropPress}
      visible={props.isVisible}>
      <Text style={styles.heading}>Possession sustained?</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={props.onBackdropPress}>
          <Text style={styles.option}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.handlePressNo}>
          <Text style={{...styles.option, color: Colors.red}}>No</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};
export default Shot20secModal;

const styles = StyleSheet.create({
  modalView: {
    paddingTop: 20,
    paddingBottom: 15,
    alignItems: 'center',
    width: Dim.w * 0.5,
    borderRadius: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: Fonts.medium,
    color: Colors.darkBlue,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.3,
  },
  option: {
    color: Colors.btnGreen,
    fontSize: 15,
    fontFamily: Fonts.bold,
  },
});
