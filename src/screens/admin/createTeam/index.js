import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';

import ColorPallete from '../../../components/overlays/ColorPallete';
import SuccessOverlay from '../../../components/overlays/SuccessOverlay';
import AllUsersModal from '../../../components/modals/AllUsersModal';
import AllRulesModal from '../../../components/modals/AllRulesModal';
import ErrorOverlay from '../../../components/overlays/ErrorOverlay';

import {createTeam} from '../../../services/team.services';
import {useSelector} from 'react-redux';

const initialState = {
  teamOwner: '',
  teamName: '',
  teamNickName: '',
  teamColor: '',
  gameRules: '',
  coachCell: '',
};

const CreateTeam = props => {
  const user = useSelector(state => state.authReducer.user);

  const goBackHandler = () => {
    props.navigation.goBack();
  };

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleColor = () => {
    setVisible(!visible);
  };

  const toggleSuccessModal = () => {
    setVisible2(true);
    setTimeout(() => {
      props.navigation.goBack();
      setVisible2(false);
    }, 2500);
  };

  // XXXXXXXXXXXXX APIs XXXXXXXXXXXXXXXX

  const allUsers = useSelector(state => state.userReducer.allUsers);
  const allRules = useSelector(state => state.gameReducer.allRules);

  const [userModal, setUserModal] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);
  const [initialStateForm, setInitialStateForm] = useState(initialState);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleFormChange = (name, value) => {
    setInitialStateForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectUser = val => {
    // console.log('valueeeeeeee userrrrr =>>>>> ', val);
    setSelectedUser(val);
    handleFormChange('teamOwner', val._id);
    setUserModal(false);
    // console.log('lllllllllll', selectedUser);
  };

  const handleSelectGroup = val => {
    // console.log('valueeeeeeee ruleee ====>>XXX', val);
    setSelectedRule(val);
    handleFormChange('gameRules', val._id);
    setGroupModal(false);
  };

  const handleUserModal = () => {
    setUserModal(!userModal);
  };

  const handleGroupModal = () => {
    setGroupModal(!groupModal);
  };

  useEffect(() => {
    handleFormChange('teamColor', selectedColor?.name);
  }, [selectedColor]);

  const handleCreate = async () => {
    // console.log(initialStateForm);
    try {
      setLoading(true);
      const response = await createTeam(initialStateForm, user?.token);
      // console.log('createTeam request workingggggg', response.data);
      toggleSuccessModal();
      // props.navigation.goBack();
    } catch (e) {
      setError(e);
      // console.log('errorrrrrrr in api', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <Image
        style={{position: 'absolute', bottom: 0}}
        source={require('../../../assets/images/racket.png')}
      />
      <ErrorOverlay
        onBackdropPress={() => setError(null)}
        visible={error ? true : false}
        message={error?.response?.data?.message || error?.message}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/header.png')}
          style={styles.header}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>CREATE TEAM</Text>
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

        <View style={styles.rowView}>
          <View style={{...styles.row, width: Dim.w * 0.85}}>
            <TextInput
              placeholderTextColor={Colors.grey}
              placeholder="Username"
              style={{...styles.input, width: Dim.w * 0.75}}
              editable={false}
              value={selectedUser?.userName}
            />
            <TouchableOpacity onPress={handleUserModal} style={{top: 3}}>
              <Entypo name="chevron-down" size={20} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          placeholderTextColor={Colors.grey}
          placeholder="Team Name"
          style={styles.input}
          value={initialStateForm.teamName}
          onChangeText={text => handleFormChange('teamName', text)}
        />
        <TextInput
          placeholderTextColor={Colors.grey}
          placeholder="Team Nickname"
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
              style={{...styles.input, width: Dim.w * 0.75}}
              editable={false}
              value={selectedRule?.ruleName}
            />
            <TouchableOpacity onPress={handleGroupModal} style={{top: 3}}>
              <Entypo name="chevron-down" size={20} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        <AllUsersModal
          data={allUsers}
          setSelectedUser={handleSelectUser}
          userModal={userModal}
          closeModal={() => handleUserModal(false)}
        />
        <AllRulesModal
          data={allRules}
          setSelectedRule={handleSelectGroup}
          groupModal={groupModal}
          closeModal={() => handleGroupModal(false)}
        />

        <View style={styles.row}>
          <TextInput
            placeholderTextColor={Colors.grey}
            placeholder="Select Team Colour"
            style={{...styles.input, width: Dim.w * 0.65, marginVertical: 10}}
            editable={false}
            value={initialStateForm?.teamColor}
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

        <TouchableOpacity onPress={handleCreate} style={styles.saveBtn}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{color: Colors.white, fontFamily: Fonts.medium}}>
              CREATE
            </Text>
          )}
        </TouchableOpacity>

        <SuccessOverlay
          onBackdropPress={() => toggleSuccessModal(false)}
          isVisible={visible2}
          type="Team has been created successfully!"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: Dim.w * 0.05,
    paddingBottom: Dim.w * 0.02,
  },
  header: {
    width: Dim.w,
    height: Dim.w * 0.45,
  },
  headerTxt: {
    fontSize: 33,
    fontFamily: Fonts.heading,
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
  },
  logoView: {
    flexDirection: 'row',
    width: Dim.w * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
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
    fontFamily: Fonts.medium,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.85,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
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
    // backgroundColor: 'red',
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
    fontWeight: 'bold',
    marginRight: 15,
    color: Colors.darkBlue,
  },
  saveBtn: {
    width: 80,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: Dim.w * 0.075,
    marginVertical: 20,
  },
});
