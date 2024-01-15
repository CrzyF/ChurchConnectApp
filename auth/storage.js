import * as SecureStore from 'expo-secure-store'

const firstLaunchKey = 'firstLaunch'

const setIsFirstLaunch = async () => {
  try {
    await SecureStore.setItemAsync(firstLaunchKey, JSON.stringify(true))
  } catch (error) {
    console.log('Error setting is first launch', error)
  }
}

const getIsFirstLaunch = async () => {
  try {
    const firstLaunch = await SecureStore.getItemAsync(firstLaunchKey)
    return JSON.parse(firstLaunch)
  } catch (error) {
    console.log('Error getting is first lunch', error)
  }
}

const key = 'authUser'

const storeUser = async (authUser) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(authUser))
  } catch (error) {
    console.log('Error storing auth user', error)
  }
}

const getUser = async () => {
  try {
    const user = await SecureStore.getItemAsync(key)
    return JSON.parse(user)
  } catch (error) {
    console.log('Error getting auth user', error)
  }
}

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (error) {
    console.log('Error removing auth user', error)
  }
}

// User token
const pushNotificationKey = 'pushNotificationToken'

const storePushNotificationToken = async (token) => {
  try {
    await SecureStore.setItemAsync(pushNotificationKey, JSON.stringify(token))
  } catch (error) {
    console.log('Error storing user token', error)
  }
}

const getPushNotificationToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(pushNotificationKey)
    return JSON.parse(token)
  } catch (error) {
    console.log('Error getting push notification token', error)
  }
}

const removePushNotificationToken = async () => {
  try {
    await SecureStore.deleteItemAsync(pushNotificationKey)
  } catch (error) {
    console.log('Error removing push notification token', error)
  }
}

const hasSubscribedToNotificationsKey = 'hasSubscribed'
const setSubscribedToNotifications = async (hasSubscribed) => {
  try {
    await SecureStore.setItemAsync(
      hasSubscribedToNotificationsKey,
      JSON.stringify(hasSubscribed),
    )
  } catch (error) {
    console.log('Error setting has subscribed')
  }
}

const hasSubscribedToNotifications = async () => {
  try {
    const hasSubscribed = await SecureStore.getItemAsync(
      hasSubscribedToNotificationsKey,
    )
    return JSON.parse(hasSubscribed)
  } catch (error) {
    console.log('Error getting has subscribed', error)
  }
}

export default {
  setIsFirstLaunch,
  getIsFirstLaunch,
  getUser,
  removeUser,
  storeUser,
  storePushNotificationToken,
  getPushNotificationToken,
  removePushNotificationToken,
  setSubscribedToNotifications,
  hasSubscribedToNotifications,
}
