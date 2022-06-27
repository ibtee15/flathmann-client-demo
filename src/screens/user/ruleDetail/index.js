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
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {getOneRule} from '../../../services/game.services';
import {useSelector} from 'react-redux';

const RuleDetail = props => {
  const uid = props.route.params.rule_id;
  const user = useSelector(state => state.authReducer.user);
  const [ruleData, setRuleData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getOneRule(uid, user?.token);
        console.log('rule detailssss successfull =====>>>', response.data);
        setRuleData(response.data);
      } catch (error) {
        console.log('errorrrrrrr in rule detailsssss', error);
      } finally {
        setLoading(false);
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
          <Text style={styles.headerTxt}>RULE DETAILS</Text>
        </ImageBackground>

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
        {/* <View style={styles.ruleView}>
          <View />
          <View style={styles.subView}>
            <Text style={styles.boldBlue}>Female</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.boldBlue}>{ruleData?.gender}</Text>
          </View>
        </View> */}
        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Periods Per Game :</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.boldBlue}>{ruleData?.gamePeriods}</Text>
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Minutes Per Period :</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.boldBlue}>{ruleData?.periodDuration}</Text>
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Minutes Between Periods :</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.boldBlue}>{ruleData?.gapBetweenPeriods}</Text>
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Minutes Between Halves :</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.boldBlue}>{ruleData?.gapBetweenHalves}</Text>
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Timeout Per Half :</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.boldBlue}>{ruleData?.timeoutsPerHalf}</Text>
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Timeouts In Overtime :</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.boldBlue}>
              {ruleData?.timeoutsInOvertimePeriod}
            </Text>
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>No. of Overtime Periods :</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.boldBlue}>{ruleData?.maxOvertimePeriods}</Text>
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Minutes Per Overtime Periods :</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.boldBlue}>
              {ruleData?.overtimePeriodDuration}
            </Text>
          </View>
        </View>

        <View style={styles.ruleView}>
          <View>
            <Text style={styles.genTxt}>Max # Of Personal Fouls :</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.boldBlue}>{ruleData?.maxPersonalFouls}</Text>
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
            <Text style={styles.boldBlue}>
              {ruleData?.maxFOViolationPerHalf}
            </Text>
          </View>
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
  ruleName: {
    fontFamily: Fonts.bold,
    fontSize: 28,
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
    width: Dim.w * 0.85,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
    paddingHorizontal: 10,
  },
  boldBlue: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.darkBlue,
  },
  subView: {
    width: Dim.w * 0.1,
    alignItems: 'center',
  },
  genTxt: {
    color: Colors.darkBlue,
    fontSize: 15,
    fontFamily: Fonts.regular,
  },
});
