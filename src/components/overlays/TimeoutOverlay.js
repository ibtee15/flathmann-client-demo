import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {Dim, Colors} from '../../constants/Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import {Overlay} from 'react-native-elements';
import Options from '../modals/OptionModal';

const TimeoutOverlay = props => {
  const [teamName, setTeamName] = React.useState({
    value: '',
    modal: false,
  });
  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayErr}>
      <Text style={styles.timeoutHeading}>Timeout</Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Select Team Name"
          editable={false}
          style={styles.input}
          value={teamName.value}
        />
        <TouchableOpacity
          onPress={() => setTeamName({...teamName, modal: true})}>
          <Entypo name="chevron-down" size={25} color={Colors.darkBlue} />
        </TouchableOpacity>
      </View>

      <Options
        label="Team Name"
        Data={teamName}
        setData={setTeamName}
        value={['Team A', 'Team B']}
      />

      <View style={styles.row}>
        <TouchableOpacity onPress={props.onBackdropPress}>
          <Text style={styles.backTxt}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onBackdropPress}>
          <Text style={styles.saveTxt}>Save</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

export default TimeoutOverlay;

const styles = StyleSheet.create({
  overlayErr: {
    borderRadius: 20,
    padding: 20,
  },
  timeoutHeading: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 18,
    alignSelf: 'center',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightgrey,
    borderWidth: 1,
    borderColor: Colors.grey,
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    width: Dim.w * 0.5,
    fontSize: 13,
    color: Colors.darkBlue,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backTxt: {
    fontWeight: 'bold',
    color: Colors.red,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.red,
    marginLeft: 20,
  },
  saveTxt: {
    fontWeight: 'bold',
    color: Colors.green,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.green,
    marginRight: 20,
  },
});
