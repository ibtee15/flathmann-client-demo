import React from 'react';
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

const PlayersList = props => {
  const handleSelect = playerName => {
    props.setSelectedPlayer(playerName);
    props.onBackdropPress();
  };
  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={props.onBackdropPress}
      visible={props.isVisible}>
      {props.players &&
        props.players.map((v, i) => {
          return (
            <TouchableOpacity onPress={() => handleSelect(v)}>
              <Text style={styles.option}>
                (#{v.homeJersey}) {v.playerName}
              </Text>
            </TouchableOpacity>
          );
        })}
    </Overlay>
  );
};
export default PlayersList;

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
