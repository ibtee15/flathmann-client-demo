import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Fonts} from '../../constants/fonts';
import EditPlayerOverlay from '../overlays/EditPlayer';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors, Dim} from '../../constants/Theme';

const PlayerDetailCard = ({v, handleGetPlayers, teamId}) => {
  const [visible, setVisible] = useState(false);
  const toggleEditPlayer = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.playerView}>
      <View style={styles.subView}>
        <Text style={styles.subHead}>Player #{v.homeJersey}</Text>
        <TouchableOpacity onPress={toggleEditPlayer}>
          <MaterialCommunityIcons
            name="account-edit"
            size={18}
            color={Colors.darkBlue}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.line} />

      <EditPlayerOverlay
        onBackdropPress={() => toggleEditPlayer(false)}
        isVisible={visible}
        handleGetPlayers={handleGetPlayers}
        teamId={teamId}
        data={v}
      />

      <View style={styles.row}>
        <Text style={styles.name}>Home jersey </Text>
        <Text style={styles.bold}>#{v.homeJersey}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.name}>Away jersey </Text>
        <Text style={styles.bold}>#{v.awayJersey}</Text>
      </View>
      <View
        style={{
          ...styles.row,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        <Text style={styles.bold}>
          {v.playerName}{' '}
          {v.isCaptain === 'true' ? (
            <Entypo name="star" size={15} color={Colors.red} />
          ) : null}
        </Text>
        <Text style={{...styles.bold, color: Colors.red, fontSize: 12}}>
          {v.capt}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.name}>Pos 1: </Text>
        <Text style={styles.bold}>{v.position1}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.name}>Pos 2: </Text>
        <Text style={styles.bold}>{v.position2}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.name}>Height : </Text>
        <Text style={styles.bold}>{v.height}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.name}>Weight : </Text>
        <Text style={styles.bold}>{v.weight}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.name}>Grade : </Text>
        <Text style={styles.bold}>{v.grade}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.row}>
        <FontAwesome name="phone" size={10} color={Colors.darkBlue} />
        <Text style={styles.bold}> {v.phone}</Text>
      </View>
      <Text style={styles.bold}>{v.email}</Text>
    </View>
  );
};

export default PlayerDetailCard;

const styles = StyleSheet.create({
  playerView: {
    width: Dim.w * 0.45,
    padding: 10,
    paddingHorizontal: 2,
    borderRadius: 15,
    backgroundColor: Colors.lightgrey,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  subView: {
    width: Dim.w * 0.3,
    alignSelf: 'center',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHead: {
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
  },
  line: {
    width: Dim.w * 0.26,
    height: 1,
    backgroundColor: Colors.bgColour,
    marginVertical: 5,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  name: {
    fontSize: 12,
    color: Colors.darkgrey,
    marginBottom: 2,
    textAlign: 'center',
  },
  bold: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    textAlign: 'center',
  },
});
