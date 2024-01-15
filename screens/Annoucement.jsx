import React, { useContext, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from 'react-native'
import Screen from '../components/Screen'
import HeaderComponent from '../components/HeaderComponent'
import fonts from '../config/fonts'
import SearchFilter from '../components/SearchFilter'
import AuthContext from '../auth/context'
import LoginRedirect from '../components/LoginRedirect'
// import announcements from "../services/announcements";
import authApi from '../services/auth'
import useApi from '../services/useApi'
import colors from '../components/colors'

const styles = StyleSheet.create({
  container: {},
  list: {
    alignItems: 'flex-start',
  },
  listitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  heading: {
    fontSize: fonts.fontSizeNormal,
    fontWeight: '500',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: fonts.fontSizeSmall,
    color: '#999',
  },
  column8: {
    flexDirection: 'column',
    width: '80%',
    marginRight: 10,
  },
  column4: {
    flexDirection: 'column',
    width: '20%',
  },
  listImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  searcharea: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchbar: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    shadowColor: '#314F7C',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 16,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 50,
    width: '100%',
    shadowColor: '#314F7C',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
})

const Announcement = ({ title, subtitle, image, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.listitem}>
        <View style={styles.column4}>
          <Image source={image} style={styles.listImage} />
        </View>
        <View style={styles.column8}>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const Annoucements = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext)

  const {
    request: getAnnouncements,
    data: announcements,
    loading,
    error,
  } = useApi(authApi.getAnnouncement)

  useEffect(() => {
    getAnnouncements(user.id)

    // if (error) {
    //   console.log('Error getting announcements...')
    //   return
    // }
    // if (loading) {
    //   console.log('Loading...')
    // }
  }, [])

  return (
    <Screen style={styles.container}>
      <HeaderComponent
        backEnabled
        title={'Announcements'}
        navigation={navigation}
      />

      <SearchFilter
        placeholder={'Search announcements...'}
        style={{ marginBottom: 20 }}
      />

      {/* {!loading && console.log(length)} */}

      {user.isGuest ? (
        <LoginRedirect />
      ) : (
        <>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <View style={{ flex: 1 }}>
              {!loading && error && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.light,
                    position: 'absolute',
                    // marginTop: 50,
                  }}
                >
                  Unable to load announcements please... please try again
                </Text>
              )}
              <FlatList
                data={announcements.data?.sort(
                  (a, b) =>
                    new Date(b.dateOfActivity) - new Date(a.dateOfActivity),
                )}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <>
                    {!loading && announcements.data.length === 0 && (
                      <Text
                        style={{ textAlign: 'center', color: colors.light }}
                      >
                        No announcement available
                      </Text>
                    )}
                    <Announcement
                      title={item.title}
                      subtitle={new Date(
                        Date.parse(item.dateOfActivity),
                      ).toDateString()}
                      image={
                        item.photoUrl
                          ? { uri: item.photoUrl }
                          : require('../assets/mary.png')
                      }
                      onPress={() =>
                        navigation.navigate('AnnouncementView', item)
                      }
                    />
                  </>
                )}
                refreshing={loading}
                onRefresh={() => getAnnouncements(user.id)}
              />
            </View>
          )}
        </>
      )}
    </Screen>
  )
}

export default Annoucements
