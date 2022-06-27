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
  ActivityIndicator,
} from 'react-native';
import {Colors, Dim} from '../../constants/Theme';
import {Fonts} from '../../constants/fonts';
import {loginUserAction} from '../../redux/actions/auth.actions';
import {useSelector, useDispatch} from 'react-redux';
import ErrorOverlay from '../../components/overlays/ErrorOverlay';
import {getDeviceTokenFCM} from '../../utils/firebaseConfig';

const initialState = {
  email: '',
  password: '',
  deviceTokens: '',
};

const Login = props => {
  const dispatch = useDispatch();
  const deviceToken = useSelector(state => state.authReducer.deviceToken);
  const [initialStateForm, setInitialStateForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (deviceToken) {
      handleFormChange('deviceTokens', deviceToken);
    } else {
      handleSetDeviceToken();
    }
  }, [deviceToken]);

  const handleSetDeviceToken = async () => {
    let res = await getDeviceTokenFCM();
    dispatch({
      type: 'DEVICE_TOKEN',
      payload: res,
    });
  };

  const handleFormChange = (name, value) => {
    setInitialStateForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    dispatch(
      loginUserAction(initialStateForm, props.navigation, setLoading, setError),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <ErrorOverlay
        onBackdropPress={() => setError(null)}
        visible={error ? true : false}
        message={error?.response?.data?.message || error?.message}
        // message={'Error while updating team'}
      />
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/header.png')}
          style={styles.img}
        />

        <Image
          source={require('../../assets/icons/dashboard.png')}
          style={styles.logo}
        />

        <TextInput
          placeholder="Email Address"
          placeholderTextColor={Colors.blue}
          selectionColor={Colors.darkBlue}
          style={styles.input}
          value={initialStateForm.email}
          onChangeText={text => handleFormChange('email', text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={Colors.blue}
          selectionColor={Colors.darkBlue}
          style={styles.input}
          value={initialStateForm.password}
          onChangeText={text => handleFormChange('password', text)}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
          {loading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.btnTxt}>Login</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  img: {
    width: Dim.w,
    height: Dim.w * 0.45,
  },
  backBtn: {
    padding: Dim.w * 0.05,
    paddingBottom: Dim.w * 0.02,
  },
  logo: {
    width: Dim.w * 0.5,
    height: Dim.w * 0.26,
    alignSelf: 'center',
    marginVertical: Dim.w * 0.2,
    tintColor: Colors.darkBlue,
  },
  input: {
    width: Dim.w * 0.8,
    alignSelf: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.black,
    padding: 3,
    marginBottom: 20,
    color: Colors.darkBlue,
    fontFamily: Fonts.regular,
  },
  loginBtn: {
    width: Dim.w * 0.7,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkBlue,
    paddingVertical: 10,
    marginVertical: 10,
    marginBottom: 50,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});
