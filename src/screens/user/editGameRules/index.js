import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import {Fonts} from '../../../constants/fonts';
import {useSelector} from 'react-redux';
import CheckBox from 'react-native-check-box';
import DotSwitch from '../../../components/tabSwitch/DotSwitch';
import {getOneRule} from '../../../services/game.services';
import {useDispatch} from 'react-redux';

const initialState = {
  id: '',
  ruleName: '',
  ruleId: '',
  gender: '',
  gamePeriods: '',
  periodDuration: '',
  gapBetweenPeriods: '',
  gapBetweenHalves: '',
  timeoutsPerHalf: '',
  timeoutsInOvertimePeriod: '',
  maxOvertimePeriods: '',
  overtimePeriodDuration: '',
  goalDiffForRunningClock: '',
  maxPersonalFouls: '',
  maxFOViolationPerHalf: '',
  timeoutDuration: '',
};

const clockSetting = {
  // generalClock: {
  enableSound: false,
  isMaleVoice: false,
  warning: false,
  countDownLastSeconds: false,
  // },
  // penaltyClock: {
  announceRelease: false,
  announceAndBlinkAtSeconds: 0,
  // },
};

const EditGameRules = props => {
  const dispatch = useDispatch();

  const ruleId = props.route.params.ruleId;
  const user = useSelector(state => state.authReducer.user);

  const [initialFormState, setInitialFormState] = useState(initialState);
  const [initialClockForm, setInitialClockForm] = useState(clockSetting);
  const [loading, setLoading] = useState(false);

  const [selectedDot, setSelectedDot] = useState(1);
  const [selectedDot2, setSelectedDot2] = useState(1);
  const [selectedDot3, setSelectedDot3] = useState(1);
  const [selectedDot4, setSelectedDot4] = useState(1);
  const [countdownDot, setCountdownDot] = useState(1);
  const [announceDot, setAnnounceDot] = useState(1);

  const [check, setCheck] = useState(true);
  const [check2, setCheck2] = useState(true);
  const [check3, setCheck3] = useState(true);

  const handleFormChange = (name, value) => {
    setInitialFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClockSettingForm = (name, value) => {
    setInitialClockForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   console.log('initialClockForm  DATA&&&&', initialClockForm);
  // }, [initialClockForm]);

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getOneRule(ruleId, user?.token);
        // console.log('getOneRule successfull =====>>>', response.data);
        handleFormChange('id', response.data._id);
        handleFormChange('ruleName', response.data.ruleName);
        handleFormChange('ruleId', response.data.ruleId);
        handleFormChange('gender', response.data.gender);
        handleFormChange('gamePeriods', response.data.gamePeriods);
        handleFormChange('periodDuration', response.data.periodDuration);
        handleFormChange('gapBetweenPeriods', response.data.gapBetweenPeriods);
        handleFormChange('gapBetweenHalves', response.data.gapBetweenHalves);
        handleFormChange('timeoutsPerHalf', response.data.timeoutsPerHalf);
        handleFormChange('timeoutDuration', response.data.timeoutDuration);
        handleFormChange(
          'timeoutsInOvertimePeriod',
          response.data.timeoutsInOvertimePeriod,
        );
        handleFormChange(
          'maxOvertimePeriods',
          response.data.maxOvertimePeriods,
        );
        handleFormChange(
          'overtimePeriodDuration',
          response.data.overtimePeriodDuration,
        );
        handleFormChange(
          'goalDiffForRunningClock',
          response.data.goalDiffForRunningClock,
        );
        handleFormChange('maxPersonalFouls', response.data.maxPersonalFouls);
        handleFormChange(
          'maxFOViolationPerHalf',
          response.data.maxFOViolationPerHalf,
        );
      } catch (error) {
        console.log('errorrrrrrr in rule detailsssss', error);
      } finally {
        setLoading(false);
      }
    };
    fnt();
  }, []);

  const handleSave = () => {
    dispatch({type: 'GAME_RULES', payload: initialFormState});
    dispatch({type: 'CLOCK_SETTINGS', payload: initialClockForm});
    props.navigation.goBack();
  };

  const goBackHandler = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[Colors.blue, Colors.white]}
            refreshing={loading}
            // onRefresh={() => RefreshPage()}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/header.png')}
          style={{width: Dim.w, height: Dim.w * 0.45, marginBottom: 20}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>EDIT GAME RULES</Text>
        </ImageBackground>

        <Text style={styles.ruleName}>{initialFormState?.ruleName}</Text>

        <View style={{...styles.periodView, marginTop: 10}}>
          <Text style={styles.blueTxt}>Periods Per Game : (check)</Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.gamePeriods.toString()}
            onChangeText={text => handleFormChange('gamePeriods', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.periodView}>
          <Text style={styles.blueTxt}>Minutes Per Period : (check)</Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.periodDuration.toString()}
            onChangeText={text => handleFormChange('periodDuration', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.periodView}>
          <Text style={styles.blueTxt}>Minutes Between Periods : (check)</Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.gapBetweenPeriods.toString()}
            onChangeText={text => handleFormChange('gapBetweenPeriods', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.periodView}>
          <Text style={styles.blueTxt}>Minutes Between Halves : (check)</Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.gapBetweenHalves.toString()}
            onChangeText={text => handleFormChange('gapBetweenHalves', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.periodView}>
          <Text style={styles.blueTxt}>Timeouts Per Half : (check)</Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.timeoutsPerHalf.toString()}
            onChangeText={text => handleFormChange('timeoutsPerHalf', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.periodView}>
          <Text style={styles.blueTxt}>Timeout Duration</Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.timeoutDuration.toString()}
            onChangeText={text => handleFormChange('timeoutDuration', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.periodView}>
          <Text style={styles.blueTxt}>Timeouts In Overtime :</Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.timeoutsInOvertimePeriod.toString()}
            onChangeText={text =>
              handleFormChange('timeoutsInOvertimePeriod', text)
            }
            keyboardType="numeric"
          />
        </View>
        <View style={styles.periodView}>
          <Text style={styles.blueTxt}>No. of Overtime Periods :</Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.maxOvertimePeriods.toString()}
            onChangeText={text => handleFormChange('maxOvertimePeriods', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.periodView}>
          <Text style={styles.blueTxt}>Minutes Per Overtime Periods :</Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.overtimePeriodDuration.toString()}
            onChangeText={text =>
              handleFormChange('overtimePeriodDuration', text)
            }
            keyboardType="numeric"
          />
        </View>

        <View style={styles.periodView}>
          <Text style={styles.blueTxt}>
            goal differential for running clock
          </Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.goalDiffForRunningClock.toString()}
            onChangeText={text =>
              handleFormChange('goalDiffForRunningClock', text)
            }
            keyboardType="numeric"
          />
        </View>
        <View style={styles.periodView}>
          <Text style={styles.blueTxt}>Max # Of Personal Fouls : (check)</Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.maxPersonalFouls.toString()}
            onChangeText={text => handleFormChange('maxPersonalFouls', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.periodView}>
          <Text style={styles.blueTxt}>Max # Of FO Violations Per Half :</Text>
          <TextInput
            style={styles.input}
            value={initialFormState?.maxFOViolationPerHalf.toString()}
            onChangeText={text =>
              handleFormChange('maxFOViolationPerHalf', text)
            }
            keyboardType="numeric"
          />
        </View>

        {/* XXXXXXXXXX */}

        <Text style={styles.subHead}>Game Clock</Text>
        <View style={styles.blinkView}>
          <Text style={styles.smallTxt}>Enable Sound</Text>
          <DotSwitch
            Tab1={{text: 'Yes', value: true}}
            Tab2={{text: 'No', value: false}}
            TabKey={'enableSound'}
            defaultTab={selectedDot}
            setSelectedTab={setSelectedDot}
            handleFormChange={handleClockSettingForm}
          />
        </View>
        <View style={styles.blinkView}>
          <Text style={styles.smallTxt}>Male or Female Voice</Text>
          <DotSwitch
            Tab1={{text: 'Male', value: true}}
            Tab2={{text: 'Female', value: false}}
            TabKey={'isMaleVoice'}
            defaultTab={selectedDot2}
            setSelectedTab={setSelectedDot2}
            handleFormChange={handleClockSettingForm}
          />
        </View>
        <View style={styles.blinkView}>
          <Text style={styles.smallTxt}>2 min warning(4th QTR)</Text>
          <DotSwitch
            Tab1={{text: 'Yes', value: true}}
            Tab2={{text: 'No', value: false}}
            TabKey={'warning'}
            defaultTab={selectedDot3}
            setSelectedTab={setSelectedDot3}
            handleFormChange={handleClockSettingForm}
          />
        </View>
        <View style={styles.blinkView}>
          <View style={styles.row}>
            <CheckBox
              style={{marginRight: Dim.w * 0.01}}
              checkBoxColor={Colors.darkBlue}
              onClick={() => {
                handleClockSettingForm(
                  'countDownLastSeconds',
                  !initialClockForm.countDownLastSeconds,
                );
                // setCheck(!check);
                // handleFormChange = {handleClockSettingForm}
              }}
              isChecked={initialClockForm.countDownLastSeconds}
            />
            <Text style={{fontSize: 13, color: Colors.blue}}>
              Count Down Last 10 seconds
            </Text>
          </View>

          {/* <DotSwitch
            Tab1={{text: '10 secs', value: 10}}
            Tab2={{text: '30 secs', value: 30}}
            TabKey={'countDownLastSeconds'}
            defaultTab={countdownDot}
            setSelectedTab={setCountdownDot}
            handleFormChange={handleClockSettingForm}
          /> */}
        </View>

        <Text style={styles.subHead}>Penalty Clock</Text>

        <View style={styles.blinkView}>
          <Text style={styles.smallTxt}>Announce release</Text>
          <DotSwitch
            Tab1={{text: 'Yes', value: true}}
            Tab2={{text: 'No', value: false}}
            TabKey={'announceRelease'}
            defaultTab={selectedDot4}
            setSelectedTab={setSelectedDot4}
            handleFormChange={handleClockSettingForm}
          />
        </View>

        <View style={styles.blinkView}>
          <View style={styles.row}>
            <CheckBox
              style={{marginRight: Dim.w * 0.01}}
              checkBoxColor={Colors.darkBlue}
              onClick={() => {
                setCheck2(!check2);
              }}
              isChecked={check2}
            />
            <Text style={{fontSize: 13, color: Colors.blue}}>
              Blink at remaining 10 seconds
            </Text>
          </View>

          {/* <DotSwitch
            Tab1={{text: '10 secs', value: 10}}
            Tab2={{text: '30 secs', value: 30}}
            TabKey={'announceAndBlinkAtSeconds'}
            defaultTab={announceDot}
            setSelectedTab={setAnnounceDot}
            handleFormChange={handleClockSettingForm}
          /> */}
        </View>

        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={{color: Colors.white}}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditGameRules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: Dim.w * 0.05,
    paddingBottom: Dim.w * 0.02,
  },
  headerTxt: {
    fontSize: 23,
    fontWeight: 'bold',
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
  },
  ruleName: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.red,
    alignSelf: 'center',
  },
  periodView: {
    width: Dim.w * 0.85,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  blueTxt: {
    color: Colors.darkBlue,
  },
  input: {
    fontSize: 15,
    padding: 0,
    marginRight: 10,
    color: Colors.darkBlue,
    fontWeight: 'bold',
  },
  subHead: {
    fontSize: 15,
    color: Colors.darkBlue,
    fontWeight: 'bold',
    width: Dim.w * 0.85,
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 15,
  },
  blinkView: {
    width: Dim.w * 0.85,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // marginTop: 5,
  },
  smallTxt: {
    color: Colors.blue,
    fontSize: 13,
    width: Dim.w * 0.4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dim.w * 0.4,
    // backgroundColor: 'pink',
  },
  blinkTxt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.darkBlue,
  },
  input2: {
    fontSize: 15,
    padding: 0,
    marginRight: 5,
    color: Colors.darkBlue,
    fontWeight: 'bold',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    marginLeft: Dim.w * 0.1,
  },
  saveBtn: {
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    alignSelf: 'flex-end',
    marginVertical: 20,
    marginRight: Dim.w * 0.07,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
