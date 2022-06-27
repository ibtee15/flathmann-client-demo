import Color from 'color';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import {Colors, Dim} from '../../constants/Theme';

const Options = ({Data, setData, label, value, alignItems}) => {
  const select = num => {
    setData({value: num, modal: false});
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={Data.modal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setData({...Data, modal: false});
      }}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Pressable
          style={styles.centeredView}
          onPress={() => setData({...Data, modal: false})}>
          <View style={{...styles.modalView, alignItems: alignItems}}>
            {/* <Text style={[styles.option, {fontSize: 16}]}>{label}</Text> */}
            {value.map((num, ind) => {
              return (
                <Text
                  key={ind}
                  onPress={() => select(num)}
                  style={styles.option}>
                  {num}
                </Text>
              );
            })}
          </View>
        </Pressable>
      </ScrollView>
    </Modal>
  );
};
export default Options;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderRadius: 15,
    paddingTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
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
