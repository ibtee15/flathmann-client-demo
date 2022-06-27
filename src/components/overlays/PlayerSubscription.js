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
import Entypo from 'react-native-vector-icons/Entypo';
import {Fonts} from '../../constants/fonts';

import {Overlay} from 'react-native-elements';
import {useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import ClockTypeModal from '../modals/ClockTypesModal';
import AllSubscriptionsModal from '../modals/AllSubscriptionsModal';

import {createUserSubscription} from '../../services/user.services';
import {getAllSubscriptionsType} from '../../services/subscriptions.services';

const initialState = {
  userId: '',
  // isExpired: '',
  subscriptionType: '',
  startTime: '',
};

const PlayerAssignSubscription = props => {
  const user = useSelector(state => state.authReducer.user);

  const [initialStateForm, setInitialStateForm] = useState(initialState);

  const [datepickerIsvisible, setDatepickerIsvisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const [subTypedata, setSubTypeData] = useState(null);
  const [subscriptionModal, setSubscriptionModal] = useState(false);

  const handleFormChange = (name, value) => {
    setInitialStateForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    handleFormChange('userId', props.userId);
  }, []);

  useEffect(() => {
    const fnt = async () => {
      try {
        const response = await getAllSubscriptionsType(user?.token);
        console.log('subscription list successfull =====>>>', response.data);
        setSubTypeData(response.data);
        // setSubscriptionModal(false);
      } catch (error) {
        console.log('errorrrrrrr in all subscription list !!!!! EEROR', error);
      }
    };
    fnt();
  }, []);

  const handleSelectSubsType = val => {
    console.log('valueeeeeeee userrrrr =>>>>> ', val);
    setSubTypeData(val);
    handleFormChange('subscriptionType', val._id);
    setSubscriptionModal(false);
    console.log('lllllllllll SUB TYPEEEEE ==>', subTypedata);
  };

  const toggleSubscriptionModal = () => {
    setSubscriptionModal(!subscriptionModal);
  };

  const toggleDatePicker = () => {
    setDatepickerIsvisible(!datepickerIsvisible);
  };

  const handleCreate = async () => {
    console.log(initialStateForm);
    try {
      const response = await createUserSubscription(
        initialStateForm,
        user?.token,
      );
      console.log('subscriptionnnnnn created successfully!!!', response.data);
      props.onBackdropPress();
    } catch (e) {
      console.log('errorrrrrrr in creating subscriptionnnnnn!!!', e);
    }
  };

  const handleSetDate = (event, date) => {
    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    let newDate = formatDate(date).toString();
    console.log('newDateee ===>>>>> ', newDate);
    if (newDate !== 'NaN-NaN-NaN') {
      if (newDate && datepickerIsvisible) {
        handleFormChange('startTime', new Date(date).getTime());
        console.log('Date ==>>>>> ', new Date(date).getTime());
        setSelectedDate(newDate);
        toggleDatePicker();
      }
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
          <View style={styles.row2}>
            <Text style={styles.subTxt}>Subscription type</Text>
            <TouchableOpacity
              style={{marginLeft: 5, padding: 5}}
              onPress={toggleSubscriptionModal}>
              <Entypo name="chevron-down" size={17} color={Colors.darkBlue} />
            </TouchableOpacity>
          </View>
          <TextInput
            value={subTypedata?.subscriptionName}
            style={styles.input}
            placeholder="select subscription type"
            editable={false}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.subTxt}>Subscription date</Text>
          <TouchableOpacity onPress={toggleDatePicker}>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              placeholder="select subscription date"
              // value={initialStateForm.startTime.toString().slice(0, 15)}
              value={selectedDate}
              editable={false}
              // onChangeText={text => handleFormChange('startTime', text)}
            />
          </TouchableOpacity>
        </View>
      </View>

      {datepickerIsvisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          display="default"
          dateFormat="year month day"
          onChange={handleSetDate}
        />
      )}

      <AllSubscriptionsModal
        data={subTypedata}
        // setSelectedSubTypeData={setSelectedSubTypeData}
        setSubTypeData={handleSelectSubsType}
        subscriptionModal={subscriptionModal}
        onBackdropPress={() => setSubscriptionModal(false)}
      />

      <TouchableOpacity onPress={handleCreate} style={styles.addBtn}>
        <Text style={{color: Colors.white, fontFamily: Fonts.medium}}>Add</Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default PlayerAssignSubscription;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 15,
    alignItems: 'center',
    padding: 20,
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
    // width: Dim.w * 0.6,
    justifyContent: 'space-between',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTxt: {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
  },
  input: {
    padding: 0,
    top: -3,
    color: Colors.blue,
    marginBottom: 10,
    fontFamily: Fonts.regular,
    width: Dim.w * 0.6,
  },
  addBtn: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});
