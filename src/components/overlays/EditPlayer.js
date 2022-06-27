import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {Dim, Colors} from '../../constants/Theme';
import {Fonts} from '../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Overlay} from 'react-native-elements';
import DeleteOverlay from '../overlays/DeleteOverlay';
import ErrorOverlay from '../overlays/ErrorOverlay';
import DotSwitch from '../tabSwitch/DotSwitch';
import {updatePlayer} from '../../services/player.services';
import {useSelector} from 'react-redux';

const initialState = {
  playerId: '',
  teamId: '',
  playerName: '',
  email: '',
  homeJersey: '',
  awayJersey: '',
  position1: '',
  position2: '',
  height: '',
  weight: '',
  grade: '',
  phone: '',
  isCaptain: false,
};

const EditPlayerOverlay = props => {
  const user = useSelector(state => state.authReducer.user);

  const [initialStateForm, setInitialStateForm] = useState(initialState);
  // const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDot, setSelectedDot] = useState(1);

  // console.log('FOUND TEAM ID!!!', props.tid);
  // console.log('FOUND USER ID!!!', props.pid);

  const handleFormChange = (name, value) => {
    setInitialStateForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // console.log('props.dataaa =>>> ', props.data);
    handleFormChange('playerId', props.data._id);
    handleFormChange('teamId', props.teamId); // direct from props
    handleFormChange('playerName', props.data?.playerName);
    handleFormChange('homeJersey', props.data?.homeJersey);
    handleFormChange('awayJersey', props.data?.awayJersey);
    handleFormChange('position1', props.data?.position1);
    handleFormChange('position2', props.data?.position2);
    handleFormChange('height', props.data?.height);
    handleFormChange('weight', props.data?.weight);
    handleFormChange('grade', props.data?.grade);
    handleFormChange('phone', props.data?.phone.toString());
    handleFormChange('email', props.data?.email);
  }, []);

  const handleUpdate = async () => {
    console.log(initialStateForm);
    try {
      setLoading(true);
      const response = await updatePlayer(initialStateForm, user?.token);
      console.log('updatePlayer request ==>> ', response.data);
      await props.handleGetPlayers();
      setError({});
      props.onBackdropPress();
    } catch (e) {
      setError(e);
      console.log('errorrrrrrr in updatePlayer =>> ', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayStyle}>
      <Text style={styles.editTxt}>Edit a player</Text>

      <ErrorOverlay
        onBackdropPress={() => setError(null)}
        visible={error ? true : false}
        // message={error?.message ? error.message : 'Error while update player'}
        message={error?.response?.data?.message || error?.message}
      />

      <Text style={{fontSize: 1, color: Colors.lightgrey}}>
        {/* {selectedTeam?.teamName} */}
        Team name here
      </Text>

      <View style={{...styles.row, justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Entypo name="star" size={17} color={Colors.darkBlue} />
          <Text style={styles.txt}>Captain: </Text>
        </View>
        <DotSwitch
          Tab1={{text: 'Yes', value: true}}
          Tab2={{text: 'No', value: false}}
          TabKey={'isCaptain'}
          defaultTab={selectedDot}
          setSelectedTab={setSelectedDot}
          handleFormChange={handleFormChange}
        />
      </View>

      <View style={styles.row}>
        <Entypo name="user" size={15} color={Colors.darkBlue} />
        <Text style={styles.txt}>Player Name: </Text>
        <TextInput
          value={initialStateForm.playerName}
          onChangeText={text => handleFormChange('playerName', text)}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <Ionicons name="shirt" size={15} color={Colors.darkBlue} />
        <Text style={styles.txt}>Home jersey # : </Text>
        <TextInput
          value={initialStateForm.homeJersey}
          onChangeText={text => handleFormChange('homeJersey', text)}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <Ionicons name="shirt" size={15} color={Colors.darkBlue} />
        <Text style={styles.txt}>Away jersey # : </Text>
        <TextInput
          value={initialStateForm.awayJersey}
          onChangeText={text => handleFormChange('awayJersey', text)}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <Entypo name="location" size={15} color={Colors.darkBlue} />
        <Text style={styles.txt}>Position 1 : </Text>
        <TextInput
          value={initialStateForm.position1}
          onChangeText={text => handleFormChange('position1', text)}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <Entypo name="location" size={15} color={Colors.darkBlue} />
        <Text style={styles.txt}>Position 2 : </Text>
        <TextInput
          value={initialStateForm.position2}
          onChangeText={text => handleFormChange('position2', text)}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="human-male-height"
          size={15}
          color={Colors.darkBlue}
        />
        <Text style={styles.txt}>Height : </Text>
        <TextInput
          value={initialStateForm.height}
          onChangeText={text => handleFormChange('height', text)}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="weight-lifter"
          size={15}
          color={Colors.darkBlue}
        />
        <Text style={styles.txt}>Weight : </Text>
        <TextInput
          value={initialStateForm.weight}
          onChangeText={text => handleFormChange('weight', text)}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="school"
          size={15}
          color={Colors.darkBlue}
        />
        <Text style={styles.txt}>Grade : </Text>
        <TextInput
          value={initialStateForm.grade}
          onChangeText={text => handleFormChange('grade', text)}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="phone"
          size={15}
          color={Colors.darkBlue}
        />
        <Text style={styles.txt}>Phone # : </Text>
        <TextInput
          value={initialStateForm.phone}
          onChangeText={text => handleFormChange('phone', text)}
          style={styles.input}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.row}>
        <Entypo name="mail" size={15} color={Colors.darkBlue} />
        <Text style={styles.txt}>Email : </Text>
        <TextInput
          value={initialStateForm.email}
          onChangeText={text => handleFormChange('email', text)}
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={handleUpdate} style={styles.saveBtn}>
        {loading ? (
          <ActivityIndicator color={'#fff'} />
        ) : (
          <Text style={{color: Colors.white, fontFamily: Fonts.medium}}>
            Save
          </Text>
        )}
      </TouchableOpacity>
      {/* <View style={styles.btnView}> </View> */}
    </Overlay>
  );
};

export default EditPlayerOverlay;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 15,
    alignItems: 'center',
    // width: Dim.w * 0.8,
    padding: Dim.w * 0.05,
    paddingHorizontal: Dim.w * 0.07,
    backgroundColor: Colors.lightgrey,
  },
  editTxt: {
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    marginBottom: 5,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkBlue,
    width: Dim.w * 0.6,
  },
  input: {
    width: Dim.w * 0.35,
    padding: 0,
    color: Colors.darkBlue,
    fontSize: 15,
    marginLeft: 5,
  },
  txt: {
    fontSize: 13,
    color: Colors.blue,
    marginLeft: 5,
    fontFamily: Fonts.regular,
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dim.w * 0.45,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  saveBtn: {
    width: 65,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
