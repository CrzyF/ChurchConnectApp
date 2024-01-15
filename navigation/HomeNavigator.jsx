import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import Prayers from '../screens/Prayers'
import AnnoucementDetail from '../screens/content/AnnoucementDetail'
import HymnsNavigator from '../navigation/HymnsNavigator'
import AnnouncementNavigator from '../navigation/AnnouncementNavigator'
import DailyReadingsNavigator from '../navigation/DailyReadingsNavigator'
import SupportNavigator from '../navigation/SupportNavigator'
import PrayersNavigator from '../navigation/PrayersNavigator'
import Schedules from '../screens/Schedules'
import MyParishNavigator from './MyParishNavigator'
import Leadership from '../screens/Leadership'
import News from '../screens/News'
import Leadership2 from '../screens/Leadership2'
import NewsNavigator from './NewsNavigator'
import EventsNavigator from './EventsNavigator'
import HymnView from '../screens/HymnView'
import AnnouncementViewScreen from '../screens/AnnouncementViewScreen'
import DailyReading from '../screens/DailyReading'
import HomeScreen2 from '../screens/HomeScreen2'
import AboutApp from '../screens/AboutApp'
import AboutAppNavigator from './AboutAppNavigator'

const AppStack = createNativeStackNavigator()

const HomeNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="HymnsNavigator" component={HymnsNavigator} />
      <AppStack.Screen name="Prayers" component={Prayers} />
      <AppStack.Screen name="HymnView" component={HymnView} />
      <AppStack.Screen name="MyParishNavigator" component={MyParishNavigator} />
      <AppStack.Screen
        name="AnnouncementNavigator"
        component={AnnouncementNavigator}
      />
      <AppStack.Screen
        name="DailyReadingsNavigator"
        component={DailyReadingsNavigator}
      />
      <AppStack.Screen name="DailyReading" component={DailyReading} />
      <AppStack.Screen name="SupportNavigator" component={SupportNavigator} />
      <AppStack.Screen name="PrayersNavigator" component={PrayersNavigator} />
      <AppStack.Screen
        name="AnnouncementView"
        component={AnnouncementViewScreen}
      />
      <AppStack.Screen name="Schedules" component={Schedules} />
      <AppStack.Screen name="AboutAppNavigator" component={AboutAppNavigator} />
      <AppStack.Screen name="Leadership" component={Leadership2} />
      <AppStack.Screen name="NewsNavigator" component={NewsNavigator} />
      <AppStack.Screen name="EventsNavigator" component={EventsNavigator} />
    </AppStack.Navigator>
  )
}

export default HomeNavigator
