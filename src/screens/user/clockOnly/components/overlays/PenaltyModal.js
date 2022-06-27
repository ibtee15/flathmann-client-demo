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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Overlay} from 'react-native-elements';
import {useDispatch} from 'react-redux';

import {PENALTY} from '../../../../../redux/actions/clockStats.actions';
import PlayersList from './PlayersList';
import PenaltyTypes from '../../../../../components/modals/PenaltyTypesModal';

const initialState = {
  player: '',
  penaltyTime: '0',
  penaltyType: '',
  team: '',
  jersey: '',
};

const PenaltyOverlay = props => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [penaltyVisible, setPenaltyVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPenalty, setSelectedPenalty] = useState(null);
  // const [penaltyTime, setPenaltyTime] = useState('0');
  const [initialFormState, setInitialFormState] = useState(initialState);

  const handleFormChange = (name, value) => {
    setInitialFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // console.log('*****************8', props.players);

  useEffect(() => {
    handleFormChange('player', selectedPlayer?.playerName);
    handleFormChange('jersey', selectedPlayer?.homeJersey);
    handleFormChange('penaltyType', selectedPenalty);
    handleFormChange('team', props.team);
    console.log('initialState =>>', initialFormState);
  }, [selectedPenalty, selectedPlayer]);

  const togglePlayersList = () => {
    setIsVisible(!isVisible);
  };

  const togglePenaltyTypes = () => {
    setPenaltyVisible(!penaltyVisible);
  };

  const handleGenerate = () => {
    dispatch({
      type: 'PENALTY',
      // payload: {
      //   team: props.team,
      //   player: selectedPlayer?.playerName,
      //   jersey: selectedPlayer?.homeJersey,
      //   statement: 'Penalty: ' + selectedPenalty,
      // },
      payload: {
        team: props.team,
        player: initialFormState?.player,
        jersey: initialFormState?.jersey,
        time: initialFormState.penaltyTime,
        statement: 'Penalty: ' + selectedPenalty,
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
      <Text style={styles.heading}>Add Penalty</Text>

      <View style={styles.row}>
        <Ionicons name="shirt" size={18} color={Colors.darkBlue} />
        <Text style={styles.txt}>player : </Text>
        <TouchableOpacity style={styles.input} onPress={togglePlayersList}>
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
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={initialFormState.penaltyTime}
          onChangeText={txt => handleFormChange('penaltyTime', txt)}
        />
        <Text style={{...styles.txt, fontSize: 12}}>mins</Text>
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons name="card" size={18} color={Colors.darkBlue} />
        <Text style={styles.txt}>Penalty Type : </Text>
        <TouchableOpacity onPress={togglePenaltyTypes} style={{flex: 1}}>
          <TextInput
            editable={false}
            placeholder="select type"
            style={styles.input}
            value={selectedPenalty}
          />
        </TouchableOpacity>
      </View>

      <PenaltyTypes
        isVisible={penaltyVisible}
        onBackdropPress={() => setPenaltyVisible(false)}
        setSelectedPenalty={setSelectedPenalty}
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
