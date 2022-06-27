import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Dim, Colors} from '../../constants/Theme';
import {Overlay} from 'react-native-elements';
import {ColorsList} from '../../dummyData/DummyData';

const ColorPallete = props => {
  const [color, setColor] = useState(null);

  const handleSelect = val => {
    props.setSelectedColor(val);
    props.onBackdropPress();
  };
  return (
    <Overlay
      onBackdropPress={props.onBackdropPress}
      isVisible={props.isVisible}
      overlayStyle={styles.overlayStyle}>
      <View style={styles.row}>
        {ColorsList.map((v, i) => {
          return (
            <TouchableOpacity
              onPress={() => handleSelect(v)}
              style={{...styles.color, backgroundColor: v.color}}
            />
          );
        })}
      </View>
    </Overlay>
  );
};

export default ColorPallete;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 15,
    alignItems: 'center',
    // width: Dim.w * 0.7,
    paddingVertical: Dim.w * 0.05,
    paddingLeft: Dim.w * 0.05,
    paddingRight: 0,
  },
  row: {
    flexDirection: 'row',
    width: Dim.w * 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  color: {
    width: Dim.w * 0.05,
    height: Dim.w * 0.05,
    marginBottom: Dim.w * 0.05,
    borderRadius: 100,
    marginRight: Dim.w * 0.05,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
});
