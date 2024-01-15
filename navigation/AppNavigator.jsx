import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import OnboardingScreen from '../screens/OnboardingScreen'
import LoginScreen from '../screens/LoginScreen'
import DrawerNavigator from '../navigation/DrawerNavigator'
import storage from '../auth/storage'
import { ActivityIndicator, View } from 'react-native'

const AppStack = createNativeStackNavigator()

const AppNavigator = () => {
  const [isFirstOpen, setIsFirstOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  async function checkIfFirstOpen() {
    setIsLoading(true)
    try {
      const value = await storage.getIsFirstLaunch()
      if (value !== null) {
        setIsFirstOpen(false)
      } else {
        await storage.setIsFirstLaunch()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkIfFirstOpen()
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <AppStack.Navigator>
      {isFirstOpen ? (
        <AppStack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
      ) : null}

      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
    </AppStack.Navigator>
  )
}

export default AppNavigator
