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

const GameRulesModal = ({data, setSelectedRule, groupModal, closeModal}) => {
  const handleSelect = () => {
    setSelectedRule(val);
    closeModal();
  };

  // console.log('data FOUND at GameRulesModal', data);
  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={closeModal}
      visible={groupModal}>
      <ScrollView>
        <View>
          {data &&
            data.map((val, ind) => {
              return (
                <TouchableOpacity onPress={() => setSelectedRule(val)}>
                  <Text key={ind} style={styles.option}>
                    {val.ruleName} ({val.gender})
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </Overlay>
  );
};
export default GameRulesModal;

const styles = StyleSheet.create({
  modalView: {
    paddingVertical: 20,
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
  },
});
