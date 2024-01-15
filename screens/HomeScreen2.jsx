import * as React from 'react'

import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
  FlatList,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import handshake from '../assets/handshake.png'
import notify from '../assets/Notification.png'
// import HomeSlide from "./HomeSlide";
import slide1 from '../assets/homeslide.jpg'
import hymnicon from '../assets/hymn.png'
import prayer from '../assets/prayer.png'
import news from '../assets/NewspaperClipping.png'
import readings from '../assets/readings.png'
import Screen from '../components/Screen'
import fonts from '../config/fonts'
import AuthContext from '../auth/context'
import LoginRedirect from '../components/LoginRedirect'
import Swiper from 'react-native-swiper'
// import announcements from "../services/announcements";
import colors from '../components/colors'
import dailyReadings from '../services/dailyReadings'
import useApi from '../services/useApi'
import authApi from '../services/auth'
// import Bottomnavigation from "../navigation/tabs";

import annoucement from '../assets/BellSimpleRinging.png'
import schedule from '../assets/Calendar.png'
import events from '../assets/FlagBanner.png'
import leadership from '../assets/UsersThree.png'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'flex-start',
  },
  contain: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  topheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerContent: {
    paddingVertical: 15,
  },
  columnCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    height: 70,
    width: 70,
    borderRadius: 35,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#314F7C',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 16,
  },
  cardText: {
    fontSize: fonts.fontSizeSmall,
    color: '#818E9E',
    marginTop: 5,
  },
  containCard: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  actionCard: {
    backgroundColor: '#fff',
    height: 150,
    width: 150,
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#314F7C',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 16,
  },
})

const HomeScreen2 = ({ navigation }) => {
  const { user } = React.useContext(AuthContext)

  const {
    request: getAnnouncements,
    data: announcements,
    loading,
    error,
  } = useApi(authApi.getAnnouncement)

  // React.useEffect(() => {
  //   getAnnouncements(user.id)

  //   if (error) {
  //     console.log('Error getting announcements...')
  //     return
  //   }
  //   if (loading) {
  //     console.log('Loading...')
  //   }
  // }, [])

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.topheader}>
          <View>
            <View>
              <Text>
                {' '}
                <Image source={handshake} style={{ width: 20, height: 20 }} />
                Hi Catholic faithful!!
              </Text>
            </View>
            <View>
              <Text style={{ color: '#818E9E', marginRight: 10 }}>
                Let's feed your soul today
                <Text
                  style={{
                    color: '#1C7676',
                    fontWeight: 'bold',
                  }}
                >
                  25.07.22
                </Text>
              </Text>
            </View>
          </View>
          <Pressable onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons name="format-align-right" size={25} color />
          </Pressable>
        </View>

        <View style={styles.containerContent}>
          {/* <Image
              source={slide1}
              alt=""
              style={{ width: "100%", height: 180, borderRadius: 10 }}
            /> */}

          <View style={{ overflow: 'hidden', borderRadius: 10 }}>
            <ImageBackground
              style={{ width: '100%', height: 180 }}
              imageStyle={{ borderRadius: 10 }}
              source={slide1}
              borderRadius={10}
            >
              {/* <Text style={{ paddingVertical: 10, textAlign: 'center', backgroundColor: colors.primary, fontWeight: '800' }}>Daily Reading</Text> */}
              <Swiper autoplayTimeout={7} autoplay showsPagination={false}>
                {dailyReadings.map((reading, index) => {
                  return (
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      key={index}
                      onPress={() =>
                        navigation.navigate('DailyReading', {
                          item: reading,
                          list: dailyReadings,
                        })
                      }
                    >
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 20,
                          backgroundColor: 'rgba(0, 0, 0, .7)',
                        }}
                      >
                        <Text
                          style={{
                            color: colors.white,
                            fontWeight: '700',
                            fontSize: fonts.fontSizeMedium,
                            marginBottom: 10,
                            textAlign: 'center',
                          }}
                        >
                          {reading.readContent.title}
                        </Text>
                        <Text
                          style={{
                            color: colors.white,
                            textAlign: 'center',
                            fontWeight: '700',
                          }}
                          numberOfLines={3}
                        >
                          {reading.readContent.content}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </Swiper>
            </ImageBackground>
          </View>

          <View style={styles.actionContainer}>
            <Pressable
              style={styles.actionCard}
              onPress={() => navigation.navigate('HymnsNavigator')}
            >
              <Image
                source={hymnicon}
                style={{ width: '50%', height: '50%', marginBottom: 10 }}
              />
              <Text>Hymns</Text>
            </Pressable>
            <Pressable
              style={styles.actionCard}
              onPress={() => navigation.navigate('AnnouncementNavigator')}
            >
              <Image
                source={annoucement}
                style={{ width: '50%', height: '50%', marginBottom: 10 }}
              />
              <Text>Announcement</Text>
            </Pressable>
            <Pressable
              style={styles.actionCard}
              onPress={() => navigation.navigate('PrayersNavigator')}
            >
              <Image
                source={prayer}
                style={{ width: '50%', height: '50%', marginBottom: 10 }}
              />
              <Text>Common Prayers</Text>
            </Pressable>
            <Pressable
              style={styles.actionCard}
              onPress={() => navigation.navigate('DailyReadingsNavigator')}
            >
              <Image
                source={readings}
                style={{ width: '50%', height: '50%', marginBottom: 10 }}
              />
              <Text>Daily Readings</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  )
}

export default HomeScreen2
