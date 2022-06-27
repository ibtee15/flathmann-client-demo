import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {Dim, Colors} from '../../constants/Theme';
import {Fonts} from '../../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Overlay} from 'react-native-elements';

const DownloadOverlay = props => {
  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayStyles}>
      <AntDesign name="checkcircle" size={25} color={Colors.darkBlue} />
      <Text style={styles.txt}>Game log file has been downloaded!</Text>
    </Overlay>
  );
};

export default DownloadOverlay;

const styles = StyleSheet.create({
  overlayStyles: {
    borderRadius: 30,
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontFamily: Fonts.medium,
    color: Colors.darkBlue,
    marginLeft: 10,
  },
});
