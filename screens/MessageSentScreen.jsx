import React from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import ButtonComponent from '../components/ButtonComponent'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../components/colors'
import HeaderComponent from '../components/HeaderComponent'
import Screen from '../components/Screen'
import fonts from '../config/fonts'

const MessageSentScreen = ({ navigation }) => {
  return (
    <Screen>
      <HeaderComponent
        backEnabled
        title={'Contact Us'}
        navigation={navigation}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <MaterialCommunityIcons
          name="checkbox-marked-circle-outline"
          size={50}
          color={'#039855'}
          style={{ marginBottom: 20 }}
        />

        <View style={{ marginVertical: 20, marginBottom: 40 }}>
          <Text
            style={{
              color: '#039855',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: fonts.fontSizeMedium,
              marginBottom: 10,
            }}
          >
            Feedback Successfully Sent
          </Text>
          <Text style={{ textAlign: 'center', color: '#039855' }}>
            Thanks for sharing your concerns. We will be waiting for any
            concerns you may have.
          </Text>
        </View>

        <ButtonComponent
          title={'Done'}
          elevation={9}
          onPress={() => navigation.navigate('AboutApp')}
          style={{ width: '100%' }}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default MessageSentScreen
