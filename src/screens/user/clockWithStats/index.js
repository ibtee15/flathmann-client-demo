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
import CountdownTimerOverlay from './components/overlays/CountdownTimer';
import ActivityLogOverlay from './components/overlays/ActivityLog';
import MainClock from './components/MainClock';
import PenaltyComponent from './components/PenaltyComponent';
import ShotTimeoutComp from './components/ShotTimeoutComponent';

import GroundballButton from './components/buttons/GroundballButton';
import CausedTurnoverButton from './components/buttons/CausedTurnoverButton';
import TakeawayButton from './components/buttons/TakeawayButton';
import TurnoverButton from './components/buttons/TurnoverButton';
import ClearButtons from './components/overlays/ClearButtons';
import PlayerSubstitutionButton from './components/buttons/PlayerSubstitutionButton';
import PossessionButtons from './components/buttons/PossessionButton';
import NewPeriodButton from './components/buttons/NewPeriodButton';
import ShotButton from './components/buttons/ShotButton';
import FaceoffButton from './components/buttons/FaceOff';
import TimeoutButton from './components/buttons/TimeoutButton';

const ClockWithStats = props => {
  const dispatch = useDispatch();

  const clockRef = useRef();
  const [timeOn, setTimeOn] = useState(false);
  const [startClock, setStartClock] = useState(false);
  const [clearVisible, setClearVisible] = useState(false);
  const [logVisible, setLogVisible] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [currentQuarter, setCurrentQuarter] = useState(0);
  const [currentGameTime, setCurrentGameTime] = useState(null);
  const [mainClockIsHide, setMainClockIsHide] = useState(false);
  const [clockIsRunning, setClockIsRunning] = useState(false);
  const [possessingTeam, setPossessingTeam] = useState(null);
  const [shotClockTime, setShotClockTime] = useState(0);
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
  const toggleClearButton = () => {
    setClearVisible(!clearVisible);
  };
  const toggleActivityLog = () => {
    setLogVisible(!logVisible);
  };
  const incrementPeriod = () => {
    setCurrentPeriod(prev => {
      return prev + 1;
    });
  };
  const incrementQuarter = () => {
    setCurrentQuarter(prev => {
      return prev + 1;
    });
  };
  const teamA = useSelector(state => state.clockStatsReducer.teamA);
  const teamB = useSelector(state => state.clockStatsReducer.teamB);
  const general = useSelector(state => state.clockStatsReducer.general);
  const rules = useSelector(state => state.clockStatsReducer.rules);
  const clockSetting = useSelector(
    state => state.clockStatsReducer.clockSetting,
  );

  // useEffect(() => {
  // console.log('teamA FOUND XXX', teamA);
  // console.log('teamB FOUND XXX', teamB);
  // console.log('general FOUND XXX', general);
  // console.log('rules FOUND XXX', rules);
  // console.log('clockSetting FOUND XXX', clockSetting);
  // let duration = rules.gamePeriods * rules.periodDuration;
  // setGameTime(duration * 60); // game time in secs
  // console.log('duration ==>>>>>> ', duration);
  // let totalGapDuration = (rules.gamePeriods - 1) * rules.periodDuration + rules.gapBetweenHalves;
  // }, []);

  let durationTime = rules.gamePeriods * rules.periodDuration * 60; // game duration in secs

  useEffect(() => {
    // For current period
    if (Number(rules.gamePeriods) === 4) {
      if (Math.floor(durationTime) == currentGameTime) {
        setCurrentPeriod(0);
        setCurrentQuarter(0);
      }
      if (Math.floor(durationTime - 1) == currentGameTime) {
        incrementPeriod();
        incrementQuarter();
      }
      if (Math.floor((durationTime * 3) / 4 - 1) == currentGameTime) {
        incrementPeriod();
        incrementQuarter();
        // console.log('coming at (durationTime * 3) / 4 - 1');
      }
      if (Math.floor(durationTime / 2 - 1) == currentGameTime) {
        incrementPeriod();
        incrementQuarter();
      }
      if (Math.floor(durationTime / 4 - 1) == currentGameTime) {
        incrementPeriod();
        incrementQuarter();
      }
    }
    if (Number(rules.gamePeriods) === 2) {
      // console.log('Coming into condition 1');
      if (Math.floor(durationTime) == currentGameTime) {
        setCurrentPeriod(0);
        setCurrentQuarter(0);
      }
      if (Math.floor(durationTime - 1) == currentGameTime) {
        incrementPeriod();
        incrementQuarter();
      }
      if (Math.floor((durationTime * 3) / 4 - 1) == currentGameTime) {
        incrementQuarter();
      }
      if (Math.floor(durationTime / 2 - 1) == currentGameTime) {
        incrementPeriod();
        incrementQuarter();
      }
      if (Math.floor(durationTime / 3 - 1) == currentGameTime) {
        incrementQuarter();
      }
    }
    console.log('CURRENT QUARTER ===> ', currentQuarter);
    if (currentGameTime === 0) {
      clockRef.current.refStopClock();
    }

    // FOUR PERIODS
    if (Number(rules.gamePeriods) === 4) {
      if (Math.floor(durationTime / 4) === currentGameTime) {
        clockRef.current.refStopClock();
        setCountdownTimer({
          isVisible: true,
          heading: 'New period will start in',
          duration: rules.gapBetweenPeriods,
        });
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
        setCountdownTimer({
          isVisible: true,
          heading: 'New period will start in',
          duration: rules.gapBetweenPeriods,
        });
        handleStartBtn();
      }
    }
    // TWO PERIODS
    if (Number(rules.gamePeriods) === 2) {
      if (Math.floor(durationTime / 2) === currentGameTime) {
        clockRef.current.refStopClock();
        setCountdownTimer({
          isVisible: true,
          heading: 'Game half time',
          duration: rules.gapBetweenHalves,
        });
        handleStartBtn();
      }
    }

    // XXXXXXXXX SOUNDS XXXXXXXXXXXX
    if (!countdownTimer.isVisible && clockSetting.enableSound) {
      if (clockSetting.warning && currentGameTime === 120) {
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
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.whiteView}>
            <ScrollView>
              {/* HOME AWAY MAINCLOCK */}
              <View style={styles.xxView}>
                <ImageBackground
                  source={require('../../../assets/icons/whiteGroup.png')}
                  style={{width: 30, height: 30}}
                />
                <Text style={styles.homeTxt}>
                  {general.homeTeam === teamA?.teamName ? 'HOME' : 'AWAY'}
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
                  {general.homeTeam === teamB.teamName ? 'HOME' : 'AWAY'}
                </Text>
                <ImageBackground
                  source={require('../../../assets/icons/whiteGroup.png')}
                  style={{width: 30, height: 30}}
                />
              </View>

              {/* TEAM NAMES */}
              <View style={{...styles.rowTxT, width: Dim.w * 0.8}}>
                <Text style={styles.whiteTxt20}>
                  {teamA ? teamA.teamName.toUpperCase() : 'XX'}
                </Text>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={styles.whiteTxt20}>
                    {teamB ? teamB.teamName.toUpperCase() : 'XX'}
                  </Text>
                </View>
              </View>

              {/* GOALS  & PERIODS*/}
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
                {!mainClockIsHide && (
                  <Text style={styles.TOLtxt}>
                    PERIOD
                    <Text style={{...styles.TOLtxt, color: Colors.goldenBrown}}>
                      {' '}
                      {currentPeriod}
                    </Text>
                  </Text>
                )}
                <View style={styles.goalView}>
                  <Text style={styles.goalTxt}>
                    {teamB?.goals ? teamB?.goals : 'XX'}
                  </Text>
                </View>
              </View>

              <PossessionButtons
                clockIsRunning={clockIsRunning}
                // startMainClock={() => clockRef.current.refStartClock()}
                gameTime={currentGameTime}
                durationTime={durationTime}
                teamA={teamA?.teamName}
                teamB={teamA?.teamName}
                possessionTime={clockify}
                countdownIsOpen={countdownTimer.isVisible}
                possessingTeam={possessingTeam}
                setPossessingTeam={setPossessingTeam}
                quarter={currentQuarter}
              />

              {/* SHOT CLOCK AND TOL */}
              <ShotTimeoutComp
                clockIsRunning={clockIsRunning}
                gameTime={currentGameTime}
                durationTime={durationTime}
                countdownIsOpen={countdownTimer.isVisible}
                possessingTeam={possessingTeam}
                setPossessingTeam={setPossessingTeam}
                teamA={teamA}
                teamB={teamB}
                shotClockTime={shotClockTime}
                setShotClockTime={setShotClockTime}
              />

              <View style={styles.rowTxT}>
                <ShotButton
                  possessingTeam={possessingTeam}
                  setPossessingTeam={setPossessingTeam}
                  shotClockTime={shotClockTime}
                  setShotClockTime={setShotClockTime}
                  clockIsRunning={clockIsRunning}
                  team="teamA"
                  penaltyTime={clockify}
                  quarter={currentQuarter}
                />
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
                <ShotButton
                  possessingTeam={possessingTeam}
                  setPossessingTeam={setPossessingTeam}
                  shotClockTime={shotClockTime}
                  setShotClockTime={setShotClockTime}
                  clockIsRunning={clockIsRunning}
                  team="teamB"
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
              </View>

              <View style={styles.rowTxT}>
                <TimeoutButton
                  teamA={teamA?.teamName}
                  teamB={teamB?.teamName}
                  gameTime={currentGameTime}
                  durationTime={durationTime}
                  incrementPeriod={incrementPeriod}
                  stopMainClock={() => clockRef.current.refStopClock()}
                  setCountdownTimer={headingTxt => {
                    setCountdownTimer({
                      isVisible: true,
                      heading: headingTxt,
                      duration: rules.timeoutDuration,
                    });
                  }}
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
                <TouchableOpacity
                  onPress={handlePlayHorn}
                  style={styles.hornBtn}>
                  <MaterialCommunityIcons
                    name="air-horn"
                    size={30}
                    color={Colors.white}
                  />
                </TouchableOpacity>

                <FaceoffButton
                  teamA={teamA?.teamName}
                  playersA={teamA.players}
                  teamB={teamB?.teamName}
                  playersB={teamB.players}
                  FOtime={clockify}
                  quarter={currentQuarter}
                />
              </View>

              <PenaltyComponent
                durationTime={durationTime}
                gameTime={currentGameTime}
                clockIsRunning={clockIsRunning}
                countdownIsOpen={countdownTimer.isVisible}
                penaltyTime={clockify}
                quarter={currentQuarter}
              />

              <View style={styles.foulBtnsRow}>
                <GroundballButton
                  players={teamA.players}
                  team={teamA?.teamName}
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
                <GroundballButton
                  players={teamB.players}
                  team={teamB?.teamName}
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
              </View>
              <View style={styles.foulBtnsRow}>
                <CausedTurnoverButton
                  players={teamA.players}
                  team={teamA?.teamName}
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
                <CausedTurnoverButton
                  players={teamB.players}
                  team={teamB?.teamName}
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
              </View>
              <View style={styles.foulBtnsRow}>
                <TakeawayButton
                  players={teamA.players}
                  team={teamA?.teamName}
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
                <TakeawayButton
                  players={teamB.players}
                  team={teamB?.teamName}
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
              </View>
              <View style={styles.foulBtnsRow}>
                <TurnoverButton
                  players={teamA.players}
                  team={teamA?.teamName}
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
                <TurnoverButton
                  players={teamB.players}
                  team={teamB?.teamName}
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
              </View>
              <View style={styles.foulBtnsRow}>
                <PlayerSubstitutionButton
                  players={teamA.players}
                  team={teamA?.teamName}
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
                <PlayerSubstitutionButton
                  players={teamB.players}
                  team={teamB?.teamName}
                  pressTime={clockify}
                  quarter={currentQuarter}
                />
              </View>

              <View style={styles.foulBtnsRow}>
                <TouchableOpacity
                  onPress={toggleClearButton}
                  style={{
                    ...styles.faceOffBtn,
                    backgroundColor: Colors.btnGreen,
                  }}>
                  <Text style={styles.goalTxt}>CLEAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={toggleActivityLog}
                  style={{
                    ...styles.faceOffBtn,
                    backgroundColor: Colors.darkBlue,
                  }}>
                  <Text style={styles.goalTxt}>ACTIVITY LOG</Text>
                </TouchableOpacity>
              </View>
              <View style={{...styles.foulBtnsRow, marginBottom: 10}}>
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
                teamA={teamA?.teamName}
                teamB={teamB?.teamName}
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
              <ClearButtons
                visible={clearVisible}
                onBackdropPress={() => toggleClearButton(false)}
                teamA={teamA?.teamName}
                teamB={teamB?.teamName}
                playersA={teamA.players}
                playersB={teamB.players}
                goalieA={teamA?.goalie}
                goalieB={teamB?.goalie}
                clearTime={clockify}
                quarter={currentQuarter}
              />
              <ActivityLogOverlay
                onBackdropPress={toggleActivityLog}
                closeThenOpen={() => {
                  setLogVisible(false);
                  setTimeout(() => {
                    setLogVisible(true);
                  }, 100);
                }}
                visible={logVisible}
              />
            </ScrollView>
          </View>
          {/* )} */}
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
    // paddingVertical: 10,
    marginVertical: Dim.w * 0.05,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  smallTxt: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: Fonts.heading,
  },
  hornBtn: {
    width: 55,
    height: 55,
    alignSelf: 'center',
    backgroundColor: Colors.red,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.whiteO,
    marginBottom: -4,
    marginTop: 5,
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
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.whiteclock,
  },
  endBtn: {
    width: Dim.w * 0.5,
    height: 45,
    alignSelf: 'center',
    backgroundColor: Colors.btnRed,
    borderRadius: 20,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.whiteclock,
  },
});
