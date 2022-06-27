import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors, Dim} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';
import {Overlay} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  REMOVE_TEAM_A_PENALTY,
  REMOVE_TEAM_B_PENALTY,
  TEAM_A_SHOT,
} from '../../../../../redux/actions/clockStats.actions';
import {TEAM_B_SHOT} from '../../../../../redux/actions/clockStats.actions';
import {TEAM_A_TIMEOUT} from '../../../../../redux/actions/clockStats.actions';
import {TEAM_B_TIMEOUT} from '../../../../../redux/actions/clockStats.actions';
import {TEAM_A_PENALTY} from '../../../../../redux/actions/clockStats.actions';
import {TEAM_B_PENALTY} from '../../../../../redux/actions/clockStats.actions';

const ActivityLogOverlay = props => {
  const dispatch = useDispatch();
  const [activityState, setActivityState] = useState(null);
  let activityLog = useSelector(state => state.clockStatsReducer.activityLog);
  const teamA = useSelector(state => state.clockStatsReducer.teamA);
  const teamB = useSelector(state => state.clockStatsReducer.teamB);

  useEffect(() => {
    setActivityState(activityLog);
  }, [activityLog]);

  const deleteALog = idx => {
    let newActivityLog = activityLog;

    // console.log('********************TEAM-A*************************8');
    // console.log('TeamName: => ', teamA.teamName);
    // console.log('Log teamA name: => ', activityLog[idx]);
    // console.log('Goals teamA: => ', teamA.goals);
    // console.log('LOg teamA statement: => ', activityLog[idx].statement);

    // console.log('*****************TEAM-B****************************8');
    // console.log('TeamName: => ', teamB.teamName);
    // console.log('Log teamB name: => ', activityLog[idx]);
    // console.log('Goals teamB: => ', teamB.goals);
    // console.log('LOg teamB statement: => ', activityLog[idx].statement);
    // return;
    if (
      activityLog[idx].statement === 'Goal' ||
      activityLog[idx].statement === 'Assist'
    ) {
      if (
        (activityLog[idx].team === 'teamA' ||
          activityLog[idx].team === teamA.teamName) &&
        teamA.goals &&
        Number(teamA.goals) > 0
      ) {
        console.log(teamA.goals);
        dispatch({
          type: TEAM_A_SHOT,
          payload: teamA.goals - 1,
        });
      }
      if (
        (activityLog[idx].team === 'teamB' ||
          activityLog[idx].team === teamB.teamName) &&
        teamB.goals &&
        Number(teamB.goals) > 0
      ) {
        dispatch({
          type: TEAM_B_SHOT,
          payload: teamB.goals - 1,
        });
      }
    }

    if (activityLog[idx].statement === 'Timeout') {
      if (
        (activityLog[idx].team === 'teamA' ||
          activityLog[idx].team === teamA.teamName) &&
        teamA.timeoutsLeft &&
        Number(teamA.timeoutsLeft) > 0
      ) {
        // console.log(teamA.timeoutsLeft);
        dispatch({
          type: TEAM_A_TIMEOUT,
          payload: teamA.timeoutsLeft + 1,
        });
      }
      if (
        (activityLog[idx].team === 'teamB' ||
          activityLog[idx].team === teamB.timeoutsLeft) &&
        teamB.timeoutsLeft &&
        Number(teamB.timeoutsLeft) > 0
      ) {
        dispatch({
          type: TEAM_B_TIMEOUT,
          payload: teamB.timeoutsLeft + 1,
        });
      }
    }

    // Penalities delete
    if (activityLog[idx].statement === 'Penalty') {
      if (
        (activityLog[idx].team === 'teamA' ||
          activityLog[idx].team === teamA.teamName) &&
        teamA.penalties &&
        teamA.penalties.length > 0
      ) {
        console.log('Coming to delete penalty of A');
        let currPenalties = teamA.penalties;
        let penaltyToRemove = activityLog[idx];
        let idxOfTargetPenalty = -1;
        currPenalties.map((v, i) => {
          if (v.clockTime === penaltyToRemove.clockTime) {
            console.log('Match found betwn penalties to delete teamA');
            idxOfTargetPenalty = i;
          }
        });
        if (idxOfTargetPenalty > -1) {
          currPenalties.splice(idx, 1);
          dispatch({
            type: REMOVE_TEAM_A_PENALTY,
            payload: currPenalties,
          });
        }
      }
      console.log('==> Team ', activityLog[idx].team);
      console.log('==> TeamB Penalties ', teamB.penalties.length);

      if (
        (activityLog[idx].team === 'teamB' ||
          activityLog[idx].team === teamB.teamName) &&
        teamB.penalties &&
        teamB.penalties.length > 0
      ) {
        console.log('Coming to delete penalty of B');

        let currPenalties = teamB.penalties;
        let penaltyToRemove = activityLog[idx];
        let idxOfTargetPenalty = -1;
        currPenalties.map((v, i) => {
          if (v.clockTime === penaltyToRemove.clockTime) {
            console.log('Match found betwn penalties to delete teamB');
            idxOfTargetPenalty = i;
          }
        });
        if (idxOfTargetPenalty > -1) {
          currPenalties.splice(idx, 1);
          dispatch({
            type: REMOVE_TEAM_B_PENALTY,
            payload: currPenalties,
          });
        }
      }
    }

    props.closeThenOpen();
    const deletedLog = newActivityLog.splice(idx, 1);
    // dispatch({type: 'SAVE_ACTIVITY_LOG', payload: newActivityLog});
    console.log('newLog ==>> ', newActivityLog);
    // console.log('Old atiity log', activityLog);
  };

  // console.log('team A PENALTIES ', teamA.penalties.length);
  // console.log('team B PENALTIES ', teamB.penalties.length);

  return (
    <Overlay
      overlayStyle={styles.overlayStyle}
      onBackdropPress={props.onBackdropPress}
      visible={props.visible}>
      <Text style={styles.logTxt}>Game Activity Log</Text>
      <ScrollView
      //   showsVerticalScrollIndicator={false}
      >
        {activityState &&
          activityState.length > 0 &&
          activityState.map((v, i) => {
            return (
              <View style={styles.row}>
                <Text style={styles.txt}>
                  {i + 1 + '. '}
                  {v?.team ? `${v.team} -` : ''}
                  {v?.clockTime ? ` ${v.clockTime} -` : ''}
                  <Text style={{color: Colors.red}}>
                    {v?.statement ? ` ${v.statement}` : ''}
                  </Text>
                  {v?.player ? ` #${v.jersey} ${v.player}` : ''}
                  <Text style={{color: Colors.red}}>
                    {v?.otherTxt ? ` ${v.otherTxt}` : ''}
                  </Text>
                </Text>
                <TouchableOpacity onPress={() => deleteALog(i)}>
                  <Entypo
                    name="circle-with-cross"
                    size={20}
                    color={Colors.red}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </Overlay>
  );
};
export default ActivityLogOverlay;

const styles = StyleSheet.create({
  overlayStyle: {
    width: Dim.w * 0.9,
    height: Dim.h * 0.6,
    // backgroundColor: Colors.white,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10,
    paddingVertical: 15,
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: Colors.btnRed,
  },
  logTxt: {
    fontSize: 30,
    color: Colors.btnRed,
    fontFamily: Fonts.heading,
    marginBottom: 15,
    alignSelf: 'center',
  },
  txt: {
    color: Colors.green,
    fontFamily: Fonts.medium,
    width: Dim.w * 0.8 - 25,
  },
  row: {
    flexDirection: 'row',
    // width: Dim.w * 0.8,
    justifyContent: 'space-between',
    alignSelf: 'center',
    overflow: 'hidden',
  },
});
