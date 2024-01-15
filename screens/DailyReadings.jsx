import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import _ from 'lodash'
import DateTimePicker from '@react-native-community/datetimepicker'

import colors from '../components/colors'
import HeaderComponent from '../components/HeaderComponent'
import Screen from '../components/Screen'
import fonts from '../config/fonts'
import authApi from '../services/auth'
import useApi from '../services/useApi'

const { fontSizeMedium, fontSizeNormal } = fonts

const ReadItem = ({ day, title, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ paddingVertical: 10 }}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const ItemSeparator = () => {
  return <View style={styles.itemSeparator}></View>
}

export const getNextWeekDates = () => {
  const datess = []
  let currentDate = new Date()
  for (let i = 0; i < 7; i++) {
    let year = currentDate.getFullYear()
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
    let day = ('0' + currentDate.getDate()).slice(-2)
    datess.push(`${year}-${month}-${day}`)
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return datess
}

const DailyReadings = ({ navigation }) => {
  const [sortDate, setSortDate] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [date, setDate] = useState(new Date())
  const [data, setData] = useState([])

  const handleDateChange = async () => {
    setOpenDatePicker(false)
    setLoading(true)

    let day = date.getDate()
    let month = date.getMonth() + 1
    const year = date.getFullYear()

    if (day < 10) {
      day = '0' + day
    }

    if (month < 10) {
      month = `0${month}`
    }

    const dateFormated = `${year}-${month}-${day}`

    const filteredData = []

    const filtered = await authApi.getDailyReadings(dateFormated)
    if (filtered.ok) {
      filteredData.push(filtered.data.data)
      setData(filteredData)
      setLoading(false)
    } else {
      // console.log('Error ', filtered.data?.Messages[0])
      Alert.alert('Error', filtered.data?.Messages[0])
      setLoading(false)
    }
  }

  const handleDateSelect = (event, date) => {
    setDate(date)
    if (Platform.OS === 'android') {
      event.type !== 'dismissed' && handleDateChange()
      setOpenDatePicker(false)
    }
  }

  const dates = getNextWeekDates()

  const getReading = () => {
    const dailyReadingss = []

    dates.forEach(async (date) => {
      setLoading(true)
      await authApi
        .getDailyReadings(date)
        .then((data) => {
          if (!dailyReadingss.includes(data.data.data)) {
            dailyReadingss.push(data.data.data)
          }
        })
        .catch((err) => setError(true))
      setData(dailyReadingss)
      setLoading(false)
    })
  }

  useEffect(() => {
    getReading()
  }, [])

  return (
    <>
      <Screen>
        <HeaderComponent
          navigation={navigation}
          backEnabled
          title={'Daily Readings'}
        />

        <>
          <TouchableOpacity
            style={styles.date}
            onPress={() => setOpenDatePicker(true)}
          >
            <Text
              style={{
                fontSize: fontSizeNormal,
                color: colors.light,
                marginEnd: 10,
              }}
            >
              {sortDate || 'select date'}
            </Text>
            <MaterialCommunityIcons
              name="calendar-blank"
              color={colors.primary}
              size={20}
            />

            <Text
              style={{ color: colors.primary, position: 'absolute', end: 0 }}
              onPress={getReading}
            >
              reset
            </Text>
          </TouchableOpacity>

          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <View style={{ flex: 1 }}>
              {!loading && error ? (
                <View style={{ flexDirection: 'row' }}>
                  <Text>Unable to load data, </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      textDecorationLine: 'underline',
                      textDecorationColor: colors.primary,
                    }}
                    onPress={getReading}
                  >
                    Retry
                  </Text>
                </View>
              ) : (
                <>
                  <FlatList
                    data={data}
                    // keyExtractor={(item) => item.title}
                    style={{
                      paddingBottom: 10,
                      flex: 1,
                    }}
                    renderItem={({ item }) => (
                      <ReadItem
                        title={item.date + ' - ' + item.weekday}
                        day={item.title}
                        onPress={() =>
                          navigation.navigate('DailyReading', { item })
                        }
                      />
                    )}
                    ItemSeparatorComponent={() => <ItemSeparator />}
                    refreshing={loading}
                    onRefresh={getReading}
                  />
                </>
              )}
            </View>
          )}
        </>
      </Screen>
      {openDatePicker && (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, .5)',
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 1,
          }}
        >
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={handleDateSelect}
            style={styles.datePicker}
          />
          {Platform.OS === 'ios' && (
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}
            >
              <Text
                style={{ color: colors.primary }}
                onPress={() => setOpenDatePicker(false)}
              >
                Cancel
              </Text>

              <Text
                style={{ color: colors.primary }}
                onPress={handleDateChange}
              >
                Select
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'flex-start',
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  date: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  day: {
    color: colors.primary,
    fontSize: fontSizeMedium,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  title: {
    color: colors.light,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  firstReading: {
    marginEnd: 10,
  },
  firstReadingLabel: {
    color: colors.primary,
    marginRight: 5,
    fontSize: fontSizeNormal,
  },
  gospelLabel: {
    color: colors.danger,
    marginBottom: 5,
    marginRight: 5,
    fontSize: fontSizeNormal,
  },
  itemSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.lighter,
  },
  pageNumbers: {
    borderTopColor: colors.lighter,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
    padding: 5,
    marginRight: 7,
    minWidth: 30,
    alignItems: 'center',
  },
  activePage: {
    backgroundColor: '#e0e0e0',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 260,
    display: 'flex',
    backgroundColor: 'white',
  },
})

export default DailyReadings
