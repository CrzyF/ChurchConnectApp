import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Swiper from 'react-native-swiper'

import colors from '../components/colors'
import HeaderComponent from '../components/HeaderComponent'
import Screen from '../components/Screen'
import fonts from '../config/fonts'
import { ZoomButtons } from '../components/ButtonComponent'

const HymnComponent = ({
  hymnNumber,
  title,
  verses,
  verseNumberSize,
  verseSize,
  extra,
}) => {
  return (
    <View key={hymnNumber} style={{ paddingBottom: 230 }}>
      <Text style={styles.header}>{hymnNumber}</Text>
      <Text style={[styles.header, { marginBottom: 20 }]}>{title}</Text>

      <ScrollView>
        {extra && (
          <>
            <View style={{ left: '10%', marginBottom: 10 }}>
              <Text style={[styles.verse, { fontSize: verseNumberSize }]}>
                {extra.title}
              </Text>
              <Text style={[styles.hymn, { fontSize: verseSize }]}>
                {extra.content}
              </Text>
            </View>
          </>
        )}
        {verses.map((verse, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={[styles.verse, { fontSize: verseNumberSize }]}>
              Verse {index + 1}
            </Text>
            <Text style={[styles.hymn, { fontSize: verseSize }]}>{verse}</Text>
            {verse.extra && (
              <>
                <View style={{ left: '10%', marginTop: 10 }}>
                  <Text style={[styles.verse, { fontSize: verseNumberSize }]}>
                    {verse.extra.title}
                  </Text>
                  <Text style={[styles.hymn, { fontSize: verseSize }]}>
                    {verse.extra.content}
                  </Text>
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const HymnView = ({ navigation, route }) => {
  const { item } = route.params

  const [fontSize, setFontSize] = useState(fonts.fontSizeNormal)
  const [fontSizeM, setFontSizeM] = useState(fonts.fontSizeMedium)

  return (
    <Screen>
      <HeaderComponent backEnabled navigation={navigation} />
      {/* <Swiper
        style={styles.wrapper}
        showsButtons
        loop={false}
        showsPagination={false}
        nextButton={
          <View
            style={[styles.controlButton, { backgroundColor: colors.primary }]}
          >
            <Text
              style={{ color: colors.white, marginRight: 10, marginStart: 5 }}
            >
              NEXT
            </Text>
            <MaterialCommunityIcons
              name="arrow-right-drop-circle"
              size={25}
              color={colors.white}
            />
          </View>
        }
        prevButton={
          <View style={styles.controlButton}>
            <MaterialCommunityIcons
              name="arrow-left-drop-circle"
              size={25}
              color={colors.primary}
            />
            <Text
              style={{ color: colors.primary, marginLeft: 10, marginEnd: 5 }}
            >
              BACK
            </Text>
          </View>
        }
        buttonWrapperStyle={{ alignItems: 'flex-end' }}
        index={item.hymnID - 1}
      >
        {listItems.map((element, index) => {
          return (
            <View key={index}>
              <HymnComponent
                hymnNumber={element.number}
                title={element.title}
                verses={element.verses}
                verseNumberSize={fontSizeM}
                verseSize={fontSize}
                extra={element.extra}
              />
            </View>
          )
        })}
      </Swiper> */}
      <View>
        <HymnComponent
          hymnNumber={item.number}
          title={item.title}
          verses={item.verses}
          verseNumberSize={fontSizeM}
          verseSize={fontSize}
          extra={item.extra}
        />
      </View>

      <ZoomButtons
        style={{ top: '50%', marginRight: 10 }}
        onZoomIn={() => (
          fontSize < fonts.fontSizeLarge && setFontSize(fontSize + 1),
          fontSizeM < fonts.fontSizeLarge && setFontSizeM(fontSizeM + 1)
        )}
        onZoomOut={() => (
          fontSize > fonts.fontSizeNormal && setFontSize(fontSize - 1),
          fontSizeM > fonts.fontSizeMedium && setFontSizeM(fontSizeM - 1)
        )}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'flex-start',
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  header: {
    alignSelf: 'center',
    fontSize: fonts.fontSizeLarge,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  verse: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: fonts.fontSizeMedium,
    marginBottom: 10,
  },
  hymn: {
    color: colors.light,
    lineHeight: 25,
    fontSize: fonts.fontSizeNormal,
  },
  controlButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default HymnView
