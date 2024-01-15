import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  Animated,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../components/colors'
import Screen from '../components/Screen'
import HeaderComponent from '../components/HeaderComponent'
import fonts from '../config/fonts'
import { ZoomButtons } from '../components/ButtonComponent'

const content = {
  contentID: 1,
  bannerImage: require('../assets/banner-image.png'),
  title: 'Our Lady of the Rosary Novena',
  day: 'This Friday',
  date: 'July 8, 2022',
  starred: true,
  content:
    "Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here's the way you figured out the date of Pentecost. ",
  sender: {
    position: 'Church Secretariat',
    name: 'Most Rev. Peter Paul',
    image: require('../assets/mary.png'),
  },
}

const Star = ({ starred, starRemoved, currentState = false }) => {
  const [star, setStar] = useState(currentState)
  return (
    <TouchableWithoutFeedback
      onPress={star ? () => setStar(false) : () => setStar(true)}
    >
      {star ? (
        <MaterialCommunityIcons
          name="star"
          size={25}
          color={colors.primary}
          onPress={starRemoved}
        />
      ) : (
        <MaterialCommunityIcons
          name="star-outline"
          size={25}
          color={colors.lighter}
          onPress={starred}
        />
      )}
    </TouchableWithoutFeedback>
  )
}

const AnnouncementViewScreen = ({ route, navigation }) => {
  const item = route.params

  const [zoomableSmall, setZoomableSmall] = useState(fonts.fontSizeSmall)
  const [zoomableNormal, setFontSize] = useState(fonts.fontSizeNormal)
  const [zoomableMedium, setZoomableMedium] = useState(fonts.fontSizeMedium)

  return (
    <Screen style={styles.container}>
      <HeaderComponent backEnabled navigation={navigation} />
      <ScrollView>
        <View style={{ paddingBottom: 100 }}>
          <Image
            source={
              item.photoUrl
                ? { uri: item.photoUrl }
                : require('../assets/banner-image.png')
            }
            style={styles.banner}
          />

          <Text style={styles.eventTitle}>{item.title}</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Text style={[styles.date, { fontSize: zoomableSmall }]}>
              {new Date(Date.parse(item.dateOfActivity)).toDateString()}
            </Text>
            {/* <Star 
                            currentState={content.starred} 
                            starRemoved={()=> Alert.alert('Star removed')}
                            starred={()=> Alert.alert('Starred')}
                        /> */}
            {/* <MaterialCommunityIcons name="star-outline" color={colors.lighter} size={25}/> */}
          </View>

          <Text style={[styles.content, { fontSize: zoomableNormal }]}>
            {item.body}{' '}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.card}>
        <ZoomButtons
          style={{ marginBottom: 50, top: -70, right: '45%' }}
          onZoomIn={() => (
            zoomableSmall < fonts.fontSizeNormal &&
              setZoomableSmall(zoomableSmall + 1),
            zoomableNormal < fonts.fontSizeLarge &&
              setFontSize(zoomableNormal + 1),
            zoomableMedium < fonts.fontSizeLarge &&
              setZoomableMedium(zoomableMedium + 1)
          )}
          onZoomOut={() => (
            zoomableSmall > fonts.fontSizeSmall &&
              setZoomableSmall(zoomableSmall - 1),
            zoomableNormal > fonts.fontSizeNormal &&
              setFontSize(zoomableNormal - 1),
            zoomableMedium > fonts.fontSizeMedium &&
              setZoomableMedium(zoomableMedium - 1)
          )}
        />
        <Text
          style={{ color: colors.light, fontWeight: '500', marginBottom: 10 }}
        >
          From
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/mary.png')}
            style={styles.eventImage}
          />
          <View style={{ flexGrow: 1 }}>
            <Text style={styles.title}>{item.author}</Text>
            <Text style={styles.subtitle}>#author</Text>
          </View>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  banner: {
    height: 140,
    borderRadius: 20,
    width: '100%',
    marginBottom: 10,
  },
  eventTitle: {
    textAlign: 'center',
    fontSize: fonts.fontSizeLarge,
    fontWeight: '500',
    color: colors.dark,
    marginBottom: fonts.fontSizeSmall,
  },
  date: {
    fontSize: fonts.fontSizeSmall,
    color: colors.lighter,
  },
  content: {
    color: colors.light,
    lineHeight: 25,
    fontSize: fonts.fontSizeNormal,
  },
  card: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    borderRadius: 20,
    paddingVertical: 12,
    paddingBottom: 30,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  eventImage: {
    borderRadius: 10,
    height: 45,
    width: 45,
    marginRight: 10,
  },
  title: {
    fontSize: fonts.fontSizeSmall,
    marginBottom: 4,
  },
  subtitle: {
    color: colors.lighter,
    fontSize: fonts.fontSizeSmaller,
  },
})

export default AnnouncementViewScreen
