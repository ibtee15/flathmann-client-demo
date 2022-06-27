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
  TextInput,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import UserTeamsList from '../../../components/modals/UserTeamsModal';
import OppTeamsList from '../../../components/modals/OppTeamsModal';
import HomeTeamList from '../../../components/modals/HomeTeamModal';
import LicensePlayersList from '../../../components/modals/LicensePlayersModal';
import OppPlayerslist from '../../../components/modals/OppPlayersModal';
import SeasonOverlay from '../../../components/modals/SeasonModal';

import {getUserTeams} from '../../../services/team.services';
import {getAllTeams} from '../../../services/team.services';
import {getTeamPlayers} from '../../../services/player.services';
// import {getOneRule} from '../../../services/game.services';

import {useSelector, useDispatch} from 'react-redux';
import {formObjectIsEmpty} from '../../../utils/Validations';

const teamAState = {
  teamId: '',
  teamName: '',
  goalie: '',
  inHome: '',
  timeoutsLeft: '',
  // penalties: [],
  players: [],
};

const teamBState = {
  teamId: '',
  teamName: '',
  goalie: '',
  inHome: '',
  timeoutsLeft: '',
  // penalties: [],
  players: [],
};

const generalDetails = {
  location: '',
  season: '',
  homeTeam: '',
  visitorTeam: '',
  referee1: '',
  referee2: '',
};

const CreateClockStats = props => {
  const dispatch = useDispatch();
  const rules = useSelector(state => state.clockStatsReducer.rules);
  const user = useSelector(state => state.authReducer.user);
  // console.log('uiddd in CreateClockStats =>>', user);
  /////// SET SELECTED

  const [teamAFormState, setTeamAFormState] = useState(teamAState);
  const [teamBFormState, setTeamBFormState] = useState(teamBState);
  const [generalFormState, setGeneralFormState] = useState(generalDetails);

  const [selectedMyTeam, setSelectedMyTeam] = useState(null);
  const [selectedOppTeam, setSelectedOppTeam] = useState(null);

  const [selectedGoalieTeamA, setSelectedGoalieTeamA] = useState(null);
  const [selectedGoalieTeamB, setSelectedGoalieTeamB] = useState(null);
  const [selectedInHomeA, setSelectedInHomeA] = useState(null);
  const [selectedInHomeB, setSelectedInHomeB] = useState(null);

  const [defaultRules, setDefaultRules] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleFormChangeA('teamId', selectedMyTeam?._id);
    handleFormChangeA('teamName', selectedMyTeam?.teamName);
    handleFormChangeA('goalie', selectedGoalieTeamA?.playerName);
    handleFormChangeA('inHome', selectedInHomeA?.playerName);
  }, [selectedGoalieTeamA, selectedMyTeam, selectedInHomeA]);

  useEffect(() => {
    handleFormChangeB('teamId', selectedOppTeam?._id);
    handleFormChangeB('teamName', selectedOppTeam?.teamName);
    handleFormChangeB('goalie', selectedGoalieTeamB?.playerName);
    handleFormChangeB('inHome', selectedInHomeB?.playerName);
  }, [selectedGoalieTeamB, selectedOppTeam, selectedInHomeB]);

  useEffect(() => {
    if (rules) {
      handleFormChangeA('timeoutsLeft', Number(rules.timeoutsPerHalf) * 2);
      handleFormChangeB('timeoutsLeft', Number(rules.timeoutsPerHalf) * 2);
    }
  }, [rules]);
  ///////// VISIBLE

  const [myTeamVisible, setmyTeamVisible] = useState(false);
  const [opptTeamVisible, setOppTeamVisible] = useState(false);
  const [homeTeamVisible, setHomeTeamVisible] = useState(false);

  const [myGoalieVisible, setmyGoalieVisible] = useState(false);
  const [oppGoalieVisible, setOppGoalieVisible] = useState(false);
  const [myInHomeVisible, setmyInHomeVisible] = useState(false);
  const [oppInHomeVisible, setoppInHomeVisible] = useState(false);

  const [seasonVisible, setSeasonVisible] = useState(false);

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

  ////////TOGGLES
  const toggleLicenseTeam = () => {
    setmyTeamVisible(!myTeamVisible);
  };
  const toggleOppTeam = () => {
    setOppTeamVisible(!opptTeamVisible);
  };

  const toggleHomeTeam = () => {
    setHomeTeamVisible(!homeTeamVisible);
  };

  const toggleMyTeamGoalie = () => {
    setmyGoalieVisible(!myGoalieVisible);
  };

  const toggleMyTeamInHome = () => {
    setmyInHomeVisible(!myInHomeVisible);
  };

  const toggleOppTeamGoalie = () => {
    setOppGoalieVisible(!oppGoalieVisible);
  };

  const toggleOppTeamInHome = () => {
    setoppInHomeVisible(!oppInHomeVisible);
  };

  const toggleSeasonOverlay = () => {
    setSeasonVisible(!seasonVisible);
  };
  const goBackHandler = props => {
    props.navigation.goBack();
  };

  const [teamData, setTeamData] = useState(null);
  const [oppTeamData, setOppTeamData] = useState(null);
  const [myplayersData, setmyPlayersData] = useState(null);
  const [oppPlayersData, setoppPlayersData] = useState(null);

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

  useEffect(
    () => {
      if (teamData) {
        (async () => {
          try {
            const response = await getTeamPlayers(
              selectedMyTeam._id,
              user?.token,
            );
            console.log(
              // 'LICENSE getTeamPlayers successfull =====>>>',
              response.data,
            );
            setmyPlayersData(response.data);
            handleFormChangeA('players', response.data);
          } catch (error) {
            console.log('errorrrrrrr in LICENSE getTeamPlayers', error);
          }
        })();
      }
    },
    // [teamData],
    [selectedMyTeam],
  );

  useEffect(
    () => {
      if (oppTeamData) {
        (async () => {
          try {
            const response = await getTeamPlayers(
              selectedOppTeam._id,
              user?.token,
            );
            console.log(
              'OPPONENT getTeamPlayers successfull =====>>>',
              response.data,
            );
            setoppPlayersData(response.data);
            handleFormChangeB('players', response.data);
          } catch (error) {
            console.log('errorrrrrrr in OPPONENT getTeamPlayers', error);
          }
        })();
      }
    },
    //  [oppTeamData]
    [selectedOppTeam],
  );

  const handleSave = () => {
    if (formObjectIsEmpty(teamAFormState)) {
      alert('Team A detail fields are empty');
      return;
    }
    if (formObjectIsEmpty(teamBFormState)) {
      alert('Team B detail fields are empty');
      return;
    }
    if (formObjectIsEmpty(generalFormState)) {
      alert('General detail fields are empty');
      return;
    }
    if (formObjectIsEmpty(rules)) {
      alert('Game rules and clock setting should be set');
      return;
    }
    dispatch({
      type: 'TEAM_A_DETAILS',
      payload: teamAFormState, // teamA wala initialFPrmsState
    });
    dispatch({
      type: 'TEAM_B_DETAILS',
      payload: teamBFormState, // teamB wala initialFPrmsState
    });
    dispatch({type: 'CLEAR_ACTIVITY_LOG'});
    dispatch({type: 'GENERAL_DETAILS', payload: generalFormState});

    // navigation go back
    props.navigation.navigate('ClockWithStats');
  };

  // For getting rules
  // React.useMemo(() => {
  //   if (selectedMyTeam) {
  //     const fnt = async () => {
  //       try {
  //         setLoading(true);
  //         const response = await getOneRule(selectedMyTeam?.gameRules);
  //         setDefaultRules(response.data);
  //       } catch (error) {
  //         console.log('errorr in rule', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fnt();
  //   }
  // }, [selectedMyTeam]);

  // React.useMemo(() => {
  //   if (defaultRules) {
  //     dispatch({type: 'GAME_RULES', payload: initialFormState});
  //   }
  // }, [defaultRules]);

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
          style={{width: Dim.w, height: Dim.w * 0.45}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>CREATE GAME</Text>
        </ImageBackground>

        <View style={styles.horizontalView}>
          {/* XXXXXXXXXXXXXXXX */}
          {/* XXXXXXXXXXXXXXXX */}
          {/* XXXXXXXXXXXXXXXX */}
          <View>
            <View style={{height: 25, width: 25}} />
            <View style={styles.myTeamBtn}>
              <TextInput
                placeholder="License Team"
                placeholderTextColor={Colors.whiteO}
                style={styles.inputMyTeam}
                selectionColor={Colors.white}
                editable={false}
                value={selectedMyTeam?.teamName}
                // value={teamAFormState.teamA}
                // onChangeText={handleFormChangeA()}
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

            <View
              style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
              <TextInput
                placeholder="Home Team"
                placeholderTextColor={Colors.blue}
                style={{...styles.inputMyTeam, color: Colors.darkBlue}}
                selectionColor={Colors.darkBlue}
                editable={false}
                // value={selectedHomeTeam}
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
              // setSelectedHomeTeam={setSelectedHomeTeam}
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
                placeholder="Goalie Team A"
                placeholderTextColor={Colors.blue}
                style={{...styles.inputMyTeam, color: Colors.darkBlue}}
                selectionColor={Colors.darkBlue}
                editable={false}
                value={selectedGoalieTeamA?.playerName}
              />
              <TouchableOpacity
                onPress={selectedMyTeam ? toggleMyTeamGoalie : null}>
                <Entypo
                  name="chevron-small-down"
                  size={25}
                  color={Colors.darkBlue}
                />
              </TouchableOpacity>
            </View>

            <LicensePlayersList
              onBackdropPress={() => setmyGoalieVisible(false)}
              visible={myGoalieVisible}
              data={myplayersData}
              setSelectedPlayerA={setSelectedGoalieTeamA}
            />

            <View
              style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
              <TextInput
                placeholder="In Home Player"
                placeholderTextColor={Colors.blue}
                style={{...styles.inputMyTeam, color: Colors.darkBlue}}
                selectionColor={Colors.darkBlue}
                editable={false}
                value={selectedInHomeA?.playerName}
              />
              <TouchableOpacity
                onPress={selectedMyTeam ? toggleMyTeamInHome : null}>
                <Entypo
                  name="chevron-small-down"
                  size={25}
                  color={Colors.darkBlue}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
              <TextInput
                placeholder="Referee"
                placeholderTextColor={Colors.blue}
                style={{...styles.inputMyTeam, color: Colors.darkBlue}}
                selectionColor={Colors.darkBlue}
                value={generalFormState.referee1}
                onChangeText={text =>
                  setGeneralFormState({...generalFormState, referee1: text})
                }
              />
            </View>
          </View>

          <LicensePlayersList
            onBackdropPress={() => setmyInHomeVisible(false)}
            visible={myInHomeVisible}
            data={myplayersData}
            setSelectedPlayerA={setSelectedInHomeA}
          />
          {/* XXXXXXXXXXXXXXXX */}
          {/* XXXXXXXXXXXXXXXX */}
          {/* XXXXXXXXXXXXXXXX */}

          <View>
            <TouchableOpacity
              disabled={selectedOppTeam ? false : true}
              onPress={() =>
                props.navigation.navigate('OpponentTeam', {
                  teamId: selectedOppTeam._id,
                })
              }
              style={{alignSelf: 'flex-end'}}>
              <Entypo name="eye" size={25} color={Colors.darkBlue} />
            </TouchableOpacity>
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

            <View
              style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
              <TextInput
                placeholder="Select Season"
                placeholderTextColor={Colors.blue}
                style={{...styles.inputMyTeam, color: Colors.darkBlue}}
                selectionColor={Colors.darkBlue}
                editable={false}
                // value={season.value}
                value={generalFormState.season}
                // onChangeText={text =>
                //   setGeneralFormState({...generalFormState, season: text})
                // }
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

            <View
              style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
              <TextInput
                placeholder="Goalie Team B"
                placeholderTextColor={Colors.blue}
                style={{...styles.inputMyTeam, color: Colors.darkBlue}}
                selectionColor={Colors.darkBlue}
                editable={false}
                value={selectedGoalieTeamB?.playerName}
              />
              <TouchableOpacity
                onPress={selectedOppTeam ? toggleOppTeamGoalie : null}>
                <Entypo
                  name="chevron-small-down"
                  size={25}
                  color={Colors.darkBlue}
                />
              </TouchableOpacity>
            </View>

            <OppPlayerslist
              onBackdropPress={() => setOppGoalieVisible(false)}
              visible={oppGoalieVisible}
              data={oppPlayersData}
              setSelectedPlayerB={setSelectedGoalieTeamB}
            />

            <View
              style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
              <TextInput
                placeholder="In Home Player"
                placeholderTextColor={Colors.blue}
                style={{...styles.inputMyTeam, color: Colors.darkBlue}}
                selectionColor={Colors.darkBlue}
                editable={false}
                value={selectedInHomeB?.playerName}
              />
              <TouchableOpacity
                onPress={selectedOppTeam ? toggleOppTeamInHome : null}>
                <Entypo
                  name="chevron-small-down"
                  size={25}
                  color={Colors.darkBlue}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
              <TextInput
                placeholder="Umpire"
                placeholderTextColor={Colors.blue}
                style={{...styles.inputMyTeam, color: Colors.darkBlue}}
                selectionColor={Colors.darkBlue}
                value={generalFormState.referee2}
                onChangeText={text =>
                  setGeneralFormState({...generalFormState, referee2: text})
                }
              />
            </View>
          </View>

          <OppPlayerslist
            onBackdropPress={() => setoppInHomeVisible(false)}
            visible={oppInHomeVisible}
            data={oppPlayersData}
            setSelectedPlayerB={setSelectedInHomeB}
          />
          {/* XXXXXXXXXXXXXXXX */}
          {/* XXXXXXXXXXXXXXXX */}
          {/* XXXXXXXXXXXXXXXX */}
        </View>

        <View style={styles.location}>
          <Text style={styles.inputRule}>Location</Text>
          <TextInput
            multiline={true}
            placeholder="enter location"
            value={generalFormState.location}
            onChangeText={text =>
              setGeneralFormState({...generalFormState, location: text})
            }
            style={{padding: 0, fontFamily: Fonts.regular}}
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

export default CreateClockStats;

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
    paddingHorizontal: 5,
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
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.white,
    alignSelf: 'center',
    width: Dim.w * 0.35,
    textAlign: 'center',
  },
  location: {
    width: Dim.w * 0.93,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: Colors.lightgrey,
    paddingHorizontal: 15,
    paddingVertical: 10,
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
