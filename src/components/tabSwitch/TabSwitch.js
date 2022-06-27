import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Dim, Colors} from '../../constants/Theme';

const TabSwitchLinear = props => {
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
    } else {
      props.setSelectedTab(2);
    }
  }, [isTab1]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsTab1(true)}
        style={{
          ...styles.quarterView,
          backgroundColor: isTab1 ? Colors.darkBlue : Colors.white,
        }}>
        <Text
          style={{
            ...styles.qtrTxt,
            color: isTab1 ? Colors.white : Colors.darkBlue,
          }}>
          {props.TabText1}
        </Text>
      </TouchableOpacity>
      <View
        style={{width: 2, height: Dim.w * 0.2, backgroundColor: Colors.grey}}
      />
      <TouchableOpacity
        onPress={() => setIsTab1(false)}
        style={{
          ...styles.quarterView,
          backgroundColor: isTab1 ? Colors.white : Colors.darkBlue,
        }}>
        <Text
          style={{
            ...styles.qtrTxt,
            color: isTab1 ? Colors.darkBlue : Colors.white,
          }}>
          {props.TabText2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabSwitchLinear;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dim.w * 0.6,
    alignSelf: 'center',
    marginVertical: 10,
  },
  quarterView: {
    width: Dim.w * 0.25,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  qtrTxt: {
    fontSize: 16,
    // color: Colors.darkBlue,
  },
});
