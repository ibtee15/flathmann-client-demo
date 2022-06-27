import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LicenseClockOnly from '../../../components/containers/clockOnly/LicenseTeam';
import OppClockOnly from '../../../components/containers/clockOnly/OppTeam';
import {useSelector, useDispatch} from 'react-redux';

import SeasonOverlay from '../../../components/modals/SeasonModal';
import UserTeamsList from '../../../components/modals/UserTeamsModal';
import OppTeamsList from '../../../components/modals/OppTeamsModal';
import HomeTeamList from '../../../components/modals/HomeTeamModal';

import {getUserTeams} from '../../../services/team.services';
import {getAllTeams} from '../../../services/team.services';

const teamAState = {
  teamId: '',
  teamName: '',
};

const teamBState = {
  teamId: '',
  teamName: '',
};

const generalDetails = {
  season: '',
  homeTeam: '',
  visitorTeam: '',
};

const CreateClockOnly = props => {
  const dispatch = useDispatch();

  const [selectedMyTeam, setSelectedMyTeam] = useState(null);
  const [selectedOppTeam, setSelectedOppTeam] = useState(null);
  const [selectedHomeTeam, setSelectedHomeTeam] = useState(null);

  const [teamAFormState, setTeamAFormState] = useState(teamAState);
  const [teamBFormState, setTeamBFormState] = useState(teamBState);
  const [generalFormState, setGeneralFormState] = useState(generalDetails);

  useEffect(() => {
    handleFormChangeA('teamId', selectedMyTeam?._id);
    handleFormChangeA('teamName', selectedMyTeam?.teamName);
  }, [selectedMyTeam]);

  useEffect(() => {
    handleFormChangeB('teamId', selectedOppTeam?._id);
    handleFormChangeB('teamName', selectedOppTeam?.teamName);
  }, [selectedOppTeam]);

  ///////// VISIBLE

  const [myTeamVisible, setmyTeamVisible] = useState(false);
  const [opptTeamVisible, setOppTeamVisible] = useState(false);
  const [homeTeamVisible, setHomeTeamVisible] = useState(false);
  const [seasonVisible, setSeasonVisible] = useState(false);

  const user = useSelector(state => state.authReducer.user);
  // console.log('uiddd in CreateClockStats =>>', user);

  const toggleLicenseTeam = () => {
    setmyTeamVisible(!myTeamVisible);
  };
  const toggleOppTeam = () => {
    setOppTeamVisible(!opptTeamVisible);
  };

  const toggleHomeTeam = () => {
    setHomeTeamVisible(!homeTeamVisible);
  };

  const toggleSeasonOverlay = () => {
    setSeasonVisible(!seasonVisible);
  };

  const handleFormChangeA = (name, value) => {
    setTeamAFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormChangeB = (name, value) => {
    setTeamBFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormChangeGeneral = (name, value) => {
    setGeneralFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [teamData, setTeamData] = useState(null);
  const [oppTeamData, setOppTeamData] = useState(null);

  useEffect(() => {
    const fnt = async () => {
      try {
        const response = await getUserTeams(user._id, user?.token);
        // console.log('getUserTeams successfull =====>>>', response.data);
        setTeamData(response.data);
      } catch (error) {
        console.log('errorrrrrrr in all getUserTeams', error);
      }
    };
    fnt();
  }, []);

  useEffect(() => {
    const fnt = async () => {
      try {
        const response = await getAllTeams(user?.token);
        // console.log('getAllTeams list successfull =====>>>', response.data);
        setOppTeamData(response.data);
      } catch (error) {
        console.log('errorrrrrrr in all getAllTeams list', error);
      }
    };
    fnt();
  }, []);

  const handleSave = () => {
    dispatch({
      type: 'TEAM_A_DETAILS',
      payload: teamAFormState, // teamA wala initialFPrmsState
    });
    dispatch({
      type: 'TEAM_B_DETAILS',
      payload: teamBFormState, // teamB wala initialFPrmsState
    });
    dispatch({type: 'GENERAL_DETAILS', payload: generalFormState});
    // navigation go back
    props.navigation.navigate('ClockOnly');
  };

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
          style={{width: Dim.w, height: Dim.w * 0.45}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>CREATE GAME</Text>
        </ImageBackground>

        <Image
          source={require('../../../assets/icons/dashboard.png')}
          style={styles.logo}
        />

        <View style={styles.horizontalView}>
          <View style={styles.myTeamBtn}>
            <TextInput
              placeholder="License Team"
              placeholderTextColor={Colors.whiteO}
              style={styles.inputMyTeam}
              selectionColor={Colors.white}
              editable={false}
              value={selectedMyTeam?.teamName}
            />
            <TouchableOpacity onPress={toggleLicenseTeam}>
              <Entypo
                name="chevron-small-down"
                size={25}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>

          <UserTeamsList
            data={teamData}
            setSelectedMyTeam={setSelectedMyTeam}
            onBackdropPress={() => setmyTeamVisible(false)}
            visible={myTeamVisible}
          />

          <View style={styles.myTeamBtn}>
            <TextInput
              placeholder="Opponent Team"
              placeholderTextColor={Colors.whiteO}
              style={styles.inputMyTeam}
              selectionColor={Colors.white}
              editable={false}
              value={selectedOppTeam?.teamName}
            />
            <TouchableOpacity onPress={toggleOppTeam}>
              <Entypo
                name="chevron-small-down"
                size={25}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>

          <OppTeamsList
            data={oppTeamData}
            setSelectedOppTeam={setSelectedOppTeam}
            onBackdropPress={() => setOppTeamVisible(false)}
            visible={opptTeamVisible}
          />
          {/* <LicenseClockOnly />
          <OppClockOnly navigation={props.navigation} /> */}
        </View>
        <View style={styles.horizontalView}>
          <View
            style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
            <TextInput
              placeholder="Home Team"
              placeholderTextColor={Colors.blue}
              style={{...styles.inputMyTeam, color: Colors.darkBlue}}
              selectionColor={Colors.darkBlue}
              editable={false}
              value={generalFormState.homeTeam}
            />
            <TouchableOpacity
              onPress={
                selectedMyTeam && selectedOppTeam ? toggleHomeTeam : null
              }>
              <Entypo
                name="chevron-small-down"
                size={25}
                color={Colors.darkBlue}
              />
            </TouchableOpacity>
          </View>

          <HomeTeamList
            onBackdropPress={() => setHomeTeamVisible(false)}
            visible={homeTeamVisible}
            licenseTeam={selectedMyTeam?.teamName}
            oppTeam={selectedOppTeam?.teamName}
            setSelectedHomeTeam={val =>
              handleFormChangeGeneral('homeTeam', val)
            }
            setSelectedVisitorTeam={val => {
              handleFormChangeGeneral('visitorTeam', val);
            }}
          />

          <View
            style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
            <TextInput
              placeholder="Select Season"
              placeholderTextColor={Colors.blue}
              style={{...styles.inputMyTeam, color: Colors.darkBlue}}
              selectionColor={Colors.darkBlue}
              editable={false}
              value={generalFormState.season}
            />
            <TouchableOpacity onPress={toggleSeasonOverlay}>
              <Entypo
                name="chevron-small-down"
                size={25}
                color={Colors.darkBlue}
              />
            </TouchableOpacity>
          </View>

          <SeasonOverlay
            onBackdropPress={() => toggleSeasonOverlay(false)}
            setSeason={text =>
              setGeneralFormState({
                ...generalFormState,
                season: text,
              })
            }
            visible={seasonVisible}
          />
        </View>

        <View style={styles.gameRulesView}>
          <Text style={styles.inputRule}>Game Rules & Clock Setting</Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('EditGameRules', {
                ruleId: selectedMyTeam?.gameRules,
              })
            }>
            <FontAwesome5 name="edit" size={20} color={Colors.darkBlue} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnTxt}>Save & Start</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateClockOnly;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: Dim.w * 0.05,
    paddingBottom: Dim.w * 0.02,
  },
  logo: {
    width: Dim.w * 0.27,
    height: Dim.w * 0.14,
    alignSelf: 'center',
    marginVertical: Dim.w * 0.1,
    tintColor: Colors.darkBlue,
  },
  headerTxt: {
    fontSize: 33,
    fontFamily: Fonts.heading,
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
    width: Dim.w * 0.6,
    lineHeight: 33,
  },
  horizontalView: {
    width: Dim.w * 0.95,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myTeamBtn: {
    width: Dim.w * 0.46,
    borderRadius: 15,
    backgroundColor: Colors.darkBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  inputMyTeam: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.white,
    alignSelf: 'center',
    width: Dim.w * 0.3,
    textAlign: 'center',
  },
  gameRulesView: {
    width: Dim.w * 0.93,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.lightgrey,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputRule: {
    color: Colors.darkBlue,
    fontFamily: Fonts.bold,
    width: Dim.w * 0.75,
  },
  saveBtn: {
    paddingVertical: 15,
    backgroundColor: Colors.darkBlue,
    borderRadius: 15,
    width: Dim.w * 0.4,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: Dim.w * 0.05,
    marginBottom: 20,
  },
  saveBtnTxt: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
});
