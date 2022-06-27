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

import PlayersList from './PlayersList';
import {
  TEAM_A_PENALTY,
  TEAM_B_PENALTY,
} from '../../../../../redux/actions/clockStats.actions';
import PenaltyTypes from '../../../../../components/modals/PenaltyTypesModal';
import DotSwitch from '../../../../../components/tabSwitch/DotSwitch';

const initialState = {
  player: '',
  penaltyTime: '0',
  penaltyType: '',
  team: '',
  jersey: '',
  releasable: true,
};

const PenaltyOverlay = props => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [penaltyVisible, setPenaltyVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPenalty, setSelectedPenalty] = useState(null);
  const [initialFormState, setInitialFormState] = useState(initialState);
  const [selectedDot, setSelectedDot] = useState(1);
  const [selectedDotFO, setSelectedDotFO] = useState(1);

  const togglePlayersList = () => {
    setIsVisible(!isVisible);
  };
  const togglePenaltyTypes = () => {
    setPenaltyVisible(!penaltyVisible);
  };

  const handleFormChange = (name, value) => {
    setInitialFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (selectedPenalty) {
      handleFormChange('penaltyTime', selectedPenalty?.time.toString());
    }
  }, [selectedPenalty]);

  useEffect(() => {
    handleFormChange('player', selectedPlayer?.playerName);
    handleFormChange('jersey', selectedPlayer?.homeJersey);
    handleFormChange('penaltyType', selectedPenalty?.code);
    handleFormChange('team', props.team);
    // console.log('initialState =>>', initialFormState);
  }, [selectedPenalty, selectedPlayer]);

  const handleGenerate = () => {
    if (props.isTeamA || props.isTeamB) {
      const type = props.isTeamA ? TEAM_A_PENALTY : TEAM_B_PENALTY;
      dispatch({
        type,
        payload: {
          type: 'penalty',
          team: props.team,
          clockTime:
            `${props.penaltyTime().displayMins}:${
              props.penaltyTime().displaySecs
            }` +
            `- ${
              props.quarter === 1
                ? '1st'
                : props.quarter === 2
                ? '2nd'
                : props.quarter === 3
                ? '3rd'
                : props.quarter === 4
                ? '4th'
                : '0'
            } QTR`,
          player: initialFormState?.player,
          jersey: initialFormState?.jersey,
          time: initialFormState?.penaltyTime,
          statement: 'Penalty',
          otherTxt: `[${selectedPenalty.code}${
            selectedPenalty.type === 'Personal'
              ? '/PP'
              : selectedPenalty.type === 'Technical'
              ? '/TP'
              : selectedPenalty.type === 'FOV'
              ? '/FP'
              : null
          }]`,
          code: selectedPenalty.code,
          type: selectedPenalty.type,
          releasable: initialFormState?.releasable,
        },
      });
    }
    props.onBackdropPress();
    setInitialFormState(initialState);
  };

  // console.log('selectedPenalty FOUND ', selectedPenalty);
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
        <MaterialCommunityIcons name="card" size={18} color={Colors.darkBlue} />
        <Text style={styles.txt}>Penalty Type : </Text>
        <TouchableOpacity onPress={togglePenaltyTypes} style={{flex: 1}}>
          <TextInput
            editable={false}
            placeholder="select type"
            style={styles.input}
            value={selectedPenalty?.code}
          />
        </TouchableOpacity>
      </View>

      <PenaltyTypes
        isVisible={penaltyVisible}
        onBackdropPress={() => setPenaltyVisible(false)}
        setSelectedPenalty={setSelectedPenalty}
      />

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="clock-edit"
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="bullhorn"
            size={18}
            color={Colors.darkBlue}
          />
          <Text style={styles.txt}>Releasable:</Text>
        </View>
        <DotSwitch
          Tab1={{text: 'Yes', value: true}}
          Tab2={{text: 'No', value: false}}
          TabKey={'releasable'}
          defaultTab={selectedDot}
          setSelectedTab={setSelectedDot}
          handleFormChange={handleFormChange}
        />
      </View>

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
