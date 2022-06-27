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

import SuccessOverlay from '../../../components/overlays/SuccessOverlay';
import ErrorOverlay from '../../../components/overlays/ErrorOverlay';
import {createUser} from '../../../services/user.services';
import {useSelector} from 'react-redux';

const initialState = {
  userName: '',
  email: '',
  password: '',
  contactNumber: '',
  deviceTokens: '',
};

const CreateUser = props => {
  const [initialStateForm, setInitialStateForm] = useState(initialState);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.authReducer.user);

  const handleFormChange = (name, value) => {
    setInitialStateForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleSuccessModal = () => {
    setVisible(true);
    setTimeout(() => {
      props.navigation.goBack();
      setVisible(false);
    }, 2500);
  };

  const handleCreate = async () => {
    // console.log(initialStateForm);
    try {
      setLoading(true);
      const response = await createUser(initialStateForm, user?.token);
      // console.log('request workingggggg', response.data);
      toggleSuccessModal();
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
          style={{width: Dim.w, height: Dim.w * 0.45}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>CREATE USER</Text>
        </ImageBackground>

        <Image
          source={require('../../../assets/icons/dashboard.png')}
          style={styles.logo}
        />

        <TextInput
          placeholderTextColor={Colors.grey}
          placeholder="User Name"
          style={styles.input}
          value={initialStateForm.userName}
          onChangeText={text => handleFormChange('userName', text)}
        />

        <TextInput
          placeholderTextColor={Colors.grey}
          placeholder="User Email Address"
          style={styles.input}
          value={initialStateForm.email}
          onChangeText={text => handleFormChange('email', text)}
        />

        <TextInput
          placeholderTextColor={Colors.grey}
          placeholder="Contact Number"
          style={styles.input}
          keyboardType="phone-pad"
          value={initialStateForm.contactNumber}
          onChangeText={text => handleFormChange('contactNumber', text)}
        />

        <TextInput
          placeholderTextColor={Colors.grey}
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          value={initialStateForm.password}
          onChangeText={text => handleFormChange('password', text)}
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
          isVisible={visible}
          type="User has been created successfully!"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateUser;

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
    fontFamily: Fonts.medium,
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
});
