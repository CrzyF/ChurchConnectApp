import React from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import Constants from 'expo-constants'

import colors from './colors'

const Screen = ({ children, style }) => {
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        translucent
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingTop: Constants.statusBarHeight,
        }}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <View style={[styles.container, style]}>{children}</View>
        {/* </TouchableWithoutFeedback> */}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
})

export default Screen
