import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {Dim, Colors} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Overlay} from 'react-native-elements';
import {useDispatch} from 'react-redux';

import PlayersList from './PlayersList';
import {PENALTY} from '../../../../../redux/actions/clockStats.actions';
import WonTypeList from '../../../../../components/modals/FOtypesModal';

const WonTypeOverlay = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const togglePlayersList = () => {
    setIsVisible(!isVisible);
  };

  const toggleTypes = () => {
    setTypeVisible(!typeVisible);
  };

  const dispatch = useDispatch();

  const handleGenerate = () => {
    dispatch({
      type: 'FACE_OFF_WON',
      payload: {
        team: props.team,
        player: selectedPlayer?.playerName,
        jersey: selectedPlayer?.homeJersey,
        statement: 'faceoff ' + selectedType,
      },
    });
    props.onBackdropPress();
  };

  //   console.log('player NAME FOUND ', handleGenerate);
  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayStyle}>
      <Text style={styles.heading}>Faceoff Won</Text>

      <View style={styles.row}>
        <Text style={styles.txt}>player : </Text>
        <TouchableOpacity style={styles.input} onPress={togglePlayersList}>
          <TextInput
            style={{padding: 0, color: Colors.darkBlue}}
            editable={false}
            placeholder="select a player"
            value={selectedPlayer?.playerName}
          />
        </TouchableOpacity>
      </View>

      <PlayersList
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        setSelectedPlayer={setSelectedPlayer}
        players={props.players}
      />

      <View style={styles.row}>
        <Text style={styles.txt}>Type : </Text>
        <TouchableOpacity onPress={toggleTypes} style={{flex: 1}}>
          <TextInput
            editable={false}
            placeholder="select type"
            style={styles.input}
            value={selectedType}
          />
        </TouchableOpacity>
      </View>

      <WonTypeList
        isVisible={typeVisible}
        onBackdropPress={() => setTypeVisible(false)}
        setSelectedType={setSelectedType}
      />

      <TouchableOpacity onPress={handleGenerate} style={styles.saveBtn}>
        <Text style={{color: Colors.white, fontFamily: Fonts.semiBold}}>
          Add
        </Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default WonTypeOverlay;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 15,
    alignItems: 'center',
    padding: Dim.w * 0.05,
    paddingHorizontal: Dim.w * 0.07,
    backgroundColor: Colors.lightgrey,
  },
  heading: {
    fontFamily: Fonts.heading,
    color: Colors.green,
    marginBottom: 10,
    fontSize: 22,
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
    marginLeft: 5,
    flex: 1,
    fontFamily: Fonts.regular,
  },
  txt: {
    color: Colors.blue,
    marginLeft: 5,
    fontFamily: Fonts.semiBold,
  },
  saveBtn: {
    width: 60,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
