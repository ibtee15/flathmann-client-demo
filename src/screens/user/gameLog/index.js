import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';

import {useSelector} from 'react-redux';
// import {GameLogList} from '../../../dummyData/DummyData';
import {getUserLogs} from '../../../services/gameLog.services';

const GameLog = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const user = useSelector(state => state.authReducer.user);

  const goBackHandler = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getUserLogs(user._id, user?.token);
        // console.log('getUserLogs successfull =====>>>', response.data);
        setData(response.data);
      } catch (error) {
        console.log('ERROR in getUserLogs', error.message);
      } finally {
        setLoading(false);
      }
    };
    fnt();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[Colors.blue, Colors.white]}
            refreshing={loading}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/header.png')}
          style={{width: Dim.w, height: Dim.w * 0.45, marginBottom: 20}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>GAME LOG</Text>
        </ImageBackground>

        {data &&
          data.length > 0 &&
          data.map((v, i) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('GameLogDetails', {logId: v._id})
                }
                style={styles.gameView}>
                <View style={styles.vsView}>
                  <Text style={styles.name}>{v.general.homeTeam}</Text>
                  <View style={styles.line} />
                  <Text style={styles.vsTxt}>VS</Text>
                  <View style={styles.line} />
                  <Text style={styles.name}>{v.general.visitorTeam}</Text>
                </View>

                <View style={styles.subTxtView}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: Colors.goldenBrown,
                        fontFamily: Fonts.regular,
                      }}>
                      Winner:
                    </Text>
                    <Text style={styles.greyTxt}> {v.winnerTeam.teamName}</Text>
                  </View>
                  <Text style={styles.greyTxt}>Date: 12/12/12</Text>
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
