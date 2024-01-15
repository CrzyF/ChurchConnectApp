import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Swiper from 'react-native-swiper'

import colors from '../components/colors'
import HeaderComponent from '../components/HeaderComponent'
import Screen from '../components/Screen'
import fonts from '../config/fonts'
import { ZoomButtons } from '../components/ButtonComponent'

const PrayersComponent = ({ contents, fontSize }) => {
  return (
    <ScrollView>
      <Text style={styles.verse}> {contents.title} </Text>

      <Text style={[styles.hymn, { fontSize: fontSize }]}>
        {element.paragraph}
      </Text>
    </ScrollView>
  )
}

const PrayersListDetail = ({ navigation, route }) => {
  const { item } = route.params

  const [fontSize, setFontSize] = useState(fonts.fontSizeNormal)

  const [screenTitle, setScreenTitle] = useState(item.title)
  return (
    <Screen>
      <HeaderComponent
        backEnabled
        navigation={navigation}
        // title={item.title}
      />
      {/* <Swiper 
                style={styles.wrapper} 
                showsButtons loop={false} 
                showsPagination={false} 
                nextButton={
                    <View style={[styles.controlButton, {backgroundColor: colors.primary}]}>
                        <Text style={{color: colors.white, marginRight: 10, marginStart: 5}}>NEXT</Text>
                        <MaterialCommunityIcons name='arrow-right-drop-circle' size={25} color={colors.white}/>
                    </View>
                }
                prevButton={
                    <View style={styles.controlButton}>
                        <MaterialCommunityIcons name='arrow-left-drop-circle' size={25} color={colors.primary}/>
                        <Text style={{color: colors.primary, marginLeft: 10, marginEnd: 5}}>BACK</Text>
                    </View>
                }
                buttonWrapperStyle={{alignItems: 'flex-end'}}
                index={item.hymnID -1}
                disableScrollViewPanResponder
            >
                {listItems.map((element, index)=> {
                    if(element.content.message) {
                        return (
                            <ScrollView key={index} contentContainerStyle={{ paddingBottom: 100 }}>
                                <Text style={styles.verse}> {element.content.title} </Text>
                                <Text style={[styles.hymn, {fontSize: fontSize}]}>{element.content.message.replace(/Leader/g,'(Leader)').replace(/All/g, '(All)')}</Text>
                            </ScrollView>
                        )
                    }
                    else {
                        return (
                            <ScrollView key={index} contentContainerStyle={{ paddingBottom: 100 }}>
                                <Text style={styles.verse}> {element.title} </Text>
                                <Text style={[styles.hymn, {fontSize: fontSize}]}>{element.content}</Text>
                            </ScrollView>
                        )
                    }
                })}
            </Swiper> */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.verse}>
          {' '}
          {item.content.title ? item.content.title : item.title}{' '}
        </Text>
        <Text style={[styles.hymn, { fontSize: fontSize }]}>
          {item.content.message ? item.content.message : item.content}
        </Text>
      </ScrollView>

      <View style={{ position: 'relative' }}>
        <ZoomButtons
          style={{ marginBottom: 150 }}
          onZoomIn={() =>
            fontSize < fonts.fontSizeLarge && setFontSize(fontSize + 1)
          }
          onZoomOut={() =>
            fontSize > fonts.fontSizeNormal && setFontSize(fontSize - 1)
          }
        />
      </View>
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
  },
  verse: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fonts.fontSizeLarge,
    marginBottom: 10,
    textAlign: 'center',
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

export default PrayersListDetail
