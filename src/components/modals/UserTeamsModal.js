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

const UserTeamsList = ({data, setSelectedMyTeam, visible, onBackdropPress}) => {
  const handleSelect = val => {
    setSelectedMyTeam(val);
    onBackdropPress();
  };

  // console.log('UserTeamsList at MODAL', data);
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
                    {val.teamName}
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
export default UserTeamsList;

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
