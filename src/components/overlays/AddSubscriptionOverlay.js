import React, {useState} from 'react';
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

import {Overlay} from 'react-native-elements';
import ClockTypeModal from '../modals/ClockTypesModal';
import {createSubscriptionType} from '../../services/subscriptions.services';
import {useSelector} from 'react-redux';

const initialState = {
  subscriptionName: '',
  cost: '',
  type: '',
  durationDays: '',
};

const AddSubscription = props => {
  const user = useSelector(state => state.authReducer.user);

  const [initialStateForm, setInitialStateForm] = useState(initialState);
  const [clockTypeModal, setClockTypeModal] = useState(false);
  const [selectedClockType, setSelectedClockType] = useState(null);

  const clockTypes = ['clock only', 'clock with stats'];

  const handleFormChange = (name, value) => {
    setInitialStateForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectType = val => {
    console.log('valueeeeeeee ruleee ====>>XXX', val);
    setSelectedClockType(val);
    handleFormChange('type', val);
    setClockTypeModal(false);
  };

  const handleClockModal = () => {
    setClockTypeModal(!clockTypeModal);
  };

  const handleCreate = async () => {
    console.log(initialStateForm);
    try {
      const response = await createSubscriptionType(
        initialStateForm,
        user?.token,
      );
      console.log('subscriptionnnnnn created successfully!!!', response.data);
      props.onBackdropPress();
    } catch (e) {
      console.log('errorrrrrrr in creating subscriptionnnnnn!!!', e);
    }
  };

  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayStyle}>
      <Text style={styles.addTxt}>ADD A SUBSCRIPTION</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.subTxt}>Package Name</Text>
          <TextInput
            value={initialStateForm.subscriptionName}
            onChangeText={text => handleFormChange('subscriptionName', text)}
            style={styles.input}
            placeholder="Per Month/Summers"
          />
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.subTxt}>Cost</Text>
          <TextInput
            value={initialStateForm.cost}
            onChangeText={text => handleFormChange('cost', text)}
            style={styles.input}
            placeholder="$0.99"
            keyboardType="number-pad"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <View style={styles.row2}>
            <Text style={styles.subTxt}>Select Type</Text>
            <TouchableOpacity
              style={{marginLeft: 5}}
              onPress={handleClockModal}>
              <Entypo name="chevron-down" size={17} color={Colors.darkBlue} />
            </TouchableOpacity>
          </View>
          <TextInput
            editable={false}
            value={initialStateForm?.type}
            style={styles.input}
            onChangeText={text => handleFormChange('type', text)}
            placeholder="Clock Only"
          />
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.subTxt}>Duration</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            placeholder="30(days)"
            value={initialStateForm.durationDays}
            onChangeText={text => handleFormChange('durationDays', text)}
          />
        </View>
      </View>

      <ClockTypeModal
        setSelectedClockType={handleSelectType}
        data={clockTypes}
        onBackdropPress={() => setClockTypeModal(false)}
        clockTypeModal={clockTypeModal}
      />

      <TouchableOpacity onPress={handleCreate} style={styles.addBtn}>
        <Text style={{color: Colors.white, fontFamily: Fonts.medium}}>Add</Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default AddSubscription;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 15,
    alignItems: 'center',
    // width: Dim.w * 0.8,
    padding: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.lightgrey,
  },
  addTxt: {
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    borderBottomWidth: 1,
    borderBottomColor: Colors.blue,
    paddingBottom: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dim.w * 0.7,
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTxt: {
    fontSize: 13,
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    // backgroundColor: 'green',
  },
  input: {
    padding: 0,
    fontSize: 13,
    top: -5,
    color: Colors.blue,
    fontFamily: Fonts.regular,
    // backgroundColor: 'yellow',
  },
  addBtn: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});
