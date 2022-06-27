import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {Colors, Dim} from '../../constants/Theme';
import Entypo from 'react-native-vector-icons/Entypo';

const Introduction = props => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      {/* <TouchableOpacity style={{margin: Dim.w * 0.05}}>
        <Entypo name="chevron-left" size={30} color={Colors.black} />
      </TouchableOpacity> */}

      <Text style={styles.heading}>Introduction</Text>
      <Text style={styles.subTxt}>
        Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        ullamcorper suscipit lobortis nisl ut aliquip ex ea commo
      </Text>
    </SafeAreaView>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  heading: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.darkBlue,
    marginTop: Dim.h * 0.1,
    // marginTop: 20,
  },
  subTxt: {
    width: Dim.w * 0.85,
    alignSelf: 'center',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 15,
    color: Colors.darkgrey,
  },
});
