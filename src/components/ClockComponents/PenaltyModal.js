import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {Dim, Colors} from '../../constants/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Overlay} from 'react-native-elements';
import {useDispatch} from 'react-redux';

import Options from '../modals/OptionModal';
import PlayersList from '../../screens/user/clockWithStats/components/overlays/PlayersList';
import {PENALTY} from '../../redux/actions/clockStats.actions';

const PenaltyOverlay = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [penaltyType, setPenaltyType] = React.useState({
    value: '',
    modal: false,
  });

  const toggleList = () => {
    setIsVisible(!isVisible);
  };

  const dispatch = useDispatch();

  const handleGenerate = () => {
    dispatch({
      type: 'PENALTY',
      payload: {
        type: 'penalty',
        team: props.team,
        player: selectedPlayer?.playerName,
        jersey: selectedPlayer?.homeJersey,
        statement: 'Penalty',
      },
    });
    props.onBackdropPress();
  };

  console.log('player NAME FOUND ', handleGenerate);
  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayStyle}>
      <Text style={styles.heading}>Add Penalty</Text>

      <View style={styles.row}>
        <Ionicons name="shirt" size={18} color={Colors.darkBlue} />
        <Text style={styles.txt}>player : </Text>
        <TouchableOpacity style={styles.input} onPress={toggleList}>
          <TextInput
            style={{padding: 0, color: Colors.darkBlue}}
            editable={false}
            placeholder="select player"
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

      <TouchableOpacity onPress={handleGenerate} style={styles.saveBtn}>
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
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
