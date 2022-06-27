import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Dim, Colors} from '../../constants/Theme';
import {Overlay} from 'react-native-elements';

const EndGameOverlay = props => {
  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayErr}>
      <Text style={{fontWeight: 'bold', color: Colors.darkBlue, fontSize: 18}}>
        End Game
      </Text>
      <Text style={styles.overlayTxt}>
        Are you sure you want to end the game?
      </Text>
      <View style={styles.divLine} />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('UserDashboard')}>
        <Text style={{fontWeight: 'bold', color: Colors.red}}>Yes</Text>
      </TouchableOpacity>
      <View style={styles.divLine} />
      <TouchableOpacity onPress={props.onBackdropPress}>
        <Text style={{fontWeight: 'bold', color: Colors.darkBlue}}>No</Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default EndGameOverlay;

const styles = StyleSheet.create({
  overlayErr: {
    borderRadius: 30,
    alignItems: 'center',
    width: Dim.w * 0.6,
    paddingVertical: 20,
    paddingBottom: 15,
  },
  overlayTxt: {
    textAlign: 'center',
    fontSize: 13,
    width: Dim.w * 0.5,
    color: Colors.grey,
  },
  divLine: {
    width: Dim.w * 0.55,
    backgroundColor: Colors.lightgrey,
    height: 2,
    marginVertical: 10,
  },
});
