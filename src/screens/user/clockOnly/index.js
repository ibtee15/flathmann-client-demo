import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Sound from 'react-native-sound';
import {playHorn} from '../../../services/clock.services';
import {tenSecsF} from '../../../services/clock.services';
import {tenSecsM} from '../../../services/clock.services';
import {twoMinF} from '../../../services/clock.services';
import {twoMinM} from '../../../services/clock.services';

import EndGameOverlay from '../../../components/ClockComponents/EndGameOverlay';
import CountdownTimerOverlay from './timers/CountDownTimer';
import MainClock from './timers/MainClock';
import PenaltyComponent from './components/PenaltyComponent';
import ActivityLog from './components/ActivityLog';

import PossessionButtons from './components/buttons/PossessionButton';
import NewPeriodButton from './components/buttons/NewPeriodButton';
import GoalButton from './components/buttons/GoalButton';
import TimeoutButton from './components/buttons/TimeoutButton';

const ClockWithStats = props => {
  const dispatch = useDispatch();

  const clockRef = useRef();
  const [timeOn, setTimeOn] = useState(false);
  const [startClock, setStartClock] = useState(false);

  const [endGame, setEndGame] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [currentGameTime, setCurrentGameTime] = useState(null);
  const [mainClockIsHide, setMainClockIsHide] = useState(false);
  const [clockIsRunning, setClockIsRunning] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState({
    isVisible: false,
    heading: 'Countdown timer',
    duration: 0,
  });

  const [hornIsPlaying, sethornIsPlaying] = useState(false);
  Sound.setCategory('Playback');
  const [tenFemalePlaying, setTenFemaleIsPlaying] = useState(false);
  Sound.setCategory('Playback');
  const [tenMalePlaying, setTenMaleIsPlaying] = useState(false);
  Sound.setCategory('Playback');
  const [twoFemalePlaying, setTwoFemaleIsPlaying] = useState(false);
  Sound.setCategory('Playback');
  const [twoMalePlaying, setTwoMaleIsPlaying] = useState(false);
  Sound.setCategory('Playback');

  const handlePlayHorn = () => {
    playHorn(hornIsPlaying, sethornIsPlaying);
  };
  const handle10secF = () => {
    tenSecsF(tenFemalePlaying, setTenFemaleIsPlaying);
  };
  const handle10secM = () => {
    tenSecsM(tenMalePlaying, setTenMaleIsPlaying);
  };
  const handle2minsF = () => {
    twoMinF(twoFemalePlaying, setTwoFemaleIsPlaying);
  };
  const handle2minsM = () => {
    twoMinM(twoMalePlaying, setTwoMaleIsPlaying);
  };
  const handleStartBtn = () => {
    handlePlayHorn();
    setTimeOn(current => !current);
    setStartClock(!startClock);
  };
  const toggleEndGame = () => {
    setEndGame(!endGame);
  };

  const teamA = useSelector(state => state.clockStatsReducer.teamA);
  const teamB = useSelector(state => state.clockStatsReducer.teamB);
  const general = useSelector(state => state.clockStatsReducer.general);
  const rules = useSelector(state => state.clockStatsReducer.rules);
  const clockSetting = useSelector(
    state => state.clockStatsReducer.clockSetting,
  );

  // useEffect(() => {
  //   console.log('teamA FOUND XXX', teamA);
  //   console.log('teamB FOUND XXX', teamB);
  //   console.log('general FOUND XXX', general);
  //   console.log('rules FOUND XXX', rules);
  //   console.log('clockSetting FOUND XXX', clockSetting);
  // }, []);

  let durationTime = rules.gamePeriods * rules.periodDuration * 60; // game duration in secs

  useEffect(() => {
    // For current period
    if (Number(rules.gamePeriods) === 4) {
      if (Math.floor(durationTime) == currentGameTime) {
        setCurrentPeriod(0);
      }
      if (Math.floor(durationTime - 1) == currentGameTime) {
        setCurrentPeriod(currentPeriod + 1);
      }
      if (Math.floor((durationTime * 3) / 4 - 1) == currentGameTime) {
        setCurrentPeriod(currentPeriod + 1);
      }
      if (Math.floor(durationTime / 2 - 1) == currentGameTime) {
        setCurrentPeriod(currentPeriod + 1);
      }
      if (Math.floor(durationTime / 4 - 1) == currentGameTime) {
        setCurrentPeriod(currentPeriod + 1);
      }
    }
    if (Number(rules.gamePeriods) === 2) {
      // console.log('Coming into condition 1');
      if (Math.floor(durationTime) == currentGameTime) {
        setCurrentPeriod(0);
      }
      if (Math.floor(durationTime - 1) == currentGameTime) {
        setCurrentPeriod(currentPeriod + 1);
      }
      if (Math.floor(durationTime / 2 - 1) == currentGameTime) {
        setCurrentPeriod(currentPeriod + 1);
      }
    }

    if (currentGameTime === 0) {
      clockRef.current.refStopClock();
    }
    // When only four game periods match
    if (Number(rules.gamePeriods) === 4) {
      if (Math.floor(durationTime / 4) === currentGameTime) {
        clockRef.current.refStopClock();
        handleStartBtn();
      }
      if (Math.floor(durationTime / 2) === currentGameTime) {
        clockRef.current.refStopClock();
        setCountdownTimer({
          isVisible: true,
          heading: 'Game half time',
          duration: rules.gapBetweenHalves,
        });
        handleStartBtn();
      }
      if (Math.floor((durationTime * 3) / 4) === currentGameTime) {
        clockRef.current.refStopClock();
        handleStartBtn();
      }
    }
    // When only two game periods match
    if (Number(rules.gamePeriods) === 2) {
      if (Math.floor(durationTime / 2) === currentGameTime) {
        clockRef.current.refStopClock();
        handleStartBtn();
      }
    }

    // XXXXXXXXXXXXXXXXXX
    if (clockSetting.enableSound) {
      if (clockSetting.warning && currentGameTime === 119) {
        if (clockSetting.isMaleVoice == true) {
          handle2minsM();
        } else {
          handle2minsF();
        }
      }

      if (clockSetting.countDownLastSeconds && currentGameTime === 10) {
        if (clockSetting.isMaleVoice == true) {
          handle10secM();
        } else {
          handle10secF();
        }
      }
    }
    // XXXXXXXXXXXXXXXXXXXX

    // When clock ends time to zero
    if (currentGameTime === 0) {
      handleStartBtn();
    }
    // console.log('YE ARHA H ***********', currentGameTime);
  }, [currentGameTime]);

  const clockify = () => {
    let mins = Math.floor(currentGameTime / 60);
    let secs = currentGameTime % 60;

    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = secs < 10 ? `0${secs}` : secs;

    return {displayMins, displaySecs};
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={Colors.darkBlue} />

      <ImageBackground
        style={styles.container}
        source={require('../../../assets/images/player.png')}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
          }}>
          {/* <ScrollView> */}
          <View style={styles.whiteView}>
            {/* <Image
              source={require('../../../assets/images/laxHeader.png')}
              style={styles.header}
            /> */}

            <View style={styles.xxView}>
              <ImageBackground
                source={require('../../../assets/icons/whiteGroup.png')}
                style={{width: 30, height: 30}}
              />
              <Text style={styles.homeTxt}>
                {general.homeTeam === teamA?.teamName ? 'HOME' : 'VISITOR'}
              </Text>
              <MainClock
                // gameTime={gameTime}
                ref={clockRef}
                teamA={teamA}
                teamB={teamB}
                timeOn={timeOn}
                rules={rules}
                mainClockIsHide={mainClockIsHide}
                setClockIsRunning={setClockIsRunning}
                handleStartBtn={handleStartBtn}
                currentGameTime={currentGameTime}
                setCurrentGameTime={setCurrentGameTime}
              />
              <Text style={styles.homeTxt}>
                {general.homeTeam === teamB.teamName ? 'HOME' : 'VISITOR'}
              </Text>
              <ImageBackground
                source={require('../../../assets/icons/whiteGroup.png')}
                style={{width: 30, height: 30}}
              />
            </View>

            <View style={{...styles.rowTxT, width: Dim.w * 0.8}}>
              <View>
                <Text style={styles.whiteTxt20}>
                  {teamA ? teamA.teamName.toUpperCase() : 'XX'}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.whiteTxt20}>
                  {teamB ? teamB.teamName.toUpperCase() : 'XX'}
                </Text>
              </View>
            </View>

            <View
              style={{
                ...styles.rowTxT,
                marginBottom: 5,
                width: Dim.w * 0.8,
              }}>
              <View style={styles.goalView}>
                <Text style={styles.goalTxt}>
                  {teamA?.goals ? teamA?.goals : 'XX'}
                </Text>
              </View>
              <Text style={styles.TOLtxt}>
                PERIOD
                <Text style={{...styles.TOLtxt, color: Colors.goldenBrown}}>
                  {' '}
                  {currentPeriod}
                </Text>
              </Text>
              <View style={styles.goalView}>
                <Text style={styles.goalTxt}>
                  {teamB?.goals ? teamB?.goals : 'XX'}
                </Text>
              </View>
            </View>

            <View style={styles.rowTxT}>
              <GoalButton clockIsRunning={clockIsRunning} team="teamA" />
              <TouchableOpacity
                onPress={handleStartBtn}
                disabled={currentGameTime === 0}
                style={{
                  ...styles.startBtn,
                  backgroundColor:
                    currentGameTime === 0
                      ? 'rgba(255,255,255,0.3)'
                      : startClock
                      ? Colors.btnRed
                      : Colors.btnGreen,
                }}>
                <Text style={styles.startBtnTxt}>
                  {startClock ? 'STOP CLOCK' : 'START CLOCK'}
                </Text>
              </TouchableOpacity>

              <GoalButton clockIsRunning={clockIsRunning} team="teamB" />
            </View>

            <PossessionButtons
              // startMainClock={() => clockRef.current.refStartClock()}
              clockIsRunning={clockIsRunning}
              gameTime={currentGameTime}
              durationTime={durationTime}
              teamA={teamA?.teamName}
              teamB={teamA?.teamName}
              possessionTime={clockify}
            />

            <PenaltyComponent />

            <View style={{...styles.rowTxT, marginBottom: 5}}>
              <TimeoutButton
                teamA={teamA?.teamName}
                teamB={teamB?.teamName}
                gameTime={currentGameTime}
                durationTime={durationTime}
                incrementPeriod={() =>
                  setCurrentPeriod(prev => {
                    return prev + 1;
                  })
                }
                stopMainClock={() => clockRef.current.refStopClock()}
                setCountdownTimer={headingTxt => {
                  setCountdownTimer({
                    isVisible: true,
                    heading: headingTxt,
                    duration: rules.timeoutDuration,
                  });
                }}
              />
              <TouchableOpacity onPress={handlePlayHorn} style={styles.hornBtn}>
                <MaterialCommunityIcons
                  name="air-horn"
                  size={30}
                  color={Colors.white}
                />
              </TouchableOpacity>
              <NewPeriodButton
                gameTime={currentGameTime}
                durationTime={durationTime}
                stopMainClock={() => clockRef.current.refStopClock()}
                clockIsRunning={clockIsRunning}
                incrementPeriod={() =>
                  setCurrentPeriod(prev => {
                    return prev + 1;
                  })
                }
                setCountdownTimer={headingTxt => {
                  handleStartBtn();
                  setCountdownTimer({
                    isVisible: true,
                    heading: headingTxt,
                    duration: rules.gapBetweenPeriods,
                  });
                }}
              />
            </View>

            <ActivityLog />

            <View style={styles.foulBtnsRow}>
              <TouchableOpacity
                onPress={toggleEndGame}
                style={styles.faceOffBtn}>
                <Text style={styles.goalTxt}>END GAME</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.faceOffBtn}>
                <Text style={styles.goalTxt}>SUSPEND GAME</Text>
              </TouchableOpacity>
            </View>

            <EndGameOverlay
              isVisible={endGame}
              onBackdropPress={() => toggleEndGame(false)}
              navigation={props.navigation}
            />
            <CountdownTimerOverlay
              gameTime={currentGameTime}
              setGameTime={setCurrentGameTime}
              setCurrentPeriod={setCurrentPeriod}
              clockIsRunning={clockIsRunning}
              countdownTimer={countdownTimer}
              mainClockIsHide={mainClockIsHide}
              setMainClockIsHide={setMainClockIsHide}
              startMainClock={() => clockRef.current.refStartClock()}
              closeCountdown={() =>
                setCountdownTimer({
                  isVisible: false,
                  heading: 'Countdown timer',
                  duration: 0,
                })
              }
            />
          </View>
          {/* </ScrollView> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ClockWithStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  whiteView: {
    backgroundColor: Colors.whiteclock,
    width: Dim.w * 0.9,
    alignSelf: 'center',
    zIndex: 1,
    borderRadius: 35,
    paddingVertical: 10,
    // marginTop: Dim.w * 0.05,
  },
  header: {
    width: Dim.w,
    height: Dim.w * 0.45,
    marginLeft: -Dim.w * 0.05,
    top: -Dim.w * 0.05,
    zIndex: -1000,
    position: 'absolute',
    opacity: 0.25,
  },
  xxView: {
    alignItems: 'center',
    width: Dim.w * 0.8,
    alignSelf: 'center',
    // marginBottom: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 5,
  },

  rowTxT: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dim.w * 0.85,
    justifyContent: 'space-between',
  },
  homeTxt: {
    fontSize: 20,
    color: Colors.goldenBrown,
    fontFamily: Fonts.heading,
    // lineHeight: 16,
  },
  whiteTxt: {
    fontSize: Dim.w * 0.05,
    color: Colors.white,
    fontFamily: Fonts.heading,
  },
  goalView: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 2,
    marginTop: 3,
    backgroundColor: Colors.whiteclock,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteTxt20: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: Fonts.heading,
  },
  TOLtxt: {
    fontSize: 30,
    color: Colors.white,
    fontFamily: Fonts.heading,
    // marginBottom: 10,
  },
  periodView: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 5,
    // marginTop: -Dim.w * 0.12,
    marginTop: -Dim.w * 0.08,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  startBtn: {
    width: Dim.w * 0.35,
    height: 45,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: Colors.btnGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnTxt: {
    fontSize: 25,
    fontFamily: Fonts.heading,
    color: Colors.white,
    textAlign: 'center',
  },
  goalTxt: {
    fontSize: 25,
    fontFamily: Fonts.heading,
    color: Colors.white,
    lineHeight: 30,
  },
  // penaltyBtn: {
  //   backgroundColor: Colors.btnRed,
  //   width: Dim.w * 0.4,
  //   height: 40,
  //   borderRadius: 20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // penaltyView: {
  //   width: Dim.w * 0.37,
  //   backgroundColor: Colors.whiteO,
  //   borderRadius: 20,
  //   height: 40,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderWidth: 1.5,
  //   borderColor: Colors.grey,
  //   marginTop: 5,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,

  //   elevation: 5,
  // },
  smallTxt: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: Fonts.heading,
  },
  hornBtn: {
    width: 55,
    height: 55,
    alignSelf: 'center',
    backgroundColor: Colors.btnRed,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.whiteclock,
  },
  foulBtnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dim.w * 0.85,
    justifyContent: 'space-between',
  },
  timeoutBtn: {
    width: Dim.w * 0.32,
    height: 45,
    backgroundColor: Colors.btnGreen,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceOffBtn: {
    width: Dim.w * 0.41,
    height: 35,
    alignSelf: 'center',
    backgroundColor: Colors.btnRed,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.whiteclock,
  },
});
