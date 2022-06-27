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
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';

import ErrorOverlay from '../../../components/overlays/ErrorOverlay';
import SuccessOverlay from '../../../components/overlays/SuccessOverlay';

import {editUser} from '../../../services/user.services';
import {useSelector} from 'react-redux';

const initialState = {
  userId: '',
  userName: '',
  email: '',
  contactNumber: '',
  // password: '',
};

const EditUser = props => {
  const [initialStateForm, setInitialStateForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const user = useSelector(state => state.authReducer.user);
  const userId = props.route.params.userId;

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
    handleFormChange('userId', userId);
  }, []);

  const handleCreate = async () => {
    // console.log(initialStateForm);
    try {
      setLoading(true);
      const response = await editUser(initialStateForm, user?.token);
      // console.log('editUser request workingggggg', response.data);
      toggleSuccessModal();
      props.navigation.goBack();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/header.png')}
          style={{width: Dim.w, height: Dim.w * 0.45}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>EDIT USER</Text>
        </ImageBackground>

        <Image
          source={require('../../../assets/icons/dashboard.png')}
          style={styles.logo}
        />

        <TextInput
          placeholder="user name"
          onChangeText={text => handleFormChange('userName', text)}
          style={styles.input}
        />

        <TextInput
          placeholder="user email"
          onChangeText={text => handleFormChange('email', text)}
          style={styles.input}
        />

        <TextInput
          placeholder="contact number"
          onChangeText={text => handleFormChange('contactNumber', text)}
          style={styles.input}
        />

        {/* <TextInput
          placeholderTextColor={Colors.grey}
          placeholder="Old Password"
          style={styles.input}
          secureTextEntry={true}
        /> */}

        <TextInput
          placeholderTextColor={Colors.grey}
          placeholder="New Password"
          onChangeText={text => handleFormChange('password', text)}
          style={styles.input}
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={handleCreate} style={styles.saveBtn}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveTxt}>SAVE</Text>
          )}
        </TouchableOpacity>

        <SuccessOverlay
          onBackdropPress={() => toggleSuccessModal(false)}
          isVisible={successVisible}
          type="User has been edited successfully!"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditUser;

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
  logo: {
    width: Dim.w * 0.38,
    height: Dim.w * 0.2,
    alignSelf: 'center',
    marginVertical: Dim.w * 0.1,
    tintColor: Colors.darkBlue,
  },
  input: {
    width: Dim.w * 0.85,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkBlue,
    alignSelf: 'center',
    paddingVertical: 5,
    marginBottom: 10,
    color: Colors.darkBlue,
    fontSize: 15,
    fontFamily: Fonts.regular,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
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
  saveTxt: {
    color: Colors.white,
    fontFamily: Fonts.medium,
  },
});
