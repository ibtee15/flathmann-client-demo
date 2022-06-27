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
  ImageBackground,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';

import {useSelector} from 'react-redux';
import {getOneTeam} from '../../../services/team.services';
import {getTeamPlayers} from '../../../services/player.services';

const OpponentTeam = props => {
  const user = useSelector(state => state.authReducer.user);
  const [playerData, setPlayerData] = useState(null);
  const [teamData, setTeamData] = useState(null);

  const tid = props.route.params.teamId;
  console.log('opp team ID FOUND', tid);

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getOneTeam(tid, user?.token);
        // console.log('team details successfull =====>>>', response.data);
        setTeamData(response.data);
      } catch (err) {
        console.log('errorrrrrr in team details', err);
      } finally {
        setLoading(false);
      }
    };
    fnt();
  }, []);

  useEffect(() => {
    const fnt = async () => {
      try {
        const response = await getTeamPlayers(tid, user?.token);
        console.log('getTeamPlayers successfull =====>>>', response.data);
        setPlayerData(response.data);
      } catch (error) {
        console.log('errorrrrrrr in getTeamPlayers', error);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/header.png')}
          style={{width: Dim.w, height: Dim.w * 0.45, marginBottom: 20}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>OPPONENT TEAM</Text>
        </ImageBackground>

        <View style={styles.horizontalview}>
          <View style={styles.nameView}>
            <Text style={styles.nameTxt}>Name : {teamData?.teamName}</Text>
          </View>
          <View style={styles.nameView}>
            <Text style={styles.nameTxt}>
              Nickname : {teamData?.teamNickName}
            </Text>
          </View>
        </View>

        <View style={{...styles.horizontalview, marginBottom: 30}}>
          <View style={styles.nameView}>
            <View style={styles.row}>
              <Text style={styles.nameTxt}>
                Team Color : {teamData?.teamColor}
              </Text>
              <View style={styles.colorDot} />
            </View>
          </View>
          <View style={styles.nameView}>
            <Text style={styles.nameTxt}>
              Coach Num : {teamData?.coachCell}
            </Text>
          </View>
        </View>

        <View style={styles.horizontalView}>
          {playerData &&
            playerData.map((v, i) => {
              return (
                <View style={styles.playerView}>
                  <Text style={styles.subHead}>Player #{v.homeJersey}</Text>
                  <View style={styles.line} />
                  <Text style={styles.name}>{v.playerName}</Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OpponentTeam;

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
    fontSize: 33,
    fontFamily: Fonts.heading,
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
  },
  horizontalview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.95,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameView: {
    width: Dim.w * 0.47,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 15,
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
  nameTxt: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: Fonts.heading,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: Colors.red,
    marginLeft: 5,
  },
  horizontalView: {
    width: Dim.w * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
    left: Dim.w * 0.02,
  },
  playerView: {
    width: Dim.w * 0.29,
    padding: 10,
    paddingHorizontal: 5,
    borderRadius: 15,
    backgroundColor: Colors.lightgrey,
    alignItems: 'center',
    marginBottom: 20,
    marginRight: Dim.w * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  subHead: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
  },
  line: {
    width: Dim.w * 0.26,
    height: 1,
    backgroundColor: Colors.bgColour,
    marginVertical: 3,
  },
  name: {
    fontSize: 13,
    color: Colors.blue,
    fontFamily: Fonts.regular,
  },
});
