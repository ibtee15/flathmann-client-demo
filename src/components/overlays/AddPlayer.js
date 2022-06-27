import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {Dim, Colors} from '../../constants/Theme';
import {Fonts} from '../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Overlay} from 'react-native-elements';
import {createPlayer} from '../../services/player.services';
import {getOneTeam} from '../../services/team.services';
import DotSwitch from '../tabSwitch/DotSwitch';
import {useSelector} from 'react-redux';

const initialState = {
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
  phone: 0,
  isCaptain: false,
};

const AddPlayerOverlay = props => {
  const user = useSelector(state => state.authReducer.user);

  const [initialStateForm, setInitialStateForm] = useState(initialState);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedDot, setSelectedDot] = useState(1);

  const handleFormChange = (name, value) => {
    setInitialStateForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    console.log(initialStateForm);
    try {
      const response = await createPlayer(initialStateForm, user?.token);
      console.log('playerrrrrrrrrr created successfully!!!', response.data);
      props.onBackdropPress();
    } catch (e) {
      console.log(
        'errorrrrrrr in creating playerrrrrr!!!',
        e?.response?.message | e?.message | e,
      );
    }
  };

  useEffect(() => {
    handleFormChange('teamId', props.tid);
  }, []);

  useEffect(() => {
    if (props.tid) {
      (async () => {
        try {
          const response = await getOneTeam(props.tid, user?.token);
          console.log('team found successfulyy!! ===>>>', response.data);
          setSelectedTeam(response.data);
          // handleFormChange('teamId', response.data._id);
        } catch (e) {
          console.log('errorrrr on team id ==>>', e);
        }
      })();
    }
  }, []);

  // console.log('isCaptain >>>>>>>>>>>>>', initialState.isCaptain);

  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayStyle}>
      <Text style={styles.heading}>Add a player</Text>

      <Text style={{fontSize: 1, color: Colors.lightgrey}}>
        {selectedTeam?.teamName}
      </Text>
      {/* 
      <Text style={{fontSize: 1, color: Colors.lightgrey}}>
        {selectedTeam?.teamId}
      </Text> */}

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
        />
      </View>
      <View style={styles.row}>
        <Entypo name="mail" size={15} color={Colors.darkBlue} />
        <Text style={styles.txt}>Emaiil : </Text>
        <TextInput
          value={initialStateForm.email}
          onChangeText={text => handleFormChange('email', text)}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleCreate} style={styles.saveBtn}>
        <Text style={{color: Colors.white, fontFamily: Fonts.medium}}>
          Save
        </Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default AddPlayerOverlay;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 15,
    alignItems: 'center',
    // width: Dim.w * 0.8,
    padding: Dim.w * 0.05,
    paddingHorizontal: Dim.w * 0.07,
    backgroundColor: Colors.lightgrey,
  },
  heading: {
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
  saveBtn: {
    width: 60,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
