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

const AllUsersModal = ({data, setSelectedUser, userModal, closeModal}) => {
  const handleSelect = () => {
    setSelectedUser(val);
    closeModal();
  };
  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={closeModal}
      visible={userModal}>
      <ScrollView>
        <View>
          {data.map((val, ind) => {
            return (
              <TouchableOpacity onPress={() => setSelectedUser(val)}>
                <Text key={ind} style={styles.option}>
                  {val.userName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Overlay>
  );
};
export default AllUsersModal;

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
