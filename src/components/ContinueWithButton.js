import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const ContinueWithButton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>or continue with</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:RFValue(25)
  },
  line: {
    width:('22%'),
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  text: {
    marginHorizontal: 16,
    fontSize: RFValue(16),
    color: '#616161',
  },
});

export default ContinueWithButton;
