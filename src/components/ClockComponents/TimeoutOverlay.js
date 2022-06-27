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
import Entypo from 'react-native-vector-icons/Entypo';
import {Overlay} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import {TIMEOUT} from '../../redux/actions/clockStats.actions';
import HomeTeamList from '../modals/HomeTeamModal';

const TimeoutOverlay = props => {
  const dispatch = useDispatch();
  const teamA = useSelector(state => state.clockStatsReducer.teamA);
  const teamB = useSelector(state => state.clockStatsReducer.teamB);
  const [teamVisible, setTeamVisible] = useState(false);
  const [selectedHomeTeam, setSelectedHomeTeam] = useState(null);
  const [selectedVisitorTeam, setSelectedVisitorTeam] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const toggleTeam = () => {
    setTeamVisible(!teamVisible);
  };

  useEffect(() => {
    console.log('SeletedTeam ==>> ', selectedTeam);
  }, [selectedTeam]);

  const handleSave = () => {
    if (selectedTeam === 'teamA') {
      if (teamA.timeoutsLeft == 0) {
        alert(`${selectedTeam} countdown left are 0`);
        return;
      } else {
        dispatch({
          type: 'TEAM_A_TIMEOUT',
          payload: Number(teamA.timeoutsLeft) - 1,
        });
        dispatch({
          type: TIMEOUT,
          payload: {
            type: 'timeout',
            clockTime:
              `${props.pressTime().displayMins}:${
                props.pressTime().displaySecs
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
            team: selectedHomeTeam,
            statement: 'Timeout',
          },
        });
      }
    }
    if (selectedTeam === 'teamB') {
      if (teamB.timeoutsLeft == 0) {
        alert(`${selectedTeam} countdown left are 0`);
        return;
      } else {
        dispatch({
          type: 'TEAM_B_TIMEOUT',
          payload: Number(teamB.timeoutsLeft) - 1,
        });
        dispatch({
          type: TIMEOUT,
          payload: {
            type: 'timeout',
            team: selectedVisitorTeam,
            statement: 'Timeout',
          },
        });
      }
    }
    // if (selectedTeam) {
    props.handleOnPress();
    // }
    props.onBackdropPress();
  };
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
          value={selectedHomeTeam ? selectedHomeTeam : selectedVisitorTeam}
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
        setSelectedTeam={setSelectedTeam}
      />

      <View style={styles.row}>
        <TouchableOpacity onPress={props.onBackdropPress}>
          <Text style={styles.backTxt}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
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
