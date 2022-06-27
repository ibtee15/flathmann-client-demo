import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Dim, Colors} from '../../constants/Theme';
import {Fonts} from '../../constants/fonts';

const DotSwitch = props => {
  const [isTab1, setIsTab1] = useState(true);

  useEffect(() => {
    if (props.defaultTab === 1) {
      setIsTab1(true);
    } else if (props.defaultTab === 2) {
      setIsTab1(false);
    } else {
      setIsTab1(true);
    }
  }, [props.defaultTab]);

  useEffect(() => {
    if (isTab1) {
      props.setSelectedTab(1);
      props.handleFormChange &&
        props.handleFormChange(props.TabKey, props.Tab1.value);
    } else {
      props.setSelectedTab(2);
      props.handleFormChange &&
        props.handleFormChange(props.TabKey, props.Tab2.value);
    }
  }, [isTab1]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsTab1(true)}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            ...styles.quarterView,
            backgroundColor: isTab1 ? Colors.darkBlue : Colors.white,
          }}
        />
        <Text style={styles.qtrTxt}>{props.Tab1.text}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsTab1(false)}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            ...styles.quarterView,
            backgroundColor: isTab1 ? Colors.white : Colors.darkBlue,
          }}
        />
        <Text style={styles.qtrTxt}>{props.Tab2.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DotSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Dim.w * 0.1,
  },
  quarterView: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: Colors.darkBlue,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
  },
  qtrTxt: {
    color: Colors.black,
    marginLeft: Dim.w * 0.01,
    marginRight: Dim.w * 0.03,
    fontFamily: Fonts.regular,
  },
});
