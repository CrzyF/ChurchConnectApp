import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Swiper from 'react-native-swiper'
import HeaderComponent from '../components/HeaderComponent'

import Screen from '../components/Screen'
import colors from '../components/colors'
import fonts from '../config/fonts'
import { ZoomButtons } from '../components/ButtonComponent'

const {
  fontSizeSmall,
  fontSizeLarge,
  fontSizeMedium,
  fontSizeNormal,
  fontSizeSmaller,
} = fonts

const Reading = ({
  title,
  readNumber,
  bibleVerse,
  content,
  readNumberSize,
  bibleVerseSize,
  readContentSize,
}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {/* <Text style={{color: colors.lighter, textAlign: 'center', marginBottom: 15}}>Lectionary: 392</Text> */}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Text style={[styles.readNumber, { fontSize: readNumberSize }]}>
          Reading {readNumber}
        </Text>
        <Text style={[styles.bibleVerse, { fontSize: bibleVerseSize }]}>
          {bibleVerse}
        </Text>
      </View>
      <Text style={[styles.readContent, { fontSize: readContentSize }]}>
        {content}
      </Text>
    </View>
  )
}

const DailyReading = ({ route, navigation }) => {
  const { item, list: readList } = route.params

  const [zoomableSmall, setZoomableSmall] = useState(fonts.fontSizeSmall)
  const [zoomableNormal, setFontSize] = useState(fonts.fontSizeNormal)
  const [zoomableMedium, setZoomableMedium] = useState(fonts.fontSizeMedium)

  return (
    <Screen>
      <HeaderComponent
        navigation={navigation}
        backEnabled
        iconName={'magnify'}
      />
      {/* <Swiper 
                style={{marginTop: 0}} 
                showsButtons loop={false} 
                showsPagination={false} 
                prevButton={
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.controlButton, {marginRight: 10}]}><MaterialCommunityIcons name='chevron-left' size={25} color={colors.primary}/></View>
                    </View>
                }
                nextButton={
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.controlButton, {marginLeft: 10}]}><MaterialCommunityIcons name='chevron-right' size={25} color={colors.primary}/></View>
                    </View>
                }
                buttonWrapperStyle={{alignItems: 'flex-start', paddingTop: 60}}
                index={readList.indexOf(item)}
            >
                { 
                    readList.map(
                        (element, index)=> {
                            return (
                                <View key={index}>
                                    <Text style={{textAlign: 'center', color: colors.primary, fontSize: 25, fontWeight: '800'}}>{element.date.month+ ' ' + element.date.day +', '+element.date.year}</Text>
                                    
                                    <Reading 
                                        readNumber={element.readContent.readNumber}
                                        title={element.readContent.title}
                                        bibleVerse={element.readContent.bibleVerse}
                                        content={element.readContent.content}
                                        bibleVerseSize={zoomableSmall}
                                        readContentSize={zoomableNormal}
                                        readNumberSize={zoomableMedium}
                                    />
                                </View>
                            )
                        }
                    ) 
                }
            </Swiper> */}
      <ScrollView style={{ flex: 1 }}>
        {item.sections.map((reading, index) => (
          <View key={index} style={{ marginBottom: 30 }}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.primary,
                fontSize: 25,
                fontWeight: '800',
                marginBottom: 20,
              }}
            >
              {reading.title}
            </Text>
            <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
              {reading.reference}
            </Text>
            {reading.referencePassages.map((passage, index) => (
              <View key={index} style={{}}>
                {/* <Text style={[styles.readNumber, { fontSize: zoomableNormal }]}>
                  {passage.verse + '. '}
                </Text> */}
                <Text
                  style={[styles.readContent, { fontSize: zoomableNormal }]}
                >
                  {passage.text}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <ZoomButtons
        style={{ top: '50%', marginRight: 10 }}
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
    </Screen>
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
  title: {
    alignSelf: 'center',
    fontSize: fonts.fontSizeMedium,
    fontWeight: '500',
    marginVertical: 30,
    color: colors.primary,
    width: 250,
    textAlign: 'center',
  },
  controlButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
    padding: 3,
    maxHeight: 30,
  },
  readNumber: {
    fontWeight: '500',
    color: colors.primary,
  },
  bibleVerse: {
    fontSize: fontSizeSmall,
    color: colors.light,
  },
  readContent: {
    color: colors.light,
    lineHeight: 25,
  },
  date: {
    color: colors.primary,
    fontSize: fontSizeSmall,
  },
})

export default DailyReading
