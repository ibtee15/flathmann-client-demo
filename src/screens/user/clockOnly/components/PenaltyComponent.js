import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Dim, Colors} from '../../../../constants/Theme';
import {Fonts} from '../../../../constants/fonts';
import PenaltyOverlay from './overlays/PenaltyModal';
import {useSelector} from 'react-redux';

const PenaltyComponent = props => {
  const [penaltyVisible, setPenaltyVisible] = useState(false);
  const [penaltyVisible2, setPenaltyVisible2] = useState(false);

  const teamA = useSelector(state => state.clockStatsReducer.teamA);
  const teamB = useSelector(state => state.clockStatsReducer.teamB);

  const togglePenalty = () => {
    setPenaltyVisible(!penaltyVisible);
  };
  const togglePenalty2 = () => {
    setPenaltyVisible2(!penaltyVisible2);
  };
  return (
    <View>
      <View style={styles.rowTxT}>
        <TouchableOpacity onPress={togglePenalty} style={styles.penaltyBtn}>
          <Text style={styles.goalTxt}>PENALTY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePenalty2} style={styles.penaltyBtn}>
          <Text style={styles.goalTxt}>PENALTY</Text>
        </TouchableOpacity>
      </View>
      <View style={{...styles.rowTxT, width: Dim.w * 0.82}}>
        <View style={styles.penaltyView}>
          <Text style={{...styles.smallTxt, color: Colors.darkgrey}}>
            #XX - T/P - XX:XX
          </Text>
        </View>
        <View style={styles.penaltyView}>
          <Text style={{...styles.smallTxt, color: Colors.darkgrey}}>
            #XX - T/P - XX:XX
          </Text>
        </View>
      </View>

      <View style={{...styles.rowTxT, width: Dim.w * 0.82}}>
        <View style={styles.penaltyView}>
          <Text style={{...styles.smallTxt, color: Colors.darkgrey}}>
            #XX - T/P - XX:XX
          </Text>
        </View>
        <View style={styles.penaltyView}>
          <Text style={{...styles.smallTxt, color: Colors.darkgrey}}>
            #XX - T/P - XX:XX
          </Text>
        </View>
      </View>

      <View style={{...styles.rowTxT, width: Dim.w * 0.82}}>
        <View style={styles.penaltyView}>
          <Text style={{...styles.smallTxt, color: Colors.darkgrey}}>
            #XX - T/P - XX:XX
          </Text>
        </View>
        <View style={styles.penaltyView}>
          <Text style={{...styles.smallTxt, color: Colors.darkgrey}}>
            #XX - T/P - XX:XX
          </Text>
        </View>
      </View>

      <PenaltyOverlay
        isVisible={penaltyVisible}
        onBackdropPress={() => togglePenalty(false)}
        navigation={props.navigation}
        players={teamA.players}
        team={teamA?.teamName}
        isTeamA={true}
      />

      <PenaltyOverlay
        isVisible={penaltyVisible2}
        onBackdropPress={() => togglePenalty2(false)}
        navigation={props.navigation}
        players={teamB.players}
        team={teamB?.teamName}
        isTeamB={true}
      />
    </View>
  );
};

export default PenaltyComponent;

const styles = StyleSheet.create({
  rowTxT: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dim.w * 0.85,
    justifyContent: 'space-between',
  },
  goalTxt: {
    fontSize: 25,
    fontFamily: Fonts.heading,
    color: Colors.white,
    lineHeight: 30,
  },
  smallTxt: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: Fonts.heading,
  },
  penaltyBtn: {
    backgroundColor: Colors.btnRed,
    width: Dim.w * 0.4,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  penaltyView: {
    width: Dim.w * 0.37,
    backgroundColor: Colors.whiteO,
    borderRadius: 20,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.grey,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
