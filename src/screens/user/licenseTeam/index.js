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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AddPlayerOverlay from '../../../components/overlays/AddPlayer';
import PlayerDetailCard from '../../../components/cards/PlayerDetailCard';
import DeleteOverlay from '../../../components/overlays/DeleteOverlay';
import ErrorOverlay from '../../../components/overlays/ErrorOverlay';
import SuccessOverlay from '../../../components/overlays/SuccessOverlay';

import {useSelector} from 'react-redux';
import {getOneTeam} from '../../../services/team.services';
import {getTeamPlayers} from '../../../services/player.services';
import {deleteTeam} from '../../../services/team.services';

const LicenseTeam = props => {
  const user = useSelector(state => state.authReducer.user);
  const teamId = props.route.params.team_id;

  const [teamData, setTeamData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [successVisible, setSuccessVisible] = useState(false);

  const toggleDelete = () => {
    setIsVisible(!isVisible);
  };

  const toggleAddPlayer = () => {
    setVisible(!visible);
  };

  const toggleSuccessModal = () => {
    setIsVisible(false);
    setSuccessVisible(!successVisible);
    setTimeout(() => {
      props.navigation.navigate('UserDrawerNavigator');
      setSuccessVisible(false);
    }, 2500);
  };

  const goBackHandler = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getOneTeam(teamId, user?.token);
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
    (async () => {
      await handleGetTeamPlayers(user?.token);
    })();
  }, [teamData]);

  const handleGetTeamPlayers = async () => {
    try {
      setLoading(true);
      const response = await getTeamPlayers(teamId, user?.token);
      // console.log('handleGetTeamPlayers ===>>>', response.data);
      setPlayerData(response.data);
    } catch (error) {
      console.log('Err at handleGetTeamPlayers =>> ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    // console.log(initialStateForm);
    try {
      const response = await deleteTeam(teamId, user?.token);
      console.log(' DELETE deleteTeam request workingggggg', response.data);
      toggleSuccessModal();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <ErrorOverlay
        onBackdropPress={() => setError(null)}
        visible={error ? true : false}
        error={error}
        // message={error?.message ? error.message : 'Error while creating team'}
        message={error?.response?.data?.message || error?.message}
      />
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
          style={{width: Dim.w, height: Dim.w * 0.45}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>TEAM DETAILS</Text>
        </ImageBackground>

        <TouchableOpacity onPress={toggleDelete} style={styles.deleteBtn}>
          <MaterialIcons name="delete" size={25} color={Colors.red} />
        </TouchableOpacity>

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

        <View style={styles.horizontalview}>
          <View style={styles.nameView}>
            <View style={styles.row}>
              <Text style={styles.nameTxt}>Color : {teamData?.teamColor}</Text>
              <View style={styles.colorDot} />
            </View>
          </View>
          <View style={styles.nameView}>
            <Text style={styles.nameTxt}>
              Coach Num : {teamData?.coachCell}
            </Text>
          </View>
        </View>

        <View style={styles.horizontalPlayerView}>
          {playerData &&
            playerData.map((v, i) => {
              return (
                <PlayerDetailCard
                  // toggleEditPlayer={toggleEditPlayer}
                  v={v}
                  teamId={teamId}
                  handleGetPlayers={handleGetTeamPlayers}
                  // setSelectedPlayer={setSelectedPlayer}
                />
              );
            })}
        </View>

        <TouchableOpacity onPress={toggleAddPlayer} style={styles.plusBtn}>
          <Entypo name="plus" size={30} color={Colors.white} />
        </TouchableOpacity>

        <AddPlayerOverlay
          onBackdropPress={() => toggleAddPlayer(false)}
          isVisible={visible}
          tid={teamId}
        />

        <DeleteOverlay
          isVisible={isVisible}
          onBackdropPress={() => toggleDelete(false)}
          navigation={props.navigation}
          handleDelete={handleDelete}
        />

        <SuccessOverlay
          onBackdropPress={() => toggleSuccessModal(false)}
          isVisible={successVisible}
          type="Team has been deleted successfully!"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LicenseTeam;

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
  deleteBtn: {
    alignSelf: 'flex-end',
    marginRight: Dim.w * 0.08,
    top: -10,
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
  horizontalPlayerView: {
    width: Dim.w,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  plusBtn: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: Colors.darkBlue,
    alignSelf: 'center',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
