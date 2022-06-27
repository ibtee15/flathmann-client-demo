import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Overlay} from 'react-native-elements';
import GoalieClearButton from '../buttons/GoalieClearButton';
import ClearSuccessButton from '../buttons/ClearSuccessButton';
import ClearFailedButton from '../buttons/ClearFailedButton';

const ClearButtons = props => {
  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={props.onBackdropPress}
      visible={props.visible}>
      <View style={styles.foulBtnsRow}>
        <GoalieClearButton
          goalie={props.goalieA}
          players={props.playersA}
          team={props.teamA}
          clearTime={props.clearTime}
          onBackdropPress={props.onBackdropPress}
          quarter={props.quarter}
        />
        <GoalieClearButton
          goalie={props.goalieB}
          players={props.playersB}
          team={props.teamB}
          clearTime={props.clearTime}
          quarter={props.quarter}
          onBackdropPress={props.onBackdropPress}
        />
      </View>
      <View style={styles.foulBtnsRow}>
        <ClearSuccessButton
          clearTime={props.clearTime}
          players={props.playersA}
          team={props.teamA}
          onBackdropPress={props.onBackdropPress}
          quarter={props.quarter}
        />
        <ClearSuccessButton
          clearTime={props.clearTime}
          players={props.playersB}
          team={props.teamB}
          onBackdropPress={props.onBackdropPress}
          quarter={props.quarter}
        />
      </View>
      <View style={styles.foulBtnsRow}>
        <ClearFailedButton
          clearTime={props.clearTime}
          players={props.playersA}
          team={props.teamA}
          onBackdropPress={props.onBackdropPress}
          quarter={props.quarter}
        />
        <ClearFailedButton
          clearTime={props.clearTime}
          players={props.playersB}
          team={props.teamB}
          quarter={props.quarter}
          onBackdropPress={props.onBackdropPress}
        />
      </View>
    </Overlay>
  );
};
export default ClearButtons;

const styles = StyleSheet.create({
  modalView: {
    width: Dim.w * 0.9,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  foulBtnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dim.w * 0.85,
    justifyContent: 'space-between',
  },
});
