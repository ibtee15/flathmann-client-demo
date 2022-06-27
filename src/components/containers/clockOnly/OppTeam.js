import React, {useState} from 'react';
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

const OppClockOnly = props => {
  const [oppTeam, setOppTeam] = React.useState({
    value: '',
    modal: false,
  });
  const [season, setSeason] = React.useState({
    value: '',
    modal: false,
  });
  const [visitorTeam, setVisitorTeam] = React.useState({
    value: '',
    modal: false,
  });

  return (
    <View>
      {/* <TouchableOpacity
        onPress={() => props.navigation.navigate('OpponentTeam')}
        style={{alignSelf: 'flex-end'}}>
        <Entypo name="eye" size={25} color={Colors.darkBlue} />
      </TouchableOpacity> */}
      <View style={styles.myTeamBtn}>
        <TextInput
          placeholder="Opponent Team"
          placeholderTextColor={Colors.whiteO}
          style={styles.inputMyTeam}
          selectionColor={Colors.white}
          editable={false}
          value={oppTeam.value}
        />
        <TouchableOpacity onPress={() => setOppTeam({...oppTeam, modal: true})}>
          <Entypo name="chevron-small-down" size={25} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <Options
        label="Select Team"
        Data={oppTeam}
        setData={setOppTeam}
        value={['Wild Cats East High', 'Team X']}
      />
      <View style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
        <TextInput
          placeholder="Select Season"
          placeholderTextColor={Colors.blue}
          style={{...styles.inputMyTeam, color: Colors.darkBlue}}
          selectionColor={Colors.darkBlue}
          editable={false}
          value={season.value}
        />
        <TouchableOpacity onPress={() => setSeason({...season, modal: true})}>
          <Entypo name="chevron-small-down" size={25} color={Colors.darkBlue} />
        </TouchableOpacity>
      </View>
      <Options
        label="Select Team"
        Data={season}
        setData={setSeason}
        value={[
          'Fall Sept-Oct',
          'Winter Nov-Jan',
          'Spring Feb-May',
          'Summer Jun-Aug',
        ]}
      />
      {/* <View style={{...styles.myTeamBtn, backgroundColor: Colors.lightgrey}}>
        <TextInput
          placeholder="Visitor Team"
          placeholderTextColor={Colors.blue}
          style={{...styles.inputMyTeam, color: Colors.darkBlue}}
          selectionColor={Colors.darkBlue}
          editable={false}
          value={visitorTeam.value}
        />
        <TouchableOpacity
          onPress={() => setVisitorTeam({...visitorTeam, modal: true})}>
          <Entypo name="chevron-small-down" size={25} color={Colors.darkBlue} />
        </TouchableOpacity>
      </View>
       */}
      <Options
        label="Select Home Team"
        Data={visitorTeam}
        setData={setVisitorTeam}
        value={['Team A', 'Team B']}
      />
    </View>
  );
};

export default OppClockOnly;

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
