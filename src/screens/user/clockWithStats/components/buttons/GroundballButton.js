import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';

import {GROUND_BALL} from '../../../../redux/actions/clockStats.actions';
import {useDispatch} from 'react-redux';
import PlayersList from '../overlays/PlayersList';

const GroundballButton = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const toggleList = () => {
    setIsVisible(!isVisible);
  };

  const dispatch = useDispatch();

  const handleGenerate = () => {
    dispatch({
      type: 'GROUND_BALL',
      payload: {
        type: 'groundBall',
        team: props.team,
        clockTime:
          `${props.pressTime().displayMins}:${props.pressTime().displaySecs}` +
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
        player: selectedPlayer?.playerName,
        jersey: selectedPlayer?.homeJersey,
        statement: 'Ground ball',
      },
    });
  };

  useEffect(() => {
    if (selectedPlayer?.playerName) {
      console.log('handleGenerate Ground ball workingggggg');
      handleGenerate();
      // setSelectedPlayer(null);
    }
  }, [selectedPlayer?.playerName]);

  return (
    <View>
      <TouchableOpacity onPress={toggleList} style={styles.faceOffBtns}>
        <Text style={styles.smallTxt2}>GROUND BALL</Text>
      </TouchableOpacity>

      <PlayersList
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        setSelectedPlayer={setSelectedPlayer}
        players={props.players}
      />
    </View>
  );
};

export default GroundballButton;

const styles = StyleSheet.create({
  rowTxT: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dim.w * 0.85,
    justifyContent: 'space-between',
  },
  faceOffBtns: {
    width: Dim.w * 0.41,
    height: 35,
    marginBottom: 3,
    backgroundColor: Colors.btnGreen,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallTxt2: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: Fonts.heading,
  },
});
