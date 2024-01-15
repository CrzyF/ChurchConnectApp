import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, View, FlatList, ScrollView } from 'react-native'
import AuthContext from '../auth/context'
import colors from '../components/colors'
import HeaderComponent from '../components/HeaderComponent'
import LoginRedirect from '../components/LoginRedirect'
import Screen from '../components/Screen'
import fonts from '../config/fonts'
import authApi from '../services/auth'
import useApi from '../services/useApi'

const schedules = [
  {
    id: 1,
    title: 'Sunday Masses',
    about: [
      {
        massTitle: 'First Mass',
        venue: 'Main Chapel',
        time: '6:30am',
      },
      {
        massTitle: 'Second Mass',
        venue: 'Main Chapel',
        time: '9:30am',
      },
      {
        massTitle: 'Second Mass',
        venue: 'Main Chapel',
        time: '9:30am',
      },
    ],
  },
  {
    id: 2,
    title: 'Weekday Masses',
    about: [
      {
        massTitle: 'Monday Tuesday Thursday & Friday',
        venue: 'Main Chapel',
        time: '6:00am',
      },
      {
        massTitle: 'Wednesday',
        venue: 'Main Chapel',
        time: '9:30am',
      },
      {
        massTitle: 'Saturday',
        venue: 'Main Chapel',
        time: '7:00am',
      },
    ],
  },
  {
    id: 3,
    title: 'Others',
    about: [
      {
        massTitle: 'Adoration',
        venue: 'Main Chapel',
        time: '6:00am',
      },
      {
        massTitle: 'Wednesday',
        venue: 'Main Chapel',
        time: '9:30am',
      },
      {
        massTitle: 'Saturday',
        venue: 'Main Chapel',
        time: '7:00am',
      },
    ],
  },
]

export const formattedTime = (dateString) => {
  const date = new Date(dateString)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  const strTime = hours + ':' + minutes + ' ' + ampm
  return strTime
}

const ScheduleComponent = ({ title, details }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>

    {details?.map((element, index) => (
      <View key={index} style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 5 }}>{element.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
            {' '}
            {`${element.day}: `}
          </Text>
          <Text style={{ fontSize: fonts.fontSizeSmall, color: colors.light }}>
            Main Chapel
            {formattedTime(element.startTime) +
              ' - ' +
              formattedTime(element.endTime)}
          </Text>
        </View>
      </View>
    ))}
  </View>
)

const Schedules = ({ navigation }) => {
  const { user } = useContext(AuthContext)

  const { request: getSchedules, data: scheduless, error, loading } = useApi(
    authApi.getSchedules,
  )

  const getWeekdayMasses = () => {
    const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri']
    const filteredSchedules = scheduless?.data?.filter((schedule) =>
      weekdays.includes(schedule.day.substring(0, 3).toLowerCase()),
    )

    const sortedSchedules = filteredSchedules?.sort(
      (a, b) =>
        weekdays.indexOf(a.day.substring(0, 3).toLowerCase()) -
        weekdays.indexOf(b.day.substring(0, 3).toLowerCase()),
    )

    return sortedSchedules
  }

  const getSundayyMasses = () => {
    return scheduless?.data?.filter(
      (schedule) => schedule.day.substring(0, 3).toLowerCase() === 'sun',
    )
  }

  useEffect(() => {
    getSchedules(user.id)
  }, [])

  return (
    <Screen>
      <HeaderComponent backEnabled title={'schedule'} navigation={navigation} />
      {user.isGuest ? (
        <LoginRedirect />
      ) : (
        // <FlatList
        //   data={schedules}
        //   keyExtractor={(item) => item.id.toString()}
        //   renderItem={({ item }) => (
        //     <ScheduleComponent title={item.title} about={item.about} />
        //   )}
        // />
        <ScrollView>
          {loading && !error ? (
            <Text>Loading</Text>
          ) : (
            <>
              <ScheduleComponent
                title={'Sunday Masses'}
                details={getSundayyMasses()}
              />
              <ScheduleComponent
                title={'Weekday Masses'}
                details={getWeekdayMasses()}
              />
            </>
          )}
        </ScrollView>
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: fonts.fontSizeMedium,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})

export default Schedules
