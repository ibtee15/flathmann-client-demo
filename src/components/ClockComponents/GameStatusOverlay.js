import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {Dim, Colors} from '../../constants/Theme';
import {Fonts} from '../../constants/fonts';
import {Overlay} from 'react-native-elements';

const GameStatus = props => {
  const handleSelect = v => {
    props.setSelectedStatus(v);
    props.onBackdropPress();
  };
  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayErr}>
      {Status.map((v, i) => {
        return (
          <>
            <TouchableOpacity onPress={() => handleSelect(v)}>
              <Text style={styles.txt}>{v}</Text>
            </TouchableOpacity>
          </>
        );
      })}
    </Overlay>
  );
};

export default GameStatus;

const styles = StyleSheet.create({
  overlayErr: {
    borderRadius: 30,
    alignItems: 'center',
    width: Dim.w * 0.5,
    paddingVertical: 20,
  },
  txt: {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    marginBottom: 2,
  },
});

const Status = ['Completed', 'Canceled', 'Forfit'];
