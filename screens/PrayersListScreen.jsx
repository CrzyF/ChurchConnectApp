import React, { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Screen from '../components/Screen'
import HeaderComponent from '../components/HeaderComponent'
import fonts from '../config/fonts'
import SearchFilter from '../components/SearchFilter'

import prayersList from '../services/prayersList'
import colors from '../components/colors'
import SearchBar from '../components/SearchBar'

const styles = StyleSheet.create({
  itemSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.lighter,
  },
  prayerItem: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.fontSizeNormal,
  },
})

const ListItem = ({ onPress, title, itemNumber }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.prayerItem}>
        <Text style={[styles.title, { marginRight: 10 }]}>
          {itemNumber + '.'}
        </Text>
        <Text
          style={[styles.title, { flexGrow: 1, width: '80%' }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={colors.lighter}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const ItemSeparator = () => {
  return <View style={styles.itemSeparator}></View>
}

const PrayersListScreen = ({ navigation, route }) => {
  const routeData = route.params
  // console.log(data);

  const [filter, setFilter] = useState('')
  const filtered = routeData.data.filter(
    (prayer) => prayer.title.includes(filter) || prayer.number.includes(filter),
  )

  return (
    <Screen>
      <HeaderComponent
        navigation={navigation}
        backEnabled
        title={routeData.screenTitle}
      />

      <SearchBar
        placeholder={'Search hymns...'}
        style={{ backgroundColor: 'transparent' }}
        color={colors.dark}
        onTextChange={(text) => setFilter(text)}
      />

      {/* <ListComponent 
          listItems={prayersList} 
          numbOfListPerPage={12} 
          onItemPress={(listItems, item)=> navigation.navigate('PrayersListDetail', {item, listItems})}
        /> */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.hymnID.toString()}
        renderItem={({ item }) => (
          <ListItem
            itemNumber={item.hymnID}
            title={item.title}
            onPress={() => navigation.navigate('PrayersListDetail', { item })}
          />
        )}
        ItemSeparatorComponent={() => <ItemSeparator />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Screen>
  )
}

export default PrayersListScreen
