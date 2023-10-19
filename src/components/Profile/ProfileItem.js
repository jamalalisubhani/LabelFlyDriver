import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const ProfileItem = ({ icon, title, subtitle, onPress, isLastItem }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={icon} style={styles.icon} />
        <Text style={{...styles.title,color:isLastItem?"#F75555":"#212121"}}>{title}</Text>
      </View>
      {!isLastItem && (
        <View style={styles.rightContainer}>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          <Image source={require('../../assets/icons/Profile/arrowright.png')} style={styles.arrowIcon} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical:0,
    marginBottom:30,

  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  title: {
    fontSize: RFValue(15),
    color:"#212121",
    fontFamily:'Bold'
  },
  subtitle:
  {   fontSize: RFValue(15),
    color:"#212121",
    fontFamily:'Bold',
    marginRight:16,

  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  rightContainer:
  {
    flexDirection:"row",
  }
};

export default ProfileItem;
