import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';
import {Colors, Dim} from '../../constants/Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ErrorOverlay = props => {
  return (
    <Overlay
      overlayStyle={styles.container}
      onBackdropPress={props.onBackdropPress}
      visible={props.visible}>
      <MaterialIcons name="error" size={55} color={Colors.errorRed} />
      <Text style={styles.textMessage}>
        {/* {props?.error?.message
          ? props.error.message
          : 'Error while update team'} */}
        {props?.message}
      </Text>
    </Overlay>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    maxWidth: Dim.w * 0.8,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
  },
  textMessage: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#000',
  },
});
