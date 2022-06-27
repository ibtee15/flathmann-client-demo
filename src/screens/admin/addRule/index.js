import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import {Fonts} from '../../../constants/fonts';

import DotSwitch from '../../../components/tabSwitch/DotSwitch';
import ErrorOverlay from '../../../components/overlays/ErrorOverlay';
import SuccessOverlay from '../../../components/overlays/SuccessOverlay';
import AllRulesModal from '../../../components/modals/AllRulesModal';
import {useSelector} from 'react-redux';
import {createRule} from '../../../services/game.services';

const initialState = {
  ruleName: '',
  ruleId: '',
  gender: '',
  gamePeriods: 0,
  periodDuration: 0,
  gapBetweenPeriods: 0,
  gapBetweenHalves: 0,
  timeoutsPerHalf: 0,
  timeoutsInOvertimePeriod: 0,
  maxOvertimePeriods: 0,
  overtimePeriodDuration: 0,
  goalDiffForRunningClock: 0,
  maxPersonalFouls: 0,
  maxFOViolationPerHalf: 0,
};

const AddRule = props => {
  const allRules = useSelector(state => state.gameReducer.allRules);
  const user = useSelector(state => state.authReducer.user);
  const [visible, setVisible] = useState(false);

  const [initialStateForm, setInitialStateForm] = useState(initialState);
  const [selectedRule, setSelectedRule] = useState(null);
  const [groupModal, setGroupModal] = useState(false);
  const [selectedDot, setSelectedDot] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (name, value) => {
    setInitialStateForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGroupModal = () => {
    setGroupModal(!groupModal);
  };

  const handleSelectGroup = val => {
    // console.log('valueeeeeeee ruleee ====>>XXX', val);
    setSelectedRule(val);
    handleFormChange('ruleName', val._id);
    setGroupModal(false);
  };

  const toggleSuccessModal = () => {
    setVisible(true);
    setTimeout(() => {
      props.navigation.goBack();
      setVisible(false);
    }, 2500);
  };

  const handleCreate = async () => {
    // console.log('create rule data', initialStateForm);
    try {
      setLoading(true);
      const response = await createRule(initialStateForm, user?.token);
      // console.log('request workingggggg', response.data);
      toggleSuccessModal();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  console.log('GENDER SELECTED', selectedDot);

  const goBackHandler = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <ErrorOverlay
        onBackdropPress={() => setError(null)}
        visible={error ? true : false}
        message={error?.response?.data?.message || error?.message}
      />
      <Image
        style={{position: 'absolute', bottom: 0}}
        source={require('../../../assets/images/racket.png')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/header.png')}
          style={{width: Dim.w, height: Dim.w * 0.45, marginBottom: 20}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>ADD NEW RULE</Text>
        </ImageBackground>

        {/* <View style={styles.rowView}> */}
        {/* <View
            style={{
              ...styles.row,
              width: Dim.w * 0.85,
              justifyContent: 'space-between',
            }}> */}
        <TextInput
          placeholderTextColor={Colors.grey}
          placeholder="enter group/rule name"
          style={styles.input2}
          value={selectedRule?.ruleName}
          onChangeText={text => handleFormChange('ruleName', text)}
          // editable={false}
        />

        <TextInput
          placeholderTextColor={Colors.grey}
          placeholder="B/G  or M/F + rule code"
          style={styles.input2}
          value={selectedRule?.ruleId}
          onChangeText={text => handleFormChange('ruleId', text)}
          // editable={false}
        />

        {/* <TouchableOpacity onPress={handleGroupModal}>
              <Entypo name="chevron-down" size={20} color={Colors.black} />
            </TouchableOpacity> */}
        {/* </View> */}
        {/* <View style={styles.row}>
            <TextInput
              placeholderTextColor={Colors.grey}
              placeholder="Select Gender"
              style={styles.input2}
              // value={level.value}
              editable={false}
            />
            <TouchableOpacity>
              <Entypo name="chevron-down" size={20} color={Colors.black} />
            </TouchableOpacity>
          </View> */}
        {/* </View> */}
        <Text style={styles.gender}>Gender</Text>
        <DotSwitch
          Tab1={{text: 'Male', value: 'male'}}
          Tab2={{text: 'Female', value: 'female'}}
          TabKey={'gender'}
          defaultTab={selectedDot}
          setSelectedTab={setSelectedDot}
          handleFormChange={handleFormChange}
        />

        <AllRulesModal
          data={allRules}
          setSelectedRule={handleSelectGroup}
          groupModal={groupModal}
          closeModal={() => handleGroupModal(false)}
        />

        {/* XXXXXXXXXX */}
        <View style={{...styles.ruleView, marginTop: 10}}>
          <View>
            <Text style={styles.genTxt}>Periods Per Game :</Text>
          </View>
          <View style={styles.subView}>
            <TextInput
              placeholder="XXX"
              style={styles.input}
              onChangeText={text => handleFormChange('gamePeriods', text)}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Minutes Per Period :</Text>
          </View>
          <View style={styles.subView}>
            <TextInput
              placeholder="XXX"
              style={styles.input}
              onChangeText={text => handleFormChange('periodDuration', text)}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Minutes Between Periods :</Text>
          </View>
          <View style={styles.subView}>
            <TextInput
              placeholder="XXX"
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={text => handleFormChange('gapBetweenPeriods', text)}
            />
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Minutes Between Halves :</Text>
          </View>
          <View style={styles.subView}>
            <TextInput
              keyboardType="number-pad"
              placeholder="XXX"
              style={styles.input}
              onChangeText={text => handleFormChange('gapBetweenHalves', text)}
            />
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Timeout Per Half :</Text>
          </View>
          <View style={styles.subView}>
            <TextInput
              keyboardType="number-pad"
              placeholder="XXX"
              style={styles.input}
              onChangeText={text => handleFormChange('timeoutsPerHalf', text)}
            />
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Timeouts In Overtime :</Text>
          </View>
          <View style={styles.subView}>
            <TextInput
              placeholder="XXX"
              style={styles.input}
              onChangeText={text =>
                handleFormChange('timeoutsInOvertimePeriod', text)
              }
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>No. of Overtime Periods :</Text>
          </View>
          <View style={styles.subView}>
            <TextInput
              placeholder="XXX"
              style={styles.input}
              onChangeText={text =>
                handleFormChange('maxOvertimePeriods', text)
              }
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Minutes Per Overtime Periods :</Text>
          </View>
          <View style={styles.subView}>
            <TextInput
              placeholder="XXX"
              style={styles.input}
              onChangeText={text =>
                handleFormChange('overtimePeriodDuration', text)
              }
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>
              Goal Differential for running clock :
            </Text>
          </View>
          <View style={styles.subView}>
            <TextInput
              placeholder="XXX"
              style={styles.input}
              onChangeText={text =>
                handleFormChange('goalDiffForRunningClock', text)
              }
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Max # Of Personal Fouls :</Text>
          </View>
          <View style={styles.subView}>
            <TextInput
              placeholder="XXX"
              style={styles.input}
              onChangeText={text => handleFormChange('maxPersonalFouls', text)}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View
          style={{
            ...styles.ruleView,
            marginBottom: 30,
            borderBottomWidth: 0,
          }}>
          <View>
            <Text style={styles.genTxt}>Max # Of FO Violations Per Half :</Text>
          </View>
          <View style={styles.subView}>
            <TextInput
              placeholder="XXX"
              style={styles.input}
              onChangeText={text =>
                handleFormChange('maxFOViolationPerHalf', text)
              }
              keyboardType="number-pad"
            />
          </View>
        </View>
        <TouchableOpacity onPress={handleCreate} style={styles.saveBtn}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{color: Colors.white, fontFamily: Fonts.medium}}>
              SAVE
            </Text>
          )}
        </TouchableOpacity>

        <SuccessOverlay
          onBackdropPress={() => toggleSuccessModal(false)}
          isVisible={visible}
          type="Game rule has been created successfully!"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddRule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: Dim.w * 0.05,
    paddingBottom: Dim.w * 0.05,
  },
  headerTxt: {
    fontSize: 33,
    fontFamily: Fonts.heading,
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: Dim.w * 0.08,
    bottom: 25,
  },
  deleteBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: Colors.red,
  },
  input2: {
    // width: Dim.w * 0.35,
    width: Dim.w * 0.8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkBlue,
    alignSelf: 'center',
    paddingVertical: 5,
    marginBottom: 10,
    color: Colors.darkBlue,
    fontFamily: Fonts.regular,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.85,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  ruleView: {
    width: Dim.w * 0.9,
    alignSelf: 'center',
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.darkBlue,
    padding: 0,
    borderColor: Colors.blue,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
  },
  boldBlue: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.darkBlue,
  },
  genTxt: {
    color: Colors.darkBlue,
    fontSize: 15,
    fontFamily: Fonts.regular,
  },
  gender: {
    fontSize: 18,
    color: Colors.darkBlue,
    width: Dim.w * 0.8,
    alignSelf: 'center',
    marginVertical: 8,
    fontFamily: Fonts.bold,
  },
  // subView: {
  //   width: Dim.w * 0.2,
  //   alignItems: 'center',
  // },
  saveBtn: {
    width: 80,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: Dim.w * 0.075,
    marginBottom: 20,
  },
});
