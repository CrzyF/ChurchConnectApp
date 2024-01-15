import * as React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  FlatList,
  Keyboard,
} from 'react-native'
import {
  createDrawerNavigator,
  useDrawerStatus,
} from '@react-navigation/drawer'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../components/colors'
import fonts from '../config/fonts'
import SearchBar from '../components/SearchBar'
import Dropdown from '../components/Dropdown'
import TabNavigatorRoutes from './TabNavigator'
import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import hymnsList from '../services/hymnsList'
import authApi from '../services/auth'
import usePushNotifications from '../services/usePushNotifications'
import storage from '../auth/storage'

const DropdownItem = ({ iconName, title }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <MaterialCommunityIcons
        name={iconName}
        color={colors.white}
        size={25}
        style={{ marginEnd: 10 }}
      />
      <Text
        style={{
          color: colors.white,
          fontSize: fonts.fontSizeNormal,
          fontWeight: '500',
        }}
      >
        {title}
      </Text>
    </View>
  )
}

const dropdownItems = [
  // {
  //   iconName: 'home-variant-outline',
  //   title: 'Home',
  //   subItems: [
  //     {
  //       itemName: 'My Parish'
  //     },
  //     {
  //       itemName: 'Hymns'
  //     },
  //     {
  //       itemName: 'Common Prayers'
  //     },
  //     {
  //       itemName: 'Daily Readings'
  //     },
  //     {
  //       itemName: 'Announcements'
  //     },
  //     {
  //       itemName: 'Leadership'
  //     },
  //   ]
  // },
  {
    iconName: 'home-variant-outline',
    title: 'My Parish',
    subItems: [
      {
        itemName: 'Announcements',
        targetScreen: 'AnnouncementNavigator',
      },
      {
        itemName: 'Schedules',
        targetScreen: 'Schedules',
      },
      {
        itemName: 'Events',
        targetScreen: 'EventsNavigator',
      },
      {
        itemName: 'Leadership',
        targetScreen: 'Leadership',
      },
    ],
  },
  {
    iconName: 'hands-pray',
    title: 'Common Prayers',
    subItems: [
      {
        itemName: 'Common Prayers',
        targetScreen: 'PrayersList',
      },
      {
        itemName: 'Order of Mass',
      },
    ],
  },
  // {
  //   iconName: 'human-queue',
  //   title: 'Leadership',
  //   subItems: [
  //     {
  //       itemName: 'Parsh Priest'
  //     },
  //     {
  //       itemName: 'Catechist'
  //     },
  //     {
  //       itemName: 'Harvest Chairman'
  //     },
  //   ]
  // },
]

const DropdownComponent = ({ iconName, title, subItems, navigation }) => {
  return (
    <Dropdown
      collapseIconName={'chevron-up'}
      expandIconName={'chevron-down'}
      dropdownIconStyles={{ color: colors.white }}
      itemComponent={<DropdownItem iconName={iconName} title={title} />}
      subItemComponent={
        <View style={{ padding: 10, paddingStart: 35 }}>
          {subItems.map((element, index) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate(element.targetScreen)}
                key={index}
              >
                <View style={{ padding: 5, marginBottom: 10 }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: fonts.fontSizeNormal,
                    }}
                  >
                    {element.itemName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })}
        </View>
      }
      style={{ marginBottom: 10 }}
    />
  )
}

const DrawerItemComponent = ({ onPress, iconName, title, style }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          style,
          { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={25}
          color={colors.white}
          style={{ marginEnd: 10 }}
        />
        <Text style={{ color: colors.white, fontSize: fonts.fontSizeNormal }}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const CustomDrawerItem = ({ navigation }) => {
  return (
    <>
      <View style={{ flex: 1, maxHeight: 'auto' }}>
        <ScrollView>
          <DrawerItemComponent
            iconName={'home-variant-outline'}
            title={'Home'}
            style={{ paddingBottom: 10 }}
            onPress={() => navigation.navigate('HomeNavigator')}
          />

          {dropdownItems.map((element, index) => {
            return (
              <DropdownComponent
                key={index}
                iconName={element.iconName}
                title={element.title}
                subItems={element.subItems}
                navigation={navigation}
              />
            )
          })}

          <DrawerItemComponent
            iconName={'newspaper-variant-multiple-outline'}
            title={'News'}
            style={{ paddingBottom: 10 }}
            onPress={() => navigation.navigate('NewsNavigator')}
          />

          <DrawerItemComponent
            iconName={'book-open-variant'}
            title={'Hymns'}
            style={{ paddingBottom: 10 }}
            onPress={() => navigation.navigate('HymnsNavigator')}
          />

          <DrawerItemComponent
            iconName={'human-queue'}
            title={'Leadership'}
            style={{ paddingBottom: 10 }}
            onPress={() => navigation.navigate('Leadership')}
          />

          <DrawerItemComponent
            iconName={'book-open-page-variant-outline'}
            title={'Daily Readings'}
            style={{ paddingBottom: 10 }}
            onPress={() => navigation.navigate('DailyReadingsNavigator')}
          />

          <DrawerItemComponent
            iconName={'bell-outline'}
            title={'Announcements'}
            style={{ paddingBottom: 10 }}
            onPress={() => navigation.navigate('AnnouncementNavigator')}
          />
        </ScrollView>
      </View>
    </>
  )
}

function CustomDrawerContent({ props, navigation }) {
  const { user, setUser } = React.useContext(AuthContext)
  const userName = user['name']

  const logout = () => {
    Alert.alert('Logout', 'Do you want to logout?', [
      {
        text: 'logout',
        onPress: async () => {
          const tokenToSend = await storage.getPushNotificationToken()

          if (tokenToSend) {
            const unsubscribe = await authApi.unsubscribeToNotices(
              user.id,
              tokenToSend,
            )

            if (unsubscribe.ok && unsubscribe.data.succeeded) {
              await storage.setSubscribedToNotifications(false)
              authStorage.removeUser()
              setUser(null)
            } else {
              console.log('Error logging out', unsubscribe.problem)
            }
          } else {
            authStorage.removeUser()
            setUser(null)
          }
        },
      },
      { text: 'cancel' },
    ])
  }

  const [filter, setFilter] = React.useState()
  let filtered = hymnsList.filter(
    (hymn) => hymn.title.includes(filter) || hymn.number.includes(filter),
  )
  if (filter === '') {
    filtered = []
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            backgroundColor: '#049C9C',
            padding: 15,
            paddingTop: 40,
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <Image
              source={require('../assets/Logomark.png')}
              style={{ marginEnd: 10, height: 35, width: 35, borderRadius: 9 }}
            />
            <Text
              style={{
                color: colors.white,
                fontWeight: 'bold',
                fontSize: fonts.fontSizeMedium,
              }}
            >
              Church App
            </Text>
          </View>
          <View>
            <SearchBar
              style={{ backgroundColor: '#1C7676', marginTop: 10 }}
              onTextChange={(text) => setFilter(text)}
              placeholder="Search hymn..."
            />
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.hymnID.toString()}
              renderItem={({ item }) => (
                <View style={{ paddingVertical: 10 }}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate('HymnView', { item, hymnsList })
                    }
                  >
                    <Text
                      numberOfLines={1}
                      style={{ width: '90%', color: colors.white }}
                    >
                      {item.hymnID + '.'} {item.title}
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              )}
              style={{
                backgroundColor: '#1C7676',
                borderRadius: 7,
                paddingHorizontal: 10,
              }}
              contentContainerStyle={
                filtered.length > 0 && { paddingBottom: 250 }
              }
            />
          </View>

          <CustomDrawerItem navigation={navigation} />

          <View style={styles.bottomContainer}>
            <DrawerItemComponent
              iconName={'information-outline'}
              title={'About'}
              onPress={() => navigation.navigate('AboutAppNavigator')}
              style={{ paddingBottom: 5 }}
            />
            <DrawerItemComponent
              iconName={'soccer'}
              title={'Support'}
              onPress={() => navigation.navigate('SupportNavigator')}
            />
            {/* <DrawerItemComponent 
            iconName={'cog-outline'}
            title={'Logout'}
          /> */}

            <View style={styles.accountContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../assets/Avatar.png')}
                  style={{ height: 50, width: 50, marginEnd: 10 }}
                />
                <View>
                  <Text
                    numberOfLines={1}
                    style={{
                      width: 150,
                      color: colors.white,
                      fontSize: fonts.fontSizeNormal,
                    }}
                  >
                    {userName ? userName : 'Guest'}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      width: 150,
                      fontStyle: 'italic',
                      color: colors.white,
                      fontWeight: '300',
                      fontSize: fonts.fontSizeSmall,
                    }}
                  >
                    {userName ? 'parishioner' : 'guest'}
                  </Text>
                </View>
              </View>

              <TouchableWithoutFeedback onPress={() => logout(navigation)}>
                <MaterialCommunityIcons
                  name="logout"
                  color={colors.white}
                  size={20}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const Drawer = createDrawerNavigator()

function MyDrawer({ navigation }) {
  const { user } = React.useContext(AuthContext)

  const { expoPushToken, notification } = usePushNotifications()

  if (notification) {
    console.log(notification)
  } else {
    console.log('No notifications yet')
  }

  const sendToken = async (tokenToSend) => {
    const subscribe = authApi.subscribeToNotices(user.id, tokenToSend)
    if ((await subscribe).ok && (await subscribe).data.succeeded) {
      storage
        .setSubscribedToNotifications(true)
        .then(() => console.log('Subscribed ', tokenToSend))
    } else {
      console.log(
        'Unable to subscribe to notifications: ',
        (await subscribe).data.Messages,
      )
    }
  }

  const getToken = async () => {
    const token = await storage.getPushNotificationToken()

    if (token && token === expoPushToken) {
      const hasSubscribed = await storage.hasSubscribedToNotifications()
      if (!hasSubscribed) {
        sendToken(token).catch(() => console.log('Error sending token'))
      } else {
        console.log('Has already subscribed')
      }
    } else {
      storage
        .storePushNotificationToken(expoPushToken)
        .then(async () => {
          console.log('Token stored')
          const hasSubscribed = await storage.hasSubscribedToNotifications()
          if (!hasSubscribed) {
            sendToken(expoPushToken).catch(() =>
              console.log('Error sending token'),
            )
          } else {
            console.log('Has already subscribed')
          }
        })
        .catch((error) => console.log('Error storing token', error))
    }
  }

  React.useEffect(() => {
    if (expoPushToken) {
      getToken()
    } else {
      console.log('Token unavailable')
    }
  }, [expoPushToken])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Drawer.Navigator
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name={'TabNavigator'} component={TabNavigatorRoutes} />
        {/* <Drawer.Screen name="Article" component={Article} /> */}
      </Drawer.Navigator>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    paddingVertical: 15,
    backgroundColor: '#049C9C',
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.light,
    paddingTop: 20,
  },
})

export default MyDrawer
