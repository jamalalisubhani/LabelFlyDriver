import React, { useState } from 'react';
import { Platform } from 'react-native';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

const PhoneNumberInput = () => {
  const [phone, setPhone] = useState('');
  const phoneInput = React.useRef(null);

  const isValidPhoneNumber = (number) => {
    // US phone number regex: (XXX) XXX-XXXX
    const usPhoneNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return usPhoneNumberRegex.test(number);
  };

  const handlePhoneInputChange = (number) => {
    const formattedNumber = number.replace(/\s/g, '').slice(0, 15); // Remove spaces and limit to 15 characters
    let spacedNumber = '';
    for (let i = 0; i < formattedNumber.length; i += 3) {
      spacedNumber += formattedNumber.slice(i, i + 3) + ' ';
    }
    setPhone(spacedNumber.trim());
  };
  return (
    <View>
      <PhoneInput
        keyboardType="numeric"
        ref={phoneInput}
        defaultValue={phone}
        defaultCode="US"
        layout="first"
        textInputProps={{ placeholderTextColor: '#7D90AA', maxLength: 15 }} // Added maxLength to limit input length
        placeholder="Mobile Number"
        codeTextStyle={{ color: '#092058' }}
        containerStyle={{
          marginTop: 0,
          alignSelf: 'center',
          width: '90%',
          height: 56,
          borderWidth: Platform.OS==='android'?1.5:1,
          borderRadius: 12,
          borderColor: '#B3D2F9',
          backgroundColor: '#FAFAFA',
          paddingHorizontal: 10,
        }}
        textContainerStyle={{
          backgroundColor: '#FAFAFA',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          paddingLeft: 0,
        }}
        textInputStyle={{ color: '#000A32', height: 56, fontSize: 16,fontFamily:'SemiBold' }}
        onChangeText={handlePhoneInputChange}
        isValidPhoneNumber={isValidPhoneNumber}
        // renderDropdownImage={() => (
        //   <MaterialIcons name="keyboard-arrow-down" size={24} color="#000A32" />
        // )}
      />
    </View>
  );
};

export default PhoneNumberInput;
