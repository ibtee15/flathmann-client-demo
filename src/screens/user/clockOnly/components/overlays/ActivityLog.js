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

const ActivityLogOverlay = props => {
  const dispatch = useDispatch();
  const [activityState, setActivityState] = useState(null);
  let activityLog = useSelector(state => state.clockStatsReducer.activityLog);

  useEffect(() => {
    setActivityState(activityLog);
  }, [activityLog]);

  const deleteALog = idx => {
    let newActivityLog = activityLog;
    // console.log('Old atiity log', activityLog);
    const deletedLog = newActivityLog.splice(idx, 1);
    // console.log('newLog ==>> ', newActivityLog);
    dispatch({type: 'SAVE_ACTIVITY_LOG', payload: newActivityLog});
    props.closeThenOpen();
  };

  return (
    <Overlay
      overlayStyle={styles.logInput}
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
              <View
                style={{
                  flexDirection: 'row',
                  width: Dim.w * 0.69,
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  overflow: 'hidden',
                }}>
                <Text style={styles.txt}>
                  {i + 1 + '. '}
                  {v?.team ? `${v.team} - ` : ''}
                  {v?.player ? `#${v.jersey} ${v.player} - ` : ''}
                  {v?.statement ? `${v.statement.toLowerCase()}` : ''}
                </Text>
                <TouchableOpacity onPress={() => deleteALog(i)}>
                  <Entypo
                    name="circle-with-cross"
                    size={23}
                    color={Colors.errorRed}
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
  logInput: {
    width: Dim.w * 0.85,
    height: Dim.h * 0.5,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 15,
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 5,
    borderColor: Colors.btnGreen,
    paddingVertical: 15,
  },
  logTxt: {
    fontSize: 30,
    color: Colors.btnGreen,
    fontFamily: Fonts.heading,
    marginBottom: 15,
    alignSelf: 'center',
  },
  txt: {
    fontSize: 16,
    color: Colors.red,
    fontFamily: Fonts.medium,
    width: Dim.w * 0.68 - 23,
    // fontFamily: Fonts.heading,
  },
});
