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
  Image,
  RefreshControl,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import DownloadOverlay from '../../../components/overlays/DownloadedOverlay';

import {useSelector} from 'react-redux';
import {getOneLog} from '../../../services/gameLog.services';

const GameLogDetails = props => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const user = useSelector(state => state.authReducer.user);
  const logId = props.route.params.logId;
  // console.log('<< GAME LOG ID FOUND >>', logId);

  const toggleDownload = () => {
    setVisible(!visible);
    setTimeout(() => {
      props.navigation.goBack();
      setVisible(false);
    }, 2500);
  };

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getOneLog(logId, user?.token);
        console.log(
          '<< GET ONE LOG !!! getOneLog  >>>',
          response.data.activityLog,
        );
        setData(response.data);
      } catch (err) {
        console.log('errorrrrrr in team details', err);
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
          style={{width: Dim.w, height: Dim.w * 0.45}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>GAME LOG</Text>
        </ImageBackground>
        <TouchableOpacity onPress={toggleDownload} style={styles.downloadBtn}>
          <Octicons name="download" size={23} color={Colors.darkBlue} />
        </TouchableOpacity>
        <DownloadOverlay
          onBackdropPress={() => toggleDownload(false)}
          isVisible={visible}
        />
        <View style={styles.goalNumView}>
          {/* <View> */}
          <Image
            style={styles.crown}
            source={require('../../../assets/icons/crown.png')}
          />
          <ImageBackground
            style={styles.sprinkles}
            source={require('../../../assets/images/sprinkle.png')}>
            <Text style={styles.goalNum}>02</Text>
          </ImageBackground>
          {/* </View> */}
          <Text style={{...styles.goalNum, marginRight: 8}}>:</Text>
          <Text style={styles.goalNum}>01</Text>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.right}>
            <Text style={{...styles.greyTxt, color: Colors.goldenBrown}}>
              Winner Team
            </Text>
            <Text style={styles.subTxt}>{data?.winnerTeam.teamName}</Text>
          </View>
          <View>
            <Text style={styles.greyTxt}>Other Team</Text>
            <Text style={styles.subTxt}>{data?.otherTeam.teamName}</Text>
          </View>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.right}>
            <Text style={styles.greyTxt}>Season</Text>
            <Text style={styles.subTxt}>{data?.general.season}</Text>
          </View>
          <View>
            <Text style={styles.greyTxt}>Date</Text>
            <Text style={styles.subTxt}>12/12/12</Text>
          </View>
        </View>
        <View style={{...styles.midContainer, marginBottom: 5}}>
          <View style={styles.right}>
            <Text style={styles.greyTxt}>Location</Text>
            <Text style={styles.subTxt}>{data?.general.location} </Text>
          </View>
          <View>
            <Text style={styles.greyTxt}>Home Team</Text>
            <Text style={styles.subTxt}>{data?.general.homeTeam}</Text>
          </View>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.right}>
            <Text style={styles.greyTxt}>Goalie</Text>
            <Text style={styles.subTxt}>{data?.winnerTeam.goalie}</Text>
          </View>
          <View>
            <Text style={styles.greyTxt}>Goalie</Text>
            <Text style={styles.subTxt}>{data?.otherTeam.goalie}</Text>
          </View>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.right}>
            <Text style={styles.greyTxt}>In-Home Player</Text>
            <Text style={styles.subTxt}>{data?.winnerTeam.inHome}</Text>
          </View>
          <View>
            <Text style={styles.greyTxt}>In-Home Player</Text>
            <Text style={styles.subTxt}>{data?.otherTeam.inHome}</Text>
          </View>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.right}>
            <Text style={styles.greyTxt}>Referee</Text>
            <Text style={styles.subTxt}>{data?.general.referee1}</Text>
          </View>
          <View>
            <Text style={styles.greyTxt}>Umpire</Text>
            <Text style={styles.subTxt}>{data?.general.referee2}</Text>
          </View>
        </View>
        <Text style={styles.activityHeading}>Activity Log</Text>
        <View style={styles.activityLogView}>
          {data?.activityLog.map((v, i) => {
            return (
              <Text style={styles.activityTxt}>
                {v.team} - {v?.clockTime && v.clockTime} -{' '}
                {v.statement && v.statement} - #{v?.jersey && v.jersey}{' '}
                {v?.player && v.player}
              </Text>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameLogDetails;

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
    fontSize: 33,
    fontFamily: Fonts.heading,
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
  },
  downloadBtn: {
    width: Dim.w * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  goalNumView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    // backgroundColor: 'pink',
  },
  crown: {
    width: 20,
    height: 20,
    bottom: 35,
    left: 20,
  },
  sprinkles: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginRight: 3,
  },
  goalNum: {
    fontFamily: Fonts.bold,
    fontSize: 40,
    color: Colors.darkBlue,
  },
  midContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: Dim.w * 0.9,
    alignSelf: 'center',
    // backgroundColor: 'yellow',
    // justifyContent: 'space-between',
  },
  greyTxt: {
    color: Colors.darkBlue,
    fontFamily: Fonts.semiBold,
  },
  right: {
    width: Dim.w * 0.5,
    marginRight: Dim.w * 0.05,
  },
  subTxt: {
    color: Colors.blue,
    fontFamily: Fonts.medium,
  },
  activityLogView: {
    backgroundColor: Colors.lightgrey,
    width: Dim.w * 0.9,
    alignSelf: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  activityHeading: {
    color: Colors.darkBlue,
    fontFamily: Fonts.bold,
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  activityTxt: {
    marginBottom: 2,
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.black,
  },
});

const activityLog = [
  {
    teamName: 'WILDCATS',
    time: '02:22',
    playerNo: '12',
    playerName: 'Ronald',
    activity: 'Ground Ball',
  },
  {
    teamName: 'TIGERS',
    time: '01:55',
    playerNo: '4',
    playerName: 'Alex',
    activity: 'Clear Successful',
  },
  {
    teamName: 'TIGERS',
    time: '00:55',
    playerNo: '7',
    playerName: 'Harry',
    activity: 'Clear Failed',
  },
  {
    teamName: 'WILDCATS',
    time: '02:10',
    activity: 'Faceoff',
  },
];
