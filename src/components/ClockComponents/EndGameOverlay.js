import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {Dim, Colors} from '../../constants/Theme';
import {Fonts} from '../../constants/fonts';
import {Overlay} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeTeamList from '../modals/HomeTeamModal';
import GameStatus from './GameStatusOverlay';
import ErrorOverlay from '../overlays/ErrorOverlay';
import {useSelector} from 'react-redux';
import {saveGame} from '../../services/game.services';

const initialForm = {
  userId: '',
  winnerTeam: '',
  otherTeam: '',
  general: '',
  rules: '',
  activityLog: '',
};

const EndGameOverlay = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [teamVisible, setTeamVisible] = useState(false);
  const [selectedWiningTeam, setSelectedWiningTeam] = useState(null);
  // const [selectedOtherTeam, setSelectedOtherTeam] = useState(null);
  const [selectedHomeTeam, setSelectedHomeTeam] = useState(null);
  const [selectedVisitorTeam, setSelectedVisitorTeam] = useState(null);
  const [initialFormState, setInitialFormState] = useState(initialForm);
  const [error, setError] = useState(null);

  const user = useSelector(state => state.authReducer.user);
  const teamA = useSelector(state => state.clockStatsReducer.teamA);
  const teamB = useSelector(state => state.clockStatsReducer.teamB);
  const general = useSelector(state => state.clockStatsReducer.general);
  const rules = useSelector(state => state.clockStatsReducer.rules);
  const activityLog = useSelector(state => state.clockStatsReducer.activityLog);

  // console.log('props.teamA=>>>>>> ', props.teamA);

  const handleFormChange = (name, value) => {
    setInitialFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    handleFormChange('userId', user?._id);
    handleFormChange('general', general);
    handleFormChange('rules', rules);
    handleFormChange('activityLog', activityLog);
  }, []);

  // useEffect(() => {
  //   console.log('<<FOUND>>', initialFormState);
  // }, [initialFormState]);

  useEffect(() => {
    if (selectedWiningTeam === 'teamA') {
      handleFormChange('otherTeam', teamB);
      handleFormChange('winnerTeam', teamA);
    }
    if (selectedWiningTeam === 'teamB') {
      handleFormChange('otherTeam', teamA);
      handleFormChange('winnerTeam', teamB);
    }
  }, [selectedWiningTeam]);

  const toggleStatus = () => {
    setIsVisible(!isVisible);
  };
  const toggleTeam = () => {
    setTeamVisible(!teamVisible);
  };

  const handleSave = async () => {
    try {
      const response = await saveGame(initialFormState, user?.token);
      console.log('request workingggggg', response.data);
      props.navigation.navigate('UserDashboard');
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayErr}>
      <ErrorOverlay
        onBackdropPress={() => setError(null)}
        visible={error ? true : false}
        error={error}
        // message={error?.message ? error.message : 'Fill all requirements!'}
        message={error?.response?.data?.message || error?.message}
      />

      <Text style={styles.endTxt}>End Game</Text>

      <Text style={styles.overlayTxt}>
        Are you sure you want to end the game?
      </Text>

      <View style={styles.inputView}>
        <TextInput
          placeholder="Select Winner Team"
          editable={false}
          style={styles.input}
          value={selectedHomeTeam ? selectedHomeTeam : selectedVisitorTeam}
          // value={teamA ? teamA.teamName : teamB.teamName}
          // onChangeText={text => handleFormChange('winnerTeam', text)}
        />
        <TouchableOpacity onPress={toggleTeam}>
          <Entypo name="chevron-down" size={25} color={Colors.darkBlue} />
        </TouchableOpacity>
      </View>

      <HomeTeamList
        onBackdropPress={() => setTeamVisible(false)}
        visible={teamVisible}
        licenseTeam={props.teamA}
        oppTeam={props.teamB}
        setSelectedVisitorTeam={setSelectedVisitorTeam}
        setSelectedHomeTeam={setSelectedHomeTeam}
        setSelectedTeam={setSelectedWiningTeam}
      />

      <View style={styles.inputView}>
        <TextInput
          placeholder="select game status"
          editable={false}
          style={styles.input}
          value={selectedStatus}
        />
        <TouchableOpacity onPress={toggleStatus}>
          <Entypo name="chevron-down" size={25} color={Colors.darkBlue} />
        </TouchableOpacity>
      </View>

      <GameStatus
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        setSelectedStatus={setSelectedStatus}
      />

      {/* <View style={styles.divLine} /> */}

      <TouchableOpacity onPress={handleSave}>
        <Text style={styles.yes}>Yes</Text>
      </TouchableOpacity>
      <View style={styles.divLine} />
      <TouchableOpacity onPress={props.onBackdropPress}>
        <Text style={styles.no}>No</Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default EndGameOverlay;

const styles = StyleSheet.create({
  overlayErr: {
    borderRadius: 30,
    alignItems: 'center',
    width: Dim.w * 0.6,
    paddingVertical: 20,
    paddingBottom: 15,
    backgroundColor: Colors.lightgrey,
  },
  endTxt: {
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    fontSize: 18,
  },
  overlayTxt: {
    textAlign: 'center',
    fontSize: 13,
    width: Dim.w * 0.5,
    color: Colors.darkgrey,
    fontFamily: Fonts.regular,
    marginBottom: 10,
  },
  divLine: {
    width: Dim.w * 0.55,
    backgroundColor: Colors.bgColour,
    height: 1,
    marginVertical: 5,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: Colors.grey,
    borderRadius: 20,
  },
  input: {
    width: Dim.w * 0.4,
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    padding: 0,
    paddingVertical: 3,
  },
  yes: {fontFamily: Fonts.bold, color: Colors.red},
  no: {fontFamily: Fonts.bold, color: Colors.darkBlue},
});
