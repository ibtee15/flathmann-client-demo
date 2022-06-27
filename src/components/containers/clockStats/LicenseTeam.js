import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Options from '../../modals/OptionModal';
import DateTimePicker from '@react-native-community/datetimepicker';

const LicenseClockStats = props => {
  const [datepickerIsvisible, setDatepickerIsvisible] = useState(false);
  const [date, setDate] = useState('');

  const toggleDatePicker = () => {
    setDatepickerIsvisible(!datepickerIsvisible);
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
        setDate(newDate);
        toggleDatePicker();
      }
    }
  };

  const [LicenseTeam, setLicenseTeam] = React.useState({
    value: '',
    modal: false,
  });
  const [HomeTeam, setHomeTeam] = React.useState({
    value: '',
    modal: false,
  });
  const [Goalie, setGoalie] = React.useState({
    value: '',
    modal: false,
  });
  const [inHome, setInHome] = React.useState({
    value: '',
    modal: false,
  });
  return (
    <View>
      <View style={{height: 25, width: 25}} />
      <View style={styles.myTeamBtn}>
        <TextInput
          placeholder="License Team"
          placeholderTextColor={Colors.whiteO}
          style={styles.inputMyTeam}
          selectionColor={Colors.white}
          editable={false}
          value={LicenseTeam.value}
        />
        <TouchableOpacity
          onPress={() => setLicenseTeam({...LicenseTeam, modal: true})}>
          <Entypo name="chevron-small-down" size={25} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <Options
        label="Select Team"
        Data={LicenseTeam}
        setData={setLicenseTeam}
        value={['Tigers East Highhhh', 'Team X']}
      />
      <View style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
        <TextInput
          placeholder="Select date"
          placeholderTextColor={Colors.blue}
          style={{...styles.inputMyTeam, color: Colors.darkBlue}}
          selectionColor={Colors.darkBlue}
          editable={false}
          value={date}
        />
        <TouchableOpacity onPress={toggleDatePicker}>
          <Entypo name="chevron-small-down" size={25} color={Colors.darkBlue} />
        </TouchableOpacity>
      </View>

      {datepickerIsvisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(1598051730000)}
          mode={'date'}
          display="default"
          dateFormat="year month day"
          onChange={handleSetDate}
        />
      )}

      <View style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
        <TextInput
          placeholder="Home Team"
          placeholderTextColor={Colors.blue}
          style={{...styles.inputMyTeam, color: Colors.darkBlue}}
          selectionColor={Colors.darkBlue}
          value={HomeTeam.value}
          editable={false}
        />
        <TouchableOpacity
          onPress={() => setHomeTeam({...HomeTeam, modal: true})}>
          <Entypo name="chevron-small-down" size={25} color={Colors.darkBlue} />
        </TouchableOpacity>
      </View>
      <Options
        label="Select Home Team"
        Data={HomeTeam}
        setData={setHomeTeam}
        value={['Team A', 'Team B']}
      />
      <View style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
        <TextInput
          placeholder="Goalie Team A"
          placeholderTextColor={Colors.blue}
          style={{...styles.inputMyTeam, color: Colors.darkBlue}}
          selectionColor={Colors.darkBlue}
          editable={false}
          value={Goalie.value}
        />
        <TouchableOpacity onPress={() => setGoalie({...Goalie, modal: true})}>
          <Entypo name="chevron-small-down" size={25} color={Colors.darkBlue} />
        </TouchableOpacity>
      </View>
      <Options
        label="Select Goalie"
        Data={Goalie}
        setData={setGoalie}
        value={['Alexander', 'Haryy']}
      />
      <View style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
        <TextInput
          placeholder="In Home Player"
          placeholderTextColor={Colors.blue}
          style={{...styles.inputMyTeam, color: Colors.darkBlue}}
          selectionColor={Colors.darkBlue}
          editable={false}
          value={inHome.value}
        />
        <TouchableOpacity onPress={() => setInHome({...inHome, modal: true})}>
          <Entypo name="chevron-small-down" size={25} color={Colors.darkBlue} />
        </TouchableOpacity>
      </View>
      <Options
        label="Select In Home Player"
        Data={inHome}
        setData={setInHome}
        value={['Alexander', 'Haryy']}
      />
    </View>
  );
};

export default LicenseClockStats;

const styles = StyleSheet.create({
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
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    alignSelf: 'center',
    width: Dim.w * 0.35,
    textAlign: 'center',
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
    fontWeight: 'bold',
    width: Dim.w * 0.75,
  },
});
