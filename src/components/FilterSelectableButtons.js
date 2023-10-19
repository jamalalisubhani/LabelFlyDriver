import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const FilterSelectableButtons = (props) => {
  return (
    <View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {props.buttons.map((button) => (
          <TouchableOpacity
            key={button.value}
            style={[
              styles.button,
              props.selectedButton === button.value && styles.selectedButton,
            ]}
            onPress={() => props.handleButtonPress(button.value)}
          >
            <Text
              style={[
                styles.buttonText,
                props.selectedButton === button.value && styles.selectedButtonText,
              ]}
            >
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(22),
    marginLeft: RFValue(19),
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 2,
    maxHeight: 38,
    borderColor: '#101010',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFValue(10),
  },
  buttonText: {
    color: '#101010',
    fontSize: RFValue(13),
    fontFamily: 'SemiBold',
  },
  selectedButton: {
    backgroundColor: '#0C4DA2',
    borderColor: '#0C4DA2',
    borderWidth: 2,
    maxHeight: 38,
  },
  selectedButtonText: {
    color: 'white',
    fontSize: RFValue(13),
    fontFamily: 'SemiBold',
  },
});

export default FilterSelectableButtons;
