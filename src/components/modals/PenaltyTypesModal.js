import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors, Dim} from '../../constants/Theme';
import {Overlay} from 'react-native-elements';

const PenaltyTypes = ({setSelectedPenalty, onBackdropPress, isVisible}) => {
  const handleSelect = val => {
    setSelectedPenalty(val);
    onBackdropPress();
  };
  return (
    <Overlay
      overlayStyle={styles.modalView}
      visible={isVisible}
      onBackdropPress={onBackdropPress}>
      <ScrollView>
        {penaltyTypeList.map((val, i) => {
          return (
            <TouchableOpacity onPress={() => handleSelect(val)}>
              <Text style={styles.option}>
                {val.name} [<Text style={{color: Colors.red}}>{val.type}</Text>]
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Overlay>
  );
};
export default PenaltyTypes;

const styles = StyleSheet.create({
  modalView: {
    paddingTop: 20,
    paddingBottom: 15,
    alignItems: 'center',
    width: Dim.w * 0.6,
    height: Dim.h * 0.5,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalhead: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.black,
    marginVertical: 15,
  },

  option: {
    // width: '100%',
    color: Colors.darkBlue,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 5,
  },
  divider: {
    width: '70%',
    height: 2,
    backgroundColor: '#F4F4F4',
    marginVertical: 5,
  },
});

const penaltyTypeList = [
  {
    id: 0,
    name: 'FO Violation',
    code: 'FV',
    type: 'FOV',
    time: 0,
  },
  {
    id: 1,
    name: 'Coss-Check',
    code: 'CC',
    type: 'Personal',
    time: 1,
  },
  {
    id: 2,
    name: 'Conduct Foul',
    code: 'CF',
    type: 'Personal',
    time: 1,
  },
  {
    id: 3,
    name: 'Slash',
    code: 'SL',
    type: 'Personal',
    time: 1,
  },
  {
    id: 4,
    name: 'Expulsion',
    code: 'EX',
    type: 'Personal',
    time: 3,
  },
  {
    id: 5,
    name: 'Tobacco Use',
    code: 'TO',
    type: 'Personal',
    time: 3,
  },
  {
    id: 6,
    name: 'Fighting',
    code: 'FM',
    type: 'Personal',
    time: 3,
  },
  {
    id: 7,
    name: 'Tripping',
    code: 'TR',
    type: 'Personal',
    time: 1,
  },
  {
    id: 8,
    name: 'Unnecessary Roughness',
    code: 'UR',
    type: 'Personal',
    time: 1,
  },
  {
    id: 9,
    name: 'Un-sportsman Like Conduct',
    code: 'US',
    type: 'Personal',
    time: 1,
  },
  // {
  //   id: 10,
  //   name: 'Faceoff Violation',
  //   code: 'FO',
  //   type: 'FO Violation',
  // },
  {
    id: 10,
    name: 'Interference',
    code: 'IN',
    type: 'Technical',
    time: 0.5,
  },
  {
    id: 11,
    name: 'Illegal Procedure',
    code: 'IP',
    type: 'Technical',
    time: 0.5,
  },
  {
    id: 12,
    name: 'Illegal Stick',
    code: 'IS',
    type: 'Technical',
    time: 3,
  },
  {
    id: 13,
    name: 'Offside',
    code: 'OS',
    type: 'Technical',
    time: 0.5,
  },
  {
    id: 14,
    name: 'Push with Possession',
    code: 'PU',
    type: 'Technical',
    time: 0.5,
  },
  {
    id: 15,
    name: 'Illegal Screen',
    code: 'SC',
    type: 'Technical',
    time: 0.5,
  },
  {
    id: 16,
    name: 'Equipment Violation',
    code: 'EV',
    type: 'Technical',
    time: 1,
  },
  {
    id: 17,
    name: 'Holding',
    code: 'HO',
    type: 'Technical',
    time: 0.5,
  },
  {
    id: 18,
    name: 'Illegal Body Check',
    code: 'IB',
    type: 'Personal',
    time: 1,
  },
  {
    id: 19,
    name: 'Illegal Equipment',
    code: 'IE',
    type: 'Technical',
    time: 3,
  },
  // {
  //   id: 20,
  //   name: 'Interference',
  //   code: 'IN',
  //   type: 'Technical',
  // },
];
