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
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';

import ColorPallete from '../../../components/overlays/ColorPallete';
import ErrorOverlay from '../../../components/overlays/ErrorOverlay';
import SuccessOverlay from '../../../components/overlays/SuccessOverlay';

import {useSelector} from 'react-redux';
import {editTeam, getOneTeam} from '../../../services/team.services';

const initialState = {
  teamId: '',
  teamName: '',
  teamNickName: '',
  teamColor: '',
  coachCell: '',
};

const EditTeam = props => {
  const [initialStateForm, setInitialStateForm] = useState(initialState);
  const [visible, setVisible] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [error, setError] = useState(null);
  const [getTeamLoading, setGetTeamLoading] = useState(false);
  const [updateTeamLoader, setUpdateTeamLoader] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const user = useSelector(state => state.authReducer.user);

  const tid = props.route.params.team_id;
  // console.log(' team id FOUND in EditTeam', tid);

  const handleGroupModal = () => {
    setGroupModal(!groupModal);
  };

  const toggleColor = () => {
    setVisible(!visible);
  };

  const toggleSuccessModal = () => {
    // setIsVisible(false);
    setSuccessVisible(!successVisible);
    setTimeout(() => {
      props.navigation.goBack();
      setSuccessVisible(false);
    }, 2500);
  };

  const handleFormChange = (name, value) => {
    setInitialStateForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    (async () => {
      try {
        setGetTeamLoading(true);
        let response = await getOneTeam(tid, user?.token);
        console.log('getOneTeam resp ==>> ', response.data);
        // setTeamDetails()
        handleFormChange('teamId', response.data._id);
        handleFormChange('teamName', response.data.teamName);
        handleFormChange('teamNickName', response.data.teamNickName);
        handleFormChange('coachCell', response.data.coachCell);

        handleFormChange('teamColor', response.data.teamColor);
      } catch (e) {
        console.log('Err at getOneTeam', e);
      } finally {
        setGetTeamLoading(false);
      }
    })();
  }, [tid]);

  useEffect(() => {
    handleFormChange('teamColor', selectedColor?.name);
    handleFormChange('teamId', tid);
  }, [selectedColor]);

  const handleUpdate = async () => {
    try {
      setUpdateTeamLoader(true);
      const response = await editTeam(initialStateForm, user?.token);
      // console.log('editTeam request workingggggg', response.data);
      toggleSuccessModal();
      props.navigation.goBack();
    } catch (e) {
      setError(e);
      console.log('errorrrrrrr in api', e);
    } finally {
      setUpdateTeamLoader(false);
    }
  };

  const goBackHandler = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <ErrorOverlay
        onBackdropPress={() => setError(null)}
        visible={error ? true : false}
        // message={'Error while updating team'}
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
            refreshing={getTeamLoading}
            // onRefresh={() => RefreshPage()}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/header.png')}
          style={styles.imgHeader}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>EDIT TEAM</Text>
        </ImageBackground>

        <View style={styles.logoView}>
          <Image
            style={styles.smallLogo}
            source={require('../../../assets/icons/create.png')}
          />
          <Image
            style={styles.logo}
            source={require('../../../assets/icons/create.png')}
          />
          <Image
            style={styles.smallLogo}
            source={require('../../../assets/icons/create.png')}
          />
        </View>

        <TextInput
          placeholder="Team Name"
          placeholderTextColor={Colors.grey}
          editable={false}
          value={initialStateForm.teamName}
          style={styles.input}
        />

        <TextInput
          placeholder="Team Nickname"
          placeholderTextColor={Colors.grey}
          style={styles.input}
          value={initialStateForm.teamNickName}
          onChangeText={text => handleFormChange('teamNickName', text)}
        />

        <TextInput
          placeholderTextColor={Colors.grey}
          placeholder="Team Coach contact number"
          keyboardType="name-phone-pad"
          style={styles.input}
          value={initialStateForm.coachCell}
          onChangeText={text => handleFormChange('coachCell', text)}
        />

        <View style={styles.rowView}>
          <View style={{...styles.row, width: Dim.w * 0.85}}>
            <TextInput
              placeholderTextColor={Colors.grey}
              placeholder="Select group"
              style={{...styles.input, width: Dim.w * 0.8}}
              editable={false}
              // value={selectedRule?.ruleName}
            />
            <TouchableOpacity
              onPress={handleGroupModal}
              style={{top: 3, marginLeft: 3}}>
              <Entypo name="chevron-down" size={20} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* <AllRulesModal
          data={allRules}
          setSelectedRule={handleSelectGroup}
          groupModal={groupModal}
          closeModal={() => handleGroupModal(false)}
        /> */}

        <View style={styles.row}>
          <TextInput
            placeholderTextColor={Colors.grey}
            placeholder="Select Team Colour"
            style={{...styles.input, width: Dim.w * 0.65, marginVertical: 10}}
            editable={false}
            value={initialStateForm?.teamColor}
            onChangeText={text => handleFormChange('teamColor', text)}
          />
          <View
            style={{
              ...styles.colorBall,
              backgroundColor: initialStateForm?.teamColor,
            }}
          />
          <TouchableOpacity
            onPress={toggleColor}
            style={{top: 3, width: Dim.w * 0.05}}>
            <Entypo name="chevron-down" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>

        <ColorPallete
          onBackdropPress={() => toggleColor(false)}
          isVisible={visible}
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
        />

        <TouchableOpacity onPress={handleUpdate} style={styles.saveBtn}>
          {updateTeamLoader ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{color: Colors.white, fontFamily: Fonts.medium}}>
              SAVE
            </Text>
          )}
        </TouchableOpacity>

        <SuccessOverlay
          onBackdropPress={() => toggleSuccessModal(false)}
          isVisible={successVisible}
          type="Team has been edited successfully!"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditTeam;

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
    fontSize: 23,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: Dim.w * 0.1,
    // width: Dim.w * 0.5,
  },
  imgHeader: {
    width: Dim.w,
    height: Dim.w * 0.45,
  },
  logoView: {
    flexDirection: 'row',
    width: Dim.w * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Dim.w * 0.1,
  },
  smallLogo: {
    width: Dim.w * 0.155,
    height: Dim.w * 0.15,
  },
  logo: {
    width: Dim.w * 0.255,
    height: Dim.w * 0.25,
  },
  input: {
    width: Dim.w * 0.85,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkBlue,
    alignSelf: 'center',
    paddingVertical: 5,
    marginBottom: 10,
    color: Colors.darkBlue,
    fontFamily: Fonts.regular,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.85,
    alignSelf: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'center', alignSelf: 'center'},
  gender: {
    fontSize: 16,
    color: Colors.darkBlue,
    width: Dim.w * 0.85,
    alignSelf: 'center',
    marginVertical: 10,
    fontFamily: Fonts.bold,
  },
  colorBall: {
    width: Dim.w * 0.05,
    height: Dim.w * 0.05,
    backgroundColor: 'red',
    borderRadius: 100,
    marginHorizontal: Dim.w * 0.05,
    borderWidth: 1,
    borderColor: Colors.grey,
    top: 5,
  },
  addView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.85,
    marginTop: 15,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  addTxt: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    marginRight: 15,
    color: Colors.darkBlue,
  },
  saveBtn: {
    width: 80,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: Dim.w * 0.075,
    marginVertical: 20,
  },
});
