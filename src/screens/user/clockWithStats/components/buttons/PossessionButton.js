import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';
import {useDispatch} from 'react-redux';
// import BackgroundTimer from 'react-native-background-timer';

const PossessionButton = props => {
  const dispatch = useDispatch();
  const {durationTime, gameTime, clockIsRunning, possessionTime} = props;
  const [teamApossTime, setTeamApossTime] = useState(0);
  const [teamBpossTime, setTeamBpossTime] = useState(0);

  useEffect(() => {
    if (!props.countdownIsOpen) {
      if (props.possessingTeam === 'teamA') {
        setTeamApossTime(secs => {
          return secs + 1;
        });
      }
      if (props.possessingTeam === 'teamB') {
        setTeamBpossTime(secs => {
          return secs + 1;
        });
      }
    }
  }, [gameTime]);

  const handleGenerate = team => {
    if (team === 'teamA') {
      props.setPossessingTeam(prevState => {
        if (prevState === 'teamA') {
          return null;
        } else {
          return team;
        }
      });
    }
    if (team === 'teamB') {
      props.setPossessingTeam(prevState => {
        if (prevState === 'teamB') {
          return null;
        } else {
          return team;
        }
      });
    }
  };

  useEffect(() => {
    let prevPossessionTeam = null;
    if (prevPossessionTeam === null && props.possessingTeam) {
      dispatch({
        type: 'BALL_POSSESSION',
        payload: {
          type: 'possession',
          team: props.possessingTeam,
          clockTime:
            `${possessionTime().displayMins}:${possessionTime().displaySecs}` +
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
          statement: `Ball possessed`,
        },
      });
      prevPossessionTeam = props.possessingTeam;
    }
    if (props.possessingTeam !== prevPossessionTeam && props.possessingTeam) {
      dispatch({
        type: 'BALL_POSSESSION',
        payload: {
          type: 'possession',
          team: props.possessingTeam,
          clockTime:
            `${possessionTime().displayMins}:${possessionTime().displaySecs}` +
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
          statement: `Ball possessed`,
        },
      });
      prevPossessionTeam = props.possessingTeam;
    }
  }, [props.possessingTeam]);

  return (
    <View style={styles.rowTxT}>
      {/* Team A */}
      <View style={styles.row}>
        <TouchableOpacity
          disabled={!clockIsRunning}
          onPress={() => handleGenerate('teamA')}
          style={{
            ...styles.possessionBtn,
            backgroundColor:
              props.possessingTeam === 'teamA'
                ? Colors.btnRed
                : Colors.btnGreen,
          }}>
          <Text style={styles.btnTxt}>POSSESSION</Text>
        </TouchableOpacity>
        <Text style={{...styles.smallTxt, marginLeft: 5}}>
          {Math.floor(teamApossTime / 60)} : {teamApossTime % 60}
        </Text>
      </View>
      {/* <View style={styles.line} /> */}
      {/* Team B */}
      <View style={styles.row}>
        <Text style={{...styles.smallTxt, marginRight: 5}}>
          {Math.floor(teamBpossTime / 60)} : {teamBpossTime % 60}
        </Text>
        <TouchableOpacity
          disabled={!clockIsRunning}
          onPress={() => handleGenerate('teamB')}
          style={{
            ...styles.possessionBtn,
            backgroundColor:
              props.possessingTeam === 'teamB'
                ? Colors.btnRed
                : Colors.btnGreen,
          }}>
          <Text style={styles.btnTxt}>POSSESSION</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PossessionButton;

const styles = StyleSheet.create({
  rowTxT: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dim.w * 0.85,
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  possessionBtn: {
    borderRadius: 20,
    backgroundColor: Colors.btnGreen,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  smallTxt: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: Fonts.heading,
  },
  btnTxt: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: Fonts.heading,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  line: {
    height: 20,
    width: 1.5,
    backgroundColor: Colors.whiteclock,
  },
});
