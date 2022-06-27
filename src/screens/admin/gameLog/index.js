import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {GameLogList} from '../../../dummyData/DummyData';

const GameLog = props => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/header.png')}
          style={{width: Dim.w, height: Dim.w * 0.45, marginBottom: 20}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>GAME LOG</Text>
        </ImageBackground>

        {GameLogList.map((v, i) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('GameLogDetails')}
              style={styles.gameView}>
              <View style={styles.vsView}>
                <Text style={styles.name}>{v.teamA}</Text>
                <View style={styles.line} />
                <Text style={styles.vsTxt}>VS</Text>
                <View style={styles.line} />
                <Text style={styles.name}>{v.teamB}</Text>
              </View>

              <View style={styles.subTxtView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: Colors.goldenBrown,
                      fontFamily: Fonts.regular,
                    }}>
                    Winner:{' '}
                  </Text>
                  <Text style={styles.greyTxt}>{v.teamA}</Text>
                </View>
                <Text style={styles.greyTxt}>Age: {v.age}</Text>
              </View>
              <View style={styles.subTxtView}>
                <Text style={styles.greyTxt}>Date: {v.date}</Text>
                <Text style={styles.greyTxt}>Gender: {v.gender}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameLog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: Dim.w * 0.05,
    paddingBottom: Dim.w * 0.03,
  },
  headerTxt: {
    fontSize: 35,
    fontFamily: Fonts.heading,
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
  },
  gameView: {
    width: Dim.w * 0.9,
    // padding: 15,
    paddingVertical: 15,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Colors.lightgrey,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  vsView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 5,
  },
  line: {
    width: Dim.w * 0.1,
    height: 1,
    backgroundColor: Colors.grey,
    marginHorizontal: 10,
  },
  vsTxt: {
    fontSize: 18,
    color: Colors.red,
    fontFamily: Fonts.bold,
  },
  name: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.darkBlue,
  },
  subTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    width: Dim.w * 0.65,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  greyTxt: {
    color: Colors.grey,
    fontSize: 13,
    fontFamily: Fonts.regular,
  },
});
