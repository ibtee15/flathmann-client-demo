import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Dim, Colors} from '../../../../../constants/Theme';
import {Fonts} from '../../../../../constants/fonts';
import {useSelector, useDispatch} from 'react-redux';
import Shot20secModal from '../overlays/Shot20sec';

const ShotClockCard = props => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const resetClock = () => {
    props.setShotClockTime(80);
  };

  const lost20secondsRound = () => {
    setIsVisible(!isVisible);
    resetClock();
    props.setPossessingTeam(prev => {
      if (prev === 'teamA') {
        return 'teamB';
      } else if (prev === 'teamB') {
        return 'teamA';
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    if (!props.countdownIsOpen) {
      if (props.possessingTeam) {
        props.setShotClockTime(secs => {
          return secs - 1;
        });
      }
    }
  }, [props.gameTime]);

  useEffect(() => {
    if (props.shotClockTime === 0) {
      resetClock();
      props.setPossessingTeam(prev => {
        if (prev === 'teamA') {
          return 'teamB';
        } else if (prev === 'teamB') {
          return 'teamA';
        } else {
          return;
        }
      });
    }
    if (props.shotClockTime === 60) {
      toggleModal();
    }
  }, [props.shotClockTime]);

  useEffect(() => {
    if (props.possessingTeam) {
      resetClock();
    }
  }, [props.possessingTeam]);

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.txt2}>SHOT CLOCK</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -5}}>
        <Text style={styles.txt}>
          {Math.floor(props.shotClockTime / 60)} : {props.shotClockTime % 60}
        </Text>
      </View>
      <Shot20secModal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(!isVisible);
        }}
        handlePressNo={lost20secondsRound}
      />
    </View>
  );
};

export default ShotClockCard;

const styles = StyleSheet.create({
  txt: {
    fontSize: 25,
    fontFamily: Fonts.heading,
    color: Colors.goldenBrown,
    // lineHeight: 25,
    marginHorizontal: 10,
  },
  txt2: {
    fontSize: 15,
    fontFamily: Fonts.heading,
    color: Colors.white,
    lineHeight: 15,
  },
  btn: {
    height: 20,
    width: 20,
    borderRadius: 100,
    backgroundColor: Colors.red,
  },
});
