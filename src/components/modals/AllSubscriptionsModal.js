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

const AllSubscriptionsModal = ({
  data,
  setSubTypeData,
  onBackdropPress,
  subscriptionModal,
}) => {
  const handleSelect = () => {
    setSelectedSubTypeData(val);
    onBackdropPress();
  };
  console.log('data found ??!!!!!! =========> ', data);
  return (
    <Overlay
      overlayStyle={styles.modalView}
      onBackdropPress={onBackdropPress}
      visible={subscriptionModal}>
      <ScrollView>
        <View>
          {data &&
            data.length > 0 &&
            data.map((val, ind) => {
              return (
                <TouchableOpacity onPress={() => setSubTypeData(val)}>
                  <Text key={ind} style={styles.option}>
                    {val.subscriptionName} ({val.type})
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </Overlay>
  );
};
export default AllSubscriptionsModal;

const styles = StyleSheet.create({
  modalView: {
    padding: 20,
    paddingBottom: 15,
    alignItems: 'center',
    borderRadius: 20,
    width: Dim.w * 0.8,
  },
  option: {
    color: Colors.darkBlue,
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
  },
});
