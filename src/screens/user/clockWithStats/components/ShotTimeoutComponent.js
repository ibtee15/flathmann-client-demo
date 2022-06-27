import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {Dim, Colors} from '../../../../constants/Theme';
import {Fonts} from '../../../../constants/fonts';
import {useSelector, useDispatch} from 'react-redux';
import TimeoutLeftCard from './cards/TimeoutLeftCard';
import ShotClockCard from './cards/ShotClockCard';

const ShotTimeoutComp = props => {
  return (
    <View style={styles.row}>
      <TimeoutLeftCard teamA={props.teamA} teamB={props.teamB} />
      {/* <View style={styles.line} /> */}
      <Image
        source={require('../../../../assets/icons/drawer.png')}
        style={styles.logo}
      />
      <ShotClockCard
        clockIsRunning={props.clockIsRunning}
        gameTime={props.gameTime}
        durationTime={props.durationTime}
        countdownIsOpen={props.countdownIsOpen}
        possessingTeam={props.possessingTeam}
        setPossessingTeam={props.setPossessingTeam}
        teamA={props.teamA}
        teamB={props.teamB}
        shotClockTime={props.shotClockTime}
        setShotClockTime={props.setShotClockTime}
      />
    </View>
  );
};

export default ShotTimeoutComp;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dim.w * 0.8,
    justifyContent: 'space-between',
    marginTop: 7,
  },
  line: {
    height: 20,
    width: 1.5,
    backgroundColor: Colors.whiteclock,
    marginLeft: -5,
  },
  logo: {
    width: Dim.w * 0.153,
    height: Dim.w * 0.135,
    marginTop: -Dim.w * 0.1,
    // tintColor: Colors.black,
  },
});
