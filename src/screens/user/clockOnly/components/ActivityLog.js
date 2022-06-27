import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Dim, Colors} from '../../../../constants/Theme';
import {Fonts} from '../../../../constants/fonts';
import {useSelector, useDispatch} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

const ActivityLog = props => {
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
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {activityState &&
          activityState.length > 0 &&
          activityState.map((v, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  width: Dim.w * 0.74,
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
                    size={18}
                    color={Colors.red}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};
export default ActivityLog;

const styles = StyleSheet.create({
  container: {
    width: Dim.w * 0.8,
    height: Dim.h * 0.15,
    backgroundColor: Colors.whiteclock,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.white,
    borderWidth: 1,
    marginBottom: 5,
    paddingVertical: 5,
  },
  txt: {
    color: Colors.white,
    fontFamily: Fonts.light,
    width: Dim.w * 0.74 - 18,
    lineHeight: 14,
  },
});
