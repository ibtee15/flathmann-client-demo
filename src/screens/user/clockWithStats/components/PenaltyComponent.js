import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Dim, Colors} from '../../../../constants/Theme';
import {Fonts} from '../../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';

import PenaltyOverlay from './overlays/PenaltyModal';
import {useSelector, useDispatch} from 'react-redux';
import PenaltyCard from './cards/PenaltyCard';

const PenaltyComponent = props => {
  const dispatch = useDispatch();
  const {durationTime, gameTime, clockIsRunning} = props;

  const [penaltyVisible, setPenaltyVisible] = useState(false);
  const [penaltyVisible2, setPenaltyVisible2] = useState(false);
  const [dropDownVisible, setDropDownVisible] = useState(false);

  const teamA = useSelector(state => state.clockStatsReducer.teamA);
  const teamB = useSelector(state => state.clockStatsReducer.teamB);

  const togglePenalty = () => {
    setPenaltyVisible(!penaltyVisible);
  };
  const togglePenalty2 = () => {
    setPenaltyVisible2(!penaltyVisible2);
  };
  const toggleDropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };

  return (
    <View>
      <View style={{...styles.rowTxT, alignItems: 'center'}}>
        <TouchableOpacity onPress={togglePenalty} style={styles.penaltyBtn}>
          <Text style={styles.goalTxt}>PENALTY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDropDown}>
          <Entypo
            name="chevron-with-circle-down"
            size={25}
            color={Colors.green}
            style={{marginTop: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePenalty2} style={styles.penaltyBtn}>
          <Text style={styles.goalTxt}>PENALTY</Text>
        </TouchableOpacity>
      </View>
      <View style={{...styles.rowTxT, width: Dim.w * 0.82}}>
        {dropDownVisible && teamA?.penalties.length === 0 && (
          <View style={styles.penaltyView}>
            <Text style={styles.smallTxt}>XX : T/T : XX</Text>
          </View>
        )}

        {teamA?.penalties.length > 0 && (
          <View
            style={
              dropDownVisible
                ? styles.penaltyView
                : {height: 0, borderWidth: 0, paddingVertical: 0}
            }>
            {teamA.penalties.length > 0 &&
              teamA.penalties.map((v, i) => {
                return (
                  <PenaltyCard
                    gameTime={props.gameTime}
                    idx={i}
                    value={v}
                    isTeamA={true}
                    countdownIsOpen={props.countdownIsOpen}
                    dropDownVisible={dropDownVisible}
                    // isReleasable={isReleasable}
                  />
                );
              })}
          </View>
        )}

        {dropDownVisible && teamB?.penalties.length === 0 && (
          <View style={styles.penaltyView}>
            <Text style={styles.smallTxt}>XX : T/T : XX</Text>
          </View>
        )}

        {teamB?.penalties.length > 0 && (
          <View
            style={
              dropDownVisible
                ? styles.penaltyView
                : {height: 0, borderWidth: 0, paddingVertical: 0}
            }>
            {teamB.penalties.length > 0 &&
              teamB.penalties.map((v, i) => {
                return (
                  <PenaltyCard
                    gameTime={props.gameTime}
                    idx={i}
                    value={v}
                    isTeamB={true}
                    countdownIsOpen={props.countdownIsOpen}
                    dropDownVisible={dropDownVisible}
                  />
                );
              })}
          </View>
        )}
      </View>

      <PenaltyOverlay
        isVisible={penaltyVisible}
        onBackdropPress={() => togglePenalty(false)}
        navigation={props.navigation}
        players={teamA.players}
        team={teamA?.teamName}
        isTeamA={true}
        penaltyTime={props.penaltyTime}
        quarter={props.quarter}
      />

      <PenaltyOverlay
        isVisible={penaltyVisible2}
        onBackdropPress={() => togglePenalty2(false)}
        navigation={props.navigation}
        players={teamB.players}
        team={teamB?.teamName}
        isTeamB={true}
        penaltyTime={props.penaltyTime}
        quarter={props.quarter}
      />
    </View>
  );
};

export default PenaltyComponent;

const styles = StyleSheet.create({
  rowTxT: {
    flexDirection: 'row',
    // alignItems: 'center',
    alignSelf: 'center',
    width: Dim.w * 0.85,
    justifyContent: 'space-between',
  },
  goalTxt: {
    fontSize: 23,
    fontFamily: Fonts.heading,
    color: Colors.white,
    lineHeight: 30,
  },
  penaltyBtn: {
    backgroundColor: Colors.btnRed,
    width: Dim.w * 0.36,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  penaltyView: {
    width: Dim.w * 0.37,
    backgroundColor: Colors.whiteO,
    borderRadius: 20,
    // height: 30,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.grey,
    marginBottom: 5,
    alignItems: 'center',
  },
  smallTxt: {
    fontSize: 15,
    color: Colors.darkgrey,
    fontFamily: Fonts.heading,
  },
});
