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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Overlay} from 'react-native-elements';
import Options from '../modals/OptionModal';

const PenaltyOverlay = props => {
  const [penaltyType, setPenaltyType] = React.useState({
    value: '',
    modal: false,
  });
  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayStyle}>
      <Text style={styles.heading}>Add Penalty</Text>

      <View style={styles.row}>
        <Ionicons name="shirt" size={18} color={Colors.darkBlue} />
        <Text style={styles.txt}>player # : </Text>
        <TextInput placeholder="enter player #" style={styles.input} />
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="clock-edit-outline"
          size={18}
          color={Colors.darkBlue}
        />
        <Text style={styles.txt}>Penalty Time : </Text>
        <TextInput value="2" style={styles.input} />
        <Text style={{...styles.txt, fontSize: 12}}>mins</Text>
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons name="card" size={18} color={Colors.darkBlue} />
        <Text style={styles.txt}>Penalty Type : </Text>
        <TouchableOpacity
          onPress={() => setPenaltyType({...penaltyType, modal: true})}
          style={{flex: 1}}>
          <TextInput
            editable={false}
            placeholder="select type"
            style={styles.input}
            value={penaltyType.value}
          />
        </TouchableOpacity>
      </View>

      <Options
        label="Team Name"
        Data={penaltyType}
        setData={setPenaltyType}
        value={['type 1', 'Type 2']}
      />

      <TouchableOpacity onPress={props.onBackdropPress} style={styles.saveBtn}>
        <Text style={{color: Colors.white}}>Add</Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default PenaltyOverlay;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 15,
    alignItems: 'center',
    padding: Dim.w * 0.05,
    paddingHorizontal: Dim.w * 0.07,
    backgroundColor: Colors.lightgrey,
  },
  heading: {
    fontWeight: 'bold',
    color: Colors.darkBlue,
    marginBottom: 10,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkBlue,
    width: Dim.w * 0.6,
    paddingBottom: 7,
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  input: {
    padding: 0,
    color: Colors.darkBlue,
    fontSize: 15,
    marginLeft: 5,
    flex: 1,
  },
  txt: {
    color: Colors.blue,
    marginLeft: 5,
  },
  saveBtn: {
    width: 60,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
