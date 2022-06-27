import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Dim, Colors} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';

import Sound from 'react-native-sound';
import {ReleaseM} from '../../../../../services/clock.services';
import {ReleaseF} from '../../../../../services/clock.services';

const PenaltyCard = props => {
  const dispatch = useDispatch();

  const clockSetting = useSelector(
    state => state.clockStatsReducer.clockSetting,
  );

  const [penaltyTime, setPenaltyTime] = useState(null);
  const [releaseMPlaying, setReleaseMalePlaying] = useState(false);
  Sound.setCategory('Playback');
  const [releaseFPlaying, setReleaseFPlaying] = useState(false);
  Sound.setCategory('Playback');

  const handleReleaseM = () => {
    ReleaseM(releaseMPlaying, setReleaseMalePlaying);
  };
  const handleReleaseF = () => {
    ReleaseF(releaseFPlaying, setReleaseFPlaying);
  };

  useEffect(() => {
    if (penaltyTime === null) {
      setPenaltyTime(props.value.time * 60);
    }
  }, []);
  useEffect(() => {
    if (
      clockSetting.enableSound &&
      clockSetting.announceRelease &&
      props.value.releasable &&
      penaltyTime === 0
    ) {
      if (clockSetting.isMaleVoice == true) {
        handleReleaseM();
      } else {
        handleReleaseF();
      }
    }
    // console.log(' penaltyTime ******', penaltyTime);
  }, [penaltyTime]);

  // console.log('game TIMEEEEE', props.gameTime);

  React.useMemo(() => {
    if (!props.countdownIsOpen && penaltyTime > 0) {
      // console.log('penaltyTime => ', penaltyTime);
      setPenaltyTime(prev => {
        return prev - 1;
      });
    }
  }, [props.gameTime]);

  if (props.dropDownVisible) {
    return (
      <View style={styles.view}>
        <Text style={styles.smallTxt}>
          #{props.value.jersey} - {props.value.code}
          {props.value.type === 'Technical'
            ? '[T] - '
            : props.value.type === 'Personal'
            ? '[P] - '
            : props.value.type === 'FOV'
            ? ' - '
            : ''}
          <Text
            style={{
              ...styles.smallTxt,
              color: penaltyTime < 11 ? Colors.red : Colors.darkgrey,
            }}>
            {`${Math.floor(penaltyTime / 60)}:${Math.floor(penaltyTime % 60)}`}
          </Text>
        </Text>
        {/* <TouchableOpacity style={{marginLeft: 5}}>
          <Entypo name="cross" size={18} color={Colors.red} />
        </TouchableOpacity> */}
      </View>
    );
  } else {
    return <View style={{height: 0, backgroundColor: 'red'}} />;
  }
};

export default PenaltyCard;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallTxt: {
    fontSize: 15,
    color: Colors.darkgrey,
    fontFamily: Fonts.heading,
  },
});
