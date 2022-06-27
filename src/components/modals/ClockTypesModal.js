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
import {Colors, Dim} from '../../constants/Theme';
import {Overlay} from 'react-native-elements';

const ClockTypeModal = ({
  data,
  setSelectedClockType,
  onBackdropPress,
  clockTypeModal,
}) => {
  const handleSelect = () => {
    setSelectedClockType(val);
    onBackdropPress();
  };
  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={onBackdropPress}
      visible={clockTypeModal}>
      <View>
        {data.map((val, ind) => {
          return (
            <TouchableOpacity onPress={() => setSelectedClockType(val)}>
              <Text key={ind} style={styles.option}>
                {val}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Overlay>
  );
};
export default ClockTypeModal;

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
