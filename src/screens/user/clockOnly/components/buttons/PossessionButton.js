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
  const [possessingTeam, setPossessingTeam] = useState(null);

  useEffect(() => {
    if (possessingTeam === 'teamA') {
      setTeamApossTime(secs => {
        return secs + 1;
      });
    }
    if (possessingTeam === 'teamB') {
      setTeamBpossTime(secs => {
        return secs + 1;
      });
    }
  }, [gameTime]);

  const handleGenerate = team => {
    if (team === 'teamA') {
      setPossessingTeam(prevState => {
        if (prevState === 'teamA') {
          return null;
        } else {
          return team;
        }
      });
    }
    if (team === 'teamB') {
      setPossessingTeam(prevState => {
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
    if (prevPossessionTeam === null && possessingTeam) {
      dispatch({
        type: 'BALL_POSSESSION',
        payload: {
          team: possessingTeam,
          statement: `Ball is possessed at ${possessionTime().displayMins}:${
            possessionTime().displaySecs
          }`,
        },
      });
      prevPossessionTeam = possessingTeam;
    }
    if (possessingTeam !== prevPossessionTeam && possessingTeam) {
      dispatch({
        type: 'BALL_POSSESSION',
        payload: {
          team: possessingTeam,
          statement: `Ball is possessed at ${possessionTime().displayMins}:${
            possessionTime().displaySecs
          }`,
        },
      });
      prevPossessionTeam = possessingTeam;
    }
  }, [possessingTeam]);

  return (
    <View style={styles.rowTxT}>
      {/* Team A */}
      <View style={styles.row}>
        <View style={styles.row}>
          <TouchableOpacity
            disabled={!clockIsRunning}
            onPress={() => handleGenerate('teamA')}
            style={{
              ...styles.possessionBtn,
              backgroundColor:
                possessingTeam === 'teamA' ? Colors.btnRed : Colors.btnGreen,
            }}>
            <Text style={styles.btnTxt}>POSSESSION</Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.smallTxt}>TIME OF</Text>
            <Text style={styles.smallTxt}>
              {Math.floor(teamApossTime / 60)} : {teamApossTime % 60}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.line} />
      {/* Team B */}
      <View style={styles.row}>
        <View style={styles.row}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.smallTxt}>TIME OF</Text>
            <Text style={styles.smallTxt}>
              {Math.floor(teamBpossTime / 60)} : {teamBpossTime % 60}
            </Text>
          </View>
          <TouchableOpacity
            disabled={!clockIsRunning}
            onPress={() => handleGenerate('teamB')}
            style={{
              ...styles.possessionBtn,
              backgroundColor:
                possessingTeam === 'teamB' ? Colors.btnRed : Colors.btnGreen,
            }}>
            <Text style={styles.btnTxt}>POSSESSION</Text>
          </TouchableOpacity>
        </View>
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
    marginVertical: 5,
  },
  possessionBtn: {
    borderRadius: 20,
    backgroundColor: Colors.btnGreen,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    // marginRight: 5,
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
    lineHeight: 18,
    color: Colors.white,
    fontFamily: Fonts.heading,
    marginLeft: Dim.w * 0.01,
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
    height: 40,
    width: 1.5,
    backgroundColor: Colors.whiteclock,
  },
});
