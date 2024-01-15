import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'
import ButtonComponent from '../components/ButtonComponent'
import colors from '../components/colors'

import HeaderComponent from '../components/HeaderComponent'
import Screen from '../components/Screen'
import fonts from '../config/fonts'
import authApi from '../services/auth'
import LoadingScreen from './LoadingScreen'

const ContactScreen = ({ navigation }) => {
  const [userMessage, setUserMessage] = useState()
  const [userEmail, setUserEmail] = useState(null)
  const [sending, setSending] = useState(false)

  const handleSendMessage = async () => {
    setSending(true)

    const msgObj = { message: userMessage, email: userEmail }

    const sendMessage = await authApi.sendConcern(msgObj)

    if (sendMessage.ok) {
      setSending(false)
      navigation.navigate('MessageSentScreen')
    } else {
      setSending(false)
      Alert.alert('Error', 'Error trying to send message, please try again')
    }
  }

  return (
    <>
      {sending && <LoadingScreen />}
      <Screen>
        <HeaderComponent
          backEnabled
          title={'Contact Us'}
          navigation={navigation}
        />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.policyText}>
              We will respond to you with provided email
            </Text>

            <TextInput
              multiline
              style={styles.message}
              placeholder={'Enter message'}
              numberOfLines={10}
              onChangeText={(text) => setUserMessage(text)}
            />

            <Text style={{ color: colors.light, marginBottom: 10 }}>
              Email <Text style={{ fontStyle: 'italic' }}>(optional)</Text>
            </Text>
            <TextInput
              style={styles.emailText}
              onChangeText={(text) => setUserEmail(text)}
              autoCapitalize={false}
            />

            <ButtonComponent
              title={'Send message'}
              elevation={9}
              onPress={handleSendMessage} //navigation.navigate('MessageSentScreen')}
            />
          </View>
        </TouchableWithoutFeedback>
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  policyText: {
    color: colors.light,
    lineHeight: 20,
    marginVertical: 20,
  },
  message: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.lighter,
    color: colors.light,
    padding: 10,
    fontSize: fonts.fontSizeNormal,
    marginBottom: 20,
    textAlignVertical: 'top',
    minHeight: 200,
  },
  emailText: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    marginBottom: 20,
  },
})

export default ContactScreen
