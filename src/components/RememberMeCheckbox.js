import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity
      style={[styles.checkbox, isChecked && styles.checkboxActive]}
      onPress={handleCheckboxPress}
    >
      {isChecked && <Entypo name="check" size={16} color="#0C4DA2" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: '#0C4DA2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    // backgroundColor: '#0C4DA2',
  },
});

export default Checkbox;
