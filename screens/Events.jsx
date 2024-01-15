import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../components/colors'
import HeaderComponent from '../components/HeaderComponent'
import Screen from '../components/Screen'
import fonts from '../config/fonts'
import AuthContext from '../auth/context'
import LoginRedirect from '../components/LoginRedirect'
import FavoriteIcon from '../components/Favorite'
import moment from 'moment'
import useApi from '../services/useApi'
import authApi from '../services/auth'

const EventCard = ({ day, events, navigation, onFavoriteChange }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Upcoming Events</Text>
      <Text style={styles.day}>{day}</Text>

      {events.map((event, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => navigation.navigate('AnnouncementView', event)}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Image
              source={
                event.photoUrl
                  ? { uri: event.photoUrl }
                  : require('../assets/mary.png')
              }
              style={styles.eventImage}
            />
            <View style={{ flexGrow: 1 }}>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.subtitle}>
                {new Date(Date.parse(event.dateOfActivity)).toDateString()}
              </Text>
            </View>
            {/* <FavoriteIcon
              favorite={false}
              onFavoriteChange={() => onFavoriteChange(event)}
            /> */}
            {/* <Star starred={()=> Alert.alert("Starred")} starRemoved={()=> Alert.alert("Star removed")}/> */}
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  )
}

const eventGroup = [
  {
    eventID: 1,
    day: 'This Week',
    events: [
      {
        id: 1,
        image: require('../assets/mary_landscape.png'),
        title: 'Our Lady Of The Rosary Novena',
        subtitle: 'This Friday    July 8',
        content: {
          bannerImage: require('../assets/banner-image.png'),
          title: 'Our Lady of the Rosary Novena event',
          day: 'This Friday',
          date: 'July 8, 2022',
          starred: true,
          message:
            "Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. ",
          sender: {
            position: 'Church Secretariat',
            name: 'Most Rev. Peter Paul',
            image: require('../assets/mary.png'),
          },
        },
      },
      {
        id: 2,
        image: require('../assets/mary_landscape.png'),
        title: 'Our Lady Of The Rosary Novena',
        subtitle: 'This Friday    July 8',
        content: {
          bannerImage: require('../assets/banner-image.png'),
          title: 'Our Lady of the Rosary Novena',
          day: 'This Friday',
          date: 'July 8, 2022',
          starred: false,
          message:
            "Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. ",
          sender: {
            position: 'Church Secretariat',
            name: 'Most Rev. Peter Paul',
            image: require('../assets/mary.png'),
          },
        },
      },
    ],
  },
  {
    eventID: 2,
    day: 'Next Week',
    events: [
      {
        id: 1,
        image: require('../assets/mary_landscape.png'),
        title: 'Our Lady Of The Rosary Novena',
        subtitle: 'This Friday    July 8',
        content: {
          bannerImage: require('../assets/banner-image.png'),
          title: 'Our Lady of the Rosary Novena',
          day: 'This Friday',
          date: 'July 8, 2022',
          starred: false,
          message:
            "Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. ",
          sender: {
            position: 'Church Secretariat',
            name: 'Most Rev. Peter Paul',
            image: require('../assets/mary.png'),
          },
        },
      },
      {
        id: 2,
        image: require('../assets/mary_landscape.png'),
        title: 'Our Lady Of The Rosary Novena',
        subtitle: 'This Friday    July 8',
        content: {
          bannerImage: require('../assets/banner-image.png'),
          title: 'Our Lady of the Rosary Novena',
          day: 'This Friday',
          date: 'July 8, 2022',
          starred: false,
          message:
            "Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. ",
          sender: {
            position: 'Church Secretariat',
            name: 'Most Rev. Peter Paul',
            image: require('../assets/mary.png'),
          },
        },
      },
    ],
  },
  {
    eventID: 3,
    day: 'Next Month',
    events: [
      {
        id: 1,
        image: require('../assets/mary_landscape.png'),
        title: 'Our Lady Of The Rosary Novena',
        subtitle: 'This Friday    July 8',
        content: {
          bannerImage: require('../assets/banner-image.png'),
          title: 'Our Lady of the Rosary Novena',
          day: 'This Friday',
          date: 'July 8, 2022',
          starred: false,
          message:
            "Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. ",
          sender: {
            position: 'Church Secretariat',
            name: 'Most Rev. Peter Paul',
            image: require('../assets/mary.png'),
          },
        },
      },
      {
        id: 2,
        image: require('../assets/mary_landscape.png'),
        title: 'Our Lady Of The Rosary Novena',
        subtitle: 'This Friday    July 8',
        content: {
          bannerImage: require('../assets/banner-image.png'),
          title: 'Our Lady of the Rosary Novena',
          day: 'This Friday',
          date: 'July 8, 2022',
          starred: false,
          message:
            "Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. ",
          sender: {
            position: 'Church Secretariat',
            name: 'Most Rev. Peter Paul',
            image: require('../assets/mary.png'),
          },
        },
      },
    ],
  },
]

const Events = ({ navigation }) => {
  const { user } = useContext(AuthContext)
  const [refreshing, setRefreshing] = useState(false)

  const { request: getEvents, data: events, error, loading } = useApi(
    authApi.getEvents,
  )

  const handleRefresh = () => {
    setRefreshing(true)
    getEvents(user.id).then(() => setRefreshing(false))
  }

  useEffect(() => {
    getEvents(user.id)
  }, [])

  const categorizeDataByDate = () => {
    // const data = events.data

    const thisWeek = []
    const nextWeek = []
    const nextMonth = []
    const afterNextMonth = []

    const now = moment()

    events?.data?.forEach((item) => {
      const itemDate = moment(item.dateOfActivity, moment.ISO_8601)

      if (itemDate.isSame(now, 'week')) {
        thisWeek.push(item)
      } else if (itemDate.isSame(now.clone().add(1, 'week'), 'week')) {
        nextWeek.push(item)
      } else if (itemDate.isSame(now, 'month')) {
        nextMonth.push(item)
      } else {
        afterNextMonth.push(item)
      }
    })

    return {
      thisWeek,
      nextWeek,
      nextMonth,
      afterNextMonth,
    }
  }
  const categorizedData = categorizeDataByDate()

  // if (!loading) {
  //   const categorizedData = categorizeDataByDate()
  //   console.log(categorizedData)
  // }

  return (
    <Screen>
      <HeaderComponent backEnabled navigation={navigation} />
      {user.isGuest ? (
        <LoginRedirect />
      ) : (
        <>
          <Text style={styles.header}>Events</Text>
          {loading && !error ? (
            <Text>Loading</Text>
          ) : (
            // <FlatList
            //   data={eventGroup}
            //   keyExtractor={(item) => item.eventID.toString()}
            //   renderItem={({ item }) => (
            //     <EventCard
            //       label={item.label}
            //       day={item.day}
            //       events={item.events}
            //       navigation={navigation}
            //     />
            //   )}
            // />
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
            >
              {categorizedData.thisWeek.length > 0 && (
                <EventCard
                  day={'This Week'}
                  events={categorizedData.thisWeek}
                  navigation={navigation}
                />
              )}
              {categorizedData.nextWeek.length > 0 && (
                <EventCard
                  day={'Next Week'}
                  events={categorizedData.nextWeek}
                  navigation={navigation}
                />
              )}
              {categorizedData.nextMonth.length > 0 && (
                <EventCard
                  day={'Next Month'}
                  events={categorizedData.nextMonth}
                  navigation={navigation}
                />
              )}
              {categorizedData.afterNextMonth.length > 0 && (
                <EventCard
                  day={'Later'}
                  events={categorizedData.afterNextMonth}
                  navigation={navigation}
                />
              )}
            </ScrollView>

            // <Text>Render</Text>
          )}
        </>
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    fontSize: fonts.fontSizeLarge,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.primary,
  },
  label: {
    color: colors.light,
    fontSize: fonts.fontSizeNormal,
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  day: {
    color: colors.primary,
    fontSize: fonts.fontSizeLarge,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventImage: {
    borderRadius: 10,
    height: 40,
    width: 40,
    marginRight: 10,
  },
  title: {
    fontSize: fonts.fontSizeNormal,
    marginBottom: 4,
  },
  subtitle: {
    color: colors.lighter,
    fontSize: fonts.fontSizeSmall,
  },
})

export default Events
