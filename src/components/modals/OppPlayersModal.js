import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors, Dim} from '../../constants/Theme';
import {Overlay} from 'react-native-elements';

const OppPlayersModal = ({
  data,
  visible,
  onBackdropPress,
  setSelectedPlayerB,
}) => {
  const handleSelect = val => {
    setSelectedPlayerB(val);
    onBackdropPress();
  };

  // console.log('at OppPlayersModal ========>>>> DATA', data);

  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={onBackdropPress}
      visible={visible}>
      <ScrollView>
        <View>
          {data &&
            data.map((val, ind) => {
              return (
                <TouchableOpacity onPress={() => handleSelect(val)}>
                  <Text key={ind} style={styles.option}>
                    {val.playerName}
                    {/* ttttttt */}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </Overlay>
  );
};
export default OppPlayersModal;

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
