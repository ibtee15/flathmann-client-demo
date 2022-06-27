import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Dim, Colors} from '../../constants/Theme';
import {Fonts} from '../../constants/fonts';
import {Overlay} from 'react-native-elements';

const DeleteOverlay = props => {
  const goBackHandler = props => {
    props.navigation.goBack();
  };
  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayErr}>
      <Text style={styles.heading}>Delete Section</Text>
      <Text style={styles.overlayTxt}>
        Are you sure you want to delete the section ?
      </Text>
      <View style={styles.divLine} />
      <TouchableOpacity onPress={props.handleDelete}>
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: Colors.red,
          }}>
          Delete
        </Text>
      </TouchableOpacity>
      <View style={styles.divLine} />
      <TouchableOpacity onPress={props.onBackdropPress}>
        <Text style={{fontFamily: Fonts.bold, color: Colors.darkBlue}}>
          Cancel
        </Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default DeleteOverlay;

const styles = StyleSheet.create({
  overlayErr: {
    borderRadius: 30,
    alignItems: 'center',
    width: Dim.w * 0.6,
    paddingVertical: 20,
  },
  heading: {
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    fontSize: 16,
  },
  overlayTxt: {
    textAlign: 'center',
    fontSize: 13,
    width: Dim.w * 0.5,
    color: Colors.grey,
    marginTop: 5,
    fontFamily: Fonts.regular,
  },
  divLine: {
    width: Dim.w * 0.55,
    backgroundColor: Colors.lightgrey,
    height: 2,
    marginVertical: 10,
  },
});
