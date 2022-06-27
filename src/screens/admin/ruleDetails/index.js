import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput as InputField,
  ImageBackground,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DeleteOverlay from '../../../components/overlays/DeleteOverlay';
import {getOneRule} from '../../../services/game.services';
import {updateRule} from '../../../services/game.services';
import {useSelector} from 'react-redux';

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
};

const RuleDetail = props => {
  const [initialStateForm, setInitialStateForm] = useState(initialState);
  const [editable, setEditable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ruleData, setRuleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ruleDetailsloading, setRuleDetailsLoading] = useState(false);
  const user = useSelector(state => state.authReducer.user);

  const ruleId = props.route.params.rule_id;

  const toggleDelete = () => {
    setIsVisible(!isVisible);
  };

  const toggleEdit = () => {
    setEditable(!editable);
  };

  const handleFormChange = (name, value) => {
    setInitialStateForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    // console.log(initialStateForm);
    try {
      setLoading(true);
      const response = await updateRule(initialStateForm, user?.token);
      // console.log('editRule request workingggggg', response.data);
      setEditable(!editable);
    } catch (e) {
      console.log('errorrrrrrr in api', e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fnt = async () => {
      try {
        setRuleDetailsLoading(true);
        const response = await getOneRule(ruleId, user?.token);
        setRuleData(response.data);
        let data = response.data;
        data = {...data, id: response.data._id};
        // handleFormChange('id', response.data._id.toString());
        delete data.__v;
        delete data._id;
        // console.log('initialStateForm =>> ', initialStateForm);

        setInitialStateForm(data);
        // console.log('initialStateForm => ', initialStateForm);
      } catch (error) {
        console.log('errorrrrrrr in rule detailsssss', error);
      } finally {
        setRuleDetailsLoading(false);
      }
    };
    fnt();
  }, []);

  const goBackHandler = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <Image
        style={{position: 'absolute', bottom: 0}}
        source={require('../../../assets/images/racket.png')}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[Colors.blue, Colors.white]}
            refreshing={ruleDetailsloading}
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
          <Text style={styles.headerTxt}>RULE DETAILS</Text>
        </ImageBackground>

        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={toggleDelete}
            style={{...styles.deleteBtn, marginRight: 10}}>
            <MaterialIcons name="delete" size={17} color={Colors.white} />
          </TouchableOpacity>
          {!editable ? (
            <TouchableOpacity
              onPress={toggleEdit}
              style={{...styles.deleteBtn, backgroundColor: Colors.darkBlue}}>
              <Feather name="edit" size={15} color={Colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleUpdate}
              style={{...styles.deleteBtn, backgroundColor: Colors.green}}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Feather name="check" size={20} color={Colors.white} />
              )}
            </TouchableOpacity>
          )}
        </View>

        <DeleteOverlay
          isVisible={isVisible}
          onBackdropPress={() => toggleDelete(false)}
          navigation={props.navigation}
        />

        <Text style={styles.ruleName}>{ruleData?.ruleName}</Text>

        <View style={styles.horizontalview}>
          <View style={styles.ageView}>
            <Text style={styles.ageTxt}>Rule : {ruleData?.ruleId}</Text>
          </View>
          <View style={styles.ageView}>
            <Text style={styles.ageTxt}>Gender : {ruleData?.gender}</Text>
          </View>
        </View>

        {/* XXXXXXXXXX */}

        <View style={styles.ruleView}>
          <Text style={styles.genTxt}>Periods Per Game :</Text>
          <InputField
            editable={editable}
            keyboardType="numeric"
            // underlineColorAndroid={false}
            style={{...styles.input, borderBottomWidth: editable ? 1 : 0}}
            value={initialStateForm?.gamePeriods.toString()}
            onChangeText={text => handleFormChange('gamePeriods', text)}
          />
        </View>

        <View style={styles.ruleView}>
          <Text style={styles.genTxt}>Minutes Per Period :</Text>
          <InputField
            editable={editable}
            keyboardType="numeric"
            style={{...styles.input, borderBottomWidth: editable ? 1 : 0}}
            value={initialStateForm?.periodDuration.toString()}
            onChangeText={text => handleFormChange('periodDuration', text)}
          />
        </View>

        <View style={styles.ruleView}>
          <Text style={styles.genTxt}>Minutes Between Periods :</Text>
          <InputField
            editable={editable}
            style={{...styles.input, borderBottomWidth: editable ? 1 : 0}}
            value={initialStateForm?.gapBetweenPeriods.toString()}
            onChangeText={text => handleFormChange('gapBetweenPeriods', text)}
          />
        </View>

        <View style={styles.ruleView}>
          <Text style={styles.genTxt}>Minutes Between Halves :</Text>
          <InputField
            editable={editable}
            keyboardType="numeric"
            style={{...styles.input, borderBottomWidth: editable ? 1 : 0}}
            value={initialStateForm?.gapBetweenHalves.toString()}
            onChangeText={text => handleFormChange('gapBetweenHalves', text)}
          />
        </View>

        <View style={styles.ruleView}>
          <Text style={styles.genTxt}>Timeout Per Half :</Text>
          <InputField
            editable={editable}
            keyboardType="numeric"
            style={{...styles.input, borderBottomWidth: editable ? 1 : 0}}
            value={initialStateForm?.timeoutsPerHalf.toString()}
            onChangeText={text => handleFormChange('timeoutsPerHalf', text)}
          />
        </View>

        <View style={styles.ruleView}>
          <Text style={styles.genTxt}>Timeouts In Overtime :</Text>
          <InputField
            editable={editable}
            keyboardType="numeric"
            style={{...styles.input, borderBottomWidth: editable ? 1 : 0}}
            value={initialStateForm?.timeoutsInOvertimePeriod.toString()}
            onChangeText={text =>
              handleFormChange('timeoutsInOvertimePeriod', text)
            }
          />
        </View>

        <View style={styles.ruleView}>
          <Text style={styles.genTxt}>No. of Overtime Periods :</Text>
          <InputField
            editable={editable}
            keyboardType="numeric"
            style={{...styles.input, borderBottomWidth: editable ? 1 : 0}}
            value={initialStateForm?.maxOvertimePeriods.toString()}
            onChangeText={text => handleFormChange('maxOvertimePeriods', text)}
          />
        </View>

        <View style={styles.ruleView}>
          <Text style={styles.genTxt}>Minutes Per Overtime Periods :</Text>
          <InputField
            editable={editable}
            keyboardType="numeric"
            style={{...styles.input, borderBottomWidth: editable ? 1 : 0}}
            value={initialStateForm?.overtimePeriodDuration.toString()}
            onChangeText={text =>
              handleFormChange('overtimePeriodDuration', text)
            }
          />
        </View>
        <View style={styles.ruleView}>
          <Text style={styles.genTxt}>Max # Of Personal Fouls :</Text>
          <InputField
            editable={editable}
            keyboardType="numeric"
            style={{...styles.input, borderBottomWidth: editable ? 1 : 0}}
            value={initialStateForm?.maxPersonalFouls.toString()}
            onChangeText={text => handleFormChange('maxPersonalFouls', text)}
          />
        </View>
        <View
          style={{
            ...styles.ruleView,
            marginBottom: 30,
            borderBottomWidth: 0,
          }}>
          <Text style={styles.genTxt}>Max # Of FO Violations Per Half :</Text>
          <InputField
            editable={editable}
            keyboardType="numeric"
            style={{...styles.input, borderBottomWidth: editable ? 1 : 0}}
            value={initialStateForm?.maxFOViolationPerHalf.toString()}
            onChangeText={text =>
              handleFormChange('maxFOViolationPerHalf', text)
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RuleDetail;

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
  ruleName: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    color: Colors.red,
    alignSelf: 'center',
  },
  horizontalview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.9,
    alignSelf: 'center',
    marginVertical: 20,
  },
  ageView: {
    width: Dim.w * 0.43,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: Colors.darkBlue,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  ageTxt: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
  ruleView: {
    width: Dim.w * 0.9,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  input: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.darkBlue,
    borderColor: Colors.blue,
    paddingHorizontal: 2,
    paddingVertical: 0,
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
});
