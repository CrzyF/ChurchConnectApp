import React, { useCallback, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../components/colors'
import HeaderComponent from '../components/HeaderComponent'
import Screen from '../components/Screen'
import fonts from '../config/fonts'
import SearchBar from '../components/SearchBar'
import hymnsList from '../services/hymnsList'

const ListItem = ({ onPress, title, itemNumber }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.hymnItem}>
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

const HymnListScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('')
  const [data, setData] = useState(hymnsList.slice(0, 10)) // Show 10 items initially
  const [reduceCount, setReduceCount] = useState(0)

  // const partOfHymnsList = hymnsList //.slice(0, loadCount)
  const filtered = (filter ? hymnsList : data).filter(
    (hymn) => hymn.title.includes(filter) || hymn.number.includes(filter),
  )

  const handleLoadMore = () => {
    const newData = hymnsList.slice(data.length, data.length + 10) // Load 10 more items
    setData([...data, ...newData])
  }

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent

    if (contentOffset.y < -100 && reduceCount < data.length) {
      const newData = data.slice(0, data.length - 1)
      setData(newData)
      setReduceCount(reduceCount + 1)
    }
  }

  const renderHymnList = useCallback(
    ({ item }) => (
      <ListItem
        itemNumber={item.hymnID}
        title={item.title}
        onPress={() => navigation.navigate('HymnView', { item })}
      />
    ),
    [],
  )

  return (
    <Screen>
      <HeaderComponent
        navigation={navigation}
        backEnabled
        title={'Catholic Hymns'}
      />

      <SearchBar
        placeholder={'Search hymns...'}
        style={{ backgroundColor: 'transparent' }}
        color={colors.dark}
        onTextChange={(text) => setFilter(text)}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.hymnID.toString()}
        renderItem={renderHymnList}
        ItemSeparatorComponent={() => <ItemSeparator />}
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        onScroll={handleScroll}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  itemSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.lighter,
  },
  hymnItem: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.fontSizeNormal,
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
})

export default HymnListScreen
