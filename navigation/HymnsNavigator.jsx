import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Hymns from '../screens/Hymns'
import HymnView from '../screens/HymnView'
import HymnListScreen from '../screens/HymnListScreen'

const Stack = createNativeStackNavigator()

const SupportNavigator = ({ navigation }) => (
  <Stack.Navigator>
    {/* <Stack.Screen 
            name='Hymns' 
            component={Hymns}
            options={{
                headerShown: false
            }}
        /> */}
    <Stack.Screen
      name="HymnList"
      component={HymnListScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="HymnView"
      component={HymnView}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
)

export default SupportNavigator
