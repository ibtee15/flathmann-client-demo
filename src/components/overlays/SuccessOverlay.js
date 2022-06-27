import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {Dim, Colors} from '../../constants/Theme';
import {Fonts} from '../../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Overlay} from 'react-native-elements';

const SuccessOverlay = props => {
  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayErr}>
      <AntDesign name="checkcircle" size={25} color={Colors.darkBlue} />
      <Text style={styles.txt}>{props.type}</Text>
    </Overlay>
  );
};

export default SuccessOverlay;

const styles = StyleSheet.create({
  overlayErr: {
    borderRadius: 30,
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontFamily: Fonts.medium,
    color: Colors.darkBlue,
    marginLeft: 5,
  },
});
