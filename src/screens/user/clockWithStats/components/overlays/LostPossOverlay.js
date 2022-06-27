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
import {Overlay} from 'react-native-elements';

import PlayersList from './PlayersList';
import {LOST_POSSESSION_A} from '../../../../../redux/actions/clockStats.actions';
import {LOST_POSSESSION_B} from '../../../../../redux/actions/clockStats.actions';
import {useSelector, useDispatch} from 'react-redux';

const LostPossOverlay = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const togglePlayersList = () => {
    setIsVisible(!isVisible);
  };

  const dispatch = useDispatch();
  const teamA = useSelector(state => state.clockStatsReducer.teamA);
  const teamB = useSelector(state => state.clockStatsReducer.teamB);

  const handleShot = team => {
    if (team === 'teamA') {
      dispatch({
        type: LOST_POSSESSION_A,
        payload: {
          type: 'possession',
          team: teamA?.teamName,
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
          statement: 'Lost Possession',
          player: selectedPlayer?.playerName,
          jersey: selectedPlayer?.homeJersey,
        },
      });
    }

    if (team === 'teamB') {
      dispatch({
        type: LOST_POSSESSION_B,
        payload: {
          type: 'possession',
          team: teamB?.teamName,
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
          statement: 'Lost Possession',
          player: selectedPlayer?.playerName,
          jersey: selectedPlayer?.homeJersey,
        },
      });
    }
    props.onBackdropPress();
    props.handleLostPossession();
  };

  //   console.log('ye team arhi h', selectedDot);
  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayStyle}>
      <Text style={styles.heading}>Lost Possession</Text>

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
        players={props.team == 'teamA' ? teamA?.players : teamB?.players}
      />

      <TouchableOpacity
        onPress={() => handleShot(props.team)}
        style={styles.saveBtn}>
        <Text style={{color: Colors.white, fontFamily: Fonts.semiBold}}>
          SAVE
        </Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default LostPossOverlay;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 15,
    alignItems: 'center',
    padding: Dim.w * 0.05,
    paddingHorizontal: Dim.w * 0.05,
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
    width: Dim.w * 0.7,
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
