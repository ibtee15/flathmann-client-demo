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

const HomeTeamModal = ({
  licenseTeam,
  oppTeam,
  visible,
  onBackdropPress,
  setSelectedHomeTeam,
  setSelectedVisitorTeam,
  setSelectedTeam,
}) => {
  const handleSelect = (teamType, val) => {
    if (setSelectedTeam) {
      if (teamType === 'licenseTeam') {
        setSelectedTeam('teamA');
      }
      if (teamType === 'oppTeam') {
        setSelectedTeam('teamB');
      }
      setSelectedHomeTeam(val);
      if (teamType === 'licenseTeam') {
        setSelectedVisitorTeam(oppTeam);
      }
      if (teamType === 'oppTeam') {
        setSelectedVisitorTeam(licenseTeam);
      }
    } else {
      setSelectedHomeTeam(val);
      if (teamType === 'licenseTeam') {
        setSelectedVisitorTeam(oppTeam);
      }
      if (teamType === 'oppTeam') {
        setSelectedVisitorTeam(licenseTeam);
      }
    }
    onBackdropPress();
  };

  //   console.log('data at HomeTeamModal ========>>>> HomeTeamModal', oppTeam);
  //   console.log('data at HomeTeamModal ========>>>> HomeTeamModal', licenseTeam);

  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={onBackdropPress}
      visible={visible}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => handleSelect('licenseTeam', licenseTeam)}>
          <Text style={styles.option}>{licenseTeam}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelect('oppTeam', oppTeam)}>
          <Text style={styles.option}>{oppTeam}</Text>
        </TouchableOpacity>
      </ScrollView>
    </Overlay>
  );
};
export default HomeTeamModal;

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
