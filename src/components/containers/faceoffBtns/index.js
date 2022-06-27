import React, {useState} from 'react';
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
  ImageBackground,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import Entypo from 'react-native-vector-icons/Entypo';

const FaceOffBtns = props => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.rowTxT}>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>GROUND BALL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>GROUND BALL</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowTxT}>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>CAUSED TURNOVER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>CAUSED TURNOVER</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowTxT}>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>TAKEAWAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>TAKEAWAY</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowTxT}>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>TURNOVER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>TURNOVER</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowTxT}>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>GOALIE CLEAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>GOALIE CLEAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowTxT}>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>CLEAR SUCCESS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>CLEAR SUCCESS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowTxT}>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>CLEAR FAILED</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={styles.smallTxt2}>CLEAR FAILED</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowTxT}>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={{...styles.smallTxt2, fontSize: 12}}>
            PLAYER SUBSTITUION
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.faceOffBtns}>
          <Text style={{...styles.smallTxt2, fontSize: 12}}>
            PLAYER SUBSTITUION
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FaceOffBtns;

const styles = StyleSheet.create({
  rowTxT: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Dim.w * 0.85,
    justifyContent: 'space-between',
  },
  faceOffBtns: {
    width: Dim.w * 0.41,
    height: 40,
    marginBottom: 10,
    backgroundColor: Colors.btnGreen,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  smallTxt2: {
    fontSize: 13,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
