import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AboutApp from '../screens/AboutApp'
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen'
import ContactScreen from '../screens/ContactScreen'
import MessageSentScreen from '../screens/MessageSentScreen'
import SupportScreen from '../screens/SupportScreen'

const Stack = createNativeStackNavigator()

const AboutAppNavigator = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="AboutApp"
      component={AboutApp}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SupportScreen"
      component={SupportScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ContactScreen"
      component={ContactScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="MessageSentScreen"
      component={MessageSentScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PrivacyPolicyScreen"
      component={PrivacyPolicyScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
)

export default AboutAppNavigator
