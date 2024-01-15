import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SupportScreen from '../screens/SupportScreen'
import SendSupportMessageScreen from '../screens/SendSupportMessageScreen'
import AboutApp from '../screens/AboutApp'

const Stack = createNativeStackNavigator()

const SupportNavigator = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="SupportScreen"
      component={SupportScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SupportMessageScreen"
      component={SendSupportMessageScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AboutApp"
      component={AboutApp}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
)

export default SupportNavigator
