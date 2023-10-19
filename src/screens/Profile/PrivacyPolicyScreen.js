import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBack from '../../components/HeaderBack'
import { RFValue } from 'react-native-responsive-fontsize'

export default function PrivacyPolicyScreen() {
  return (
    <View style={styles.container}>
  <HeaderBack 
  title="Privacy Policy"
  />
  <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{paddingBottom:50}}
  >

<View style={styles.desccontainer}>
      <View style={styles.section}>
        <Text style={styles.title}>1. Types of Data We Collect</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>2. Use of Your Personal Data</Text>
        <Text style={styles.description}>
        Magna etiam tempor orci eu lobortis elementum nibh. Vulputate enim nulla aliquet porttitor lacus. Orci sagittis eu volutpat odio. Cras semper auctor neque vitae tempus quam pellentesque nec. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Commodo elit at imperdiet dui. Nisi vitae suscipit tellus mauris a diam. Erat pellentesque adipiscing commodo elit at imperdiet dui. Mi ipsum faucibus vitae aliquet nec ullamcorper. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>3. Disclosure of Your Personal Data</Text>
        <Text style={styles.description}>
        Consequat id porta nibh venenatis cras sed. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Nibh tellus molestie nunc non blandit massa. Quam pellentesque nec nam aliquam sem et tortor consequat id. Faucibus vitae aliquet nec ullamcorper sit amet risus. Nunc consequat interdum varius sit amet. Eget magna fermentum iaculis eu non diam phasellus vestibulum. Pulvinar pellentesque habitant morbi tristique senectus et. Lorem donec massa sapien faucibus et molestie. Massa tempor nec feugiat nisl pretium fusce id. Lacinia at quis risus sed vulputate odio. Integer vitae justo eget magna fermentum iaculis. Eget gravida cum sociis natoque penatibus et magnis.
        </Text>
      </View>
    </View>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

    container:
    {
        flex:1,
        backgroundColor:'#fff',
    },
    desccontainer:
    {
      padding:24,
      marginTop:6,
    },
    section: {
      marginBottom: 20,
    },
    title: {
      fontSize: RFValue(17),
      fontFamily:'Bold',
      marginBottom: 24,
      color:"#212121"
    },
    description: {
      fontSize: RFValue(12),
      color:'#424242',
      fontFamily:'Regular',
      lineHeight: 24,
      textAlign:"justify"
    },

})