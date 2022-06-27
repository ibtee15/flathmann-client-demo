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

const WonTypeList = ({setSelectedType, onBackdropPress, isVisible}) => {
  const handleSelect = val => {
    setSelectedType(val);
    onBackdropPress();
  };
  return (
    <Overlay
      overlayStyle={styles.modalView}
      visible={isVisible}
      onBackdropPress={onBackdropPress}>
      <ScrollView>
        {List.map((val, i) => {
          return (
            <TouchableOpacity onPress={() => handleSelect(val)}>
              <Text style={styles.option}>{val}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Overlay>
  );
};
export default WonTypeList;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    paddingTop: 20,
    paddingBottom: 15,
    alignItems: 'center',
    width: Dim.w * 0.5,
    // paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalhead: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.black,
    marginVertical: 15,
  },

  option: {
    // width: '100%',
    color: Colors.darkBlue,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 5,
  },
  divider: {
    width: '70%',
    height: 2,
    backgroundColor: '#F4F4F4',
    marginVertical: 5,
  },
});

const List = ['Won', 'Won and Groundball', 'Won via penalty'];
