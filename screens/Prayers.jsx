import React from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import commonprayers from '../assets/icons/Pray.png'
import dailyreadings from '../assets/icons/dailyreadings.png'
import voice from '../assets/icons/Voice-Recognition.png'
import rossary from '../assets/icons/White-Rosary.png'
import cross from '../assets/icons/Christian-Cross.png'

import HeaderComponent from '../components/HeaderComponent'
import Screen from '../components/Screen'
import prayersList from '../services/prayersList'
import rossaryList from '../services/rossaryList'
import stationsList from '../services/stationsList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'flex-start',
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    height: 150,
    width: 150,
    marginBottom: 20,
    borderRadius: 20,
    paddingHorizontal: 3,
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

const Prayers = ({ navigation }) => {
  return (
    <Screen>
      <HeaderComponent title={'Prayers'} backEnabled navigation={navigation} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate('PrayersList', {
              screenTitle: 'Common Prayers',
              data: prayersList,
            })
          }
        >
          <Image
            source={commonprayers}
            style={{ width: '50%', height: '50%', marginBottom: 10 }}
          />
          <Text>Common Prayers</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('DailyReadingsNavigator')}
        >
          <Image
            source={dailyreadings}
            style={{ width: '50%', height: '50%', marginBottom: 10 }}
          />
          <Text>Daily Readings</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('ConfessionGuide')}
        >
          <Image
            source={voice}
            style={{ width: '50%', height: '50%', marginBottom: 10 }}
          />
          <Text>Guidance to confession</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate('PrayersList', {
              screenTitle: 'Rossary',
              data: rossaryList,
            })
          }
        >
          <Image
            source={rossary}
            style={{ width: '50%', height: '50%', marginBottom: 10 }}
          />
          <Text>Rossary</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate('PrayersList', {
              screenTitle: 'Stations of the cross',
              data: stationsList,
            })
          }
        >
          <Image
            source={cross}
            style={{ width: '50%', height: '50%', marginBottom: 10 }}
          />
          <Text>Stations</Text>
        </Pressable>
      </View>
    </Screen>
  )
}

export default Prayers
