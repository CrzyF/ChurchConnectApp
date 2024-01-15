import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'

import colors from '../components/colors'
import HeaderComponent from '../components/HeaderComponent'
import Screen from '../components/Screen'
import fonts from '../config/fonts'

const AboutApp = ({ navigation }) => {
  return (
    <Screen>
      <HeaderComponent
        backEnabled
        title={'CHURCHAPP'}
        navigation={navigation}
      />

      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: -20,
          fontSize: fonts.fontSizeSmall,
        }}
      >
        VERSION 1.0.0.1
      </Text>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/Logomark.png')} />
      </View>

      <View style={{ paddingBottom: 40 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ContactScreen')}>
          <Text style={styles.aboutText}>Contact Us</Text>
          <View style={styles.separator}></View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.aboutText}>Terms and Condition</Text>
          <View style={styles.separator}></View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PrivacyPolicyScreen')}
        >
          <Text style={styles.aboutText}>Privacy Policy</Text>
          <View style={styles.separator}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SupportScreen')}>
          <Text style={styles.aboutText}>FAQs</Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: -20,
            fontSize: fonts.fontSizeSmall,
            marginTop: 30,
          }}
        >
          @ 2023 JITBrands
        </Text>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  aboutText: {
    marginVertical: 13,
    fontSize: fonts.fontSizeNormal,
  },

  separator: {
    height: 1,
    backgroundColor: colors.lighter,
    width: '100%',
  },
})

export default AboutApp
