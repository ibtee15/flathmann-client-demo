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
import Entypo from 'react-native-vector-icons/Entypo';
import {Fonts} from '../../../constants/fonts';

import {getRules} from '../../../services/game.services';
import {useSelector} from 'react-redux';

const GameRules = props => {
  const goBackHandler = () => {
    props.navigation.goBack();
  };

  const [ruleData, setRuleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.authReducer.user);

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getRules(user?.token);
        // console.log('rulessssssss found ==>>>', response.data);
        setRuleData(response.data);
      } catch (err) {
        console.log('errorrrrrrrr at rules', err);
      } finally {
        setLoading(false);
      }
    };
    fnt();
  }, []);
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
          <Text style={styles.headerTxt}>GAME RULES</Text>
        </ImageBackground>

        {ruleData &&
          ruleData.map((v, i) => {
            return (
              <View style={styles.ruleContainer}>
                <View>
                  {/* <Text style={styles.ruleTxt}>GAME RULE #{v.id}</Text> */}
                  <Text style={styles.ruleTxt}>{v.ruleName}</Text>

                  <View style={styles.ageView}>
                    <Text style={styles.age}>Gender: {v.gender}</Text>
                    <View style={styles.line} />
                    <Text style={styles.age}>Code: {v.ruleId}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('RuleDetail', {rule_id: v._id})
                  }
                  style={styles.viewBtn}>
                  <Text style={styles.viewBtnTxt}>VIEW DETAILS</Text>
                </TouchableOpacity>
              </View>
            );
          })}

        <TouchableOpacity
          onPress={() => props.navigation.navigate('AddRule')}
          style={styles.plusBtn}>
          <Entypo name="plus" size={30} color={Colors.white} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameRules;

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
  ruleContainer: {
    width: Dim.w * 0.92,
    borderRadius: 15,
    backgroundColor: Colors.lightgrey,
    alignSelf: 'center',
    padding: 15,
    paddingHorizontal: 10,
    // marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginBottom: 20,
  },
  ruleTxt: {
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    fontSize: 20,
    alignSelf: 'center',
  },
  ageView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  age: {
    fontSize: 13,
    color: Colors.blue,
    fontFamily: Fonts.regular,
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: Colors.grey,
    marginTop: 5,
    marginHorizontal: 5,
  },
  viewBtn: {
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkBlue,
  },
  viewBtnTxt: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
  plusBtn: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: Colors.darkBlue,
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
