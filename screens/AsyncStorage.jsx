import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Button } from 'react-native';
import Screen from '../components/Screen';
import dataStore from '../services/dataStore';

// const storage = useAsyncStorage('@key');

const readings = {
    dailyReadings: [
        {
            id: 1,
            date: {
              dayOfWeek: 'Wednesday',
              day: 1,
              month: 'Jul',
              year: '2022'
            },
            title: 'Justin, Matyr Obligatory Memorial',
            firstReading: 'Acts 20:28-38',
            gospel: 'John 17:11b-19',
            readContent: {
              readNumber: 1,
              title: 'Title 1',
              bibleVerse: '1 pet 5:7',
              content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
              }
          },
          {
            id: 2,
            date: {
              dayOfWeek: 'Wednesday',
              day: 2,
              month: 'Jul',
              year: '2022'
            },
            title: 'Justin, Matyr Obligatory Memorial',
            firstReading: 'Acts 20:28-38',
            gospel: 'John 17:11b-19',
            readContent: {
                readNumber: 1,
                title: 'Memorial of Saint Kateri Tekakwitha, Virgin',
                bibleVerse: 'IS 26:7-9, 12, 16-19',
                content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
              }
          },
          {
            id: 3,
            date: {
              dayOfWeek: 'Wednesday',
              day: 3,
              month: 'Jul',
              year: '2022'
            },
            title: 'Justin, Matyr Obligatory Memorial',
            firstReading: 'Acts 20:28-38',
            gospel: 'John 17:11b-19',
            readContent: {
                readNumber: 1,
                title: 'Title 3',
                bibleVerse: '1 pet 5:7',
                content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
              }
          },
          {
            id: 4,
            date: {
              dayOfWeek: 'Wednesday',
              day: 4,
              month: 'Jul',
              year: '2022'
            },
            title: 'Justin, Matyr Obligatory Memorial',
            firstReading: 'Acts 20:28-38',
            gospel: 'John 17:11b-19',
            readContent: {
                readNumber: 1,
                title: 'Title 4',
                bibleVerse: '1 pet 5:7',
                content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
              }
          },
    ]
}

const AsyncStoraged = ()=> {
    return (
        <Screen>
            <Button title='Add to store' onPress={()=> dataStore.storeData('hymns', JSON.stringify(readings)).then(()=> console.log('done'))}/>
            <Button title='Get from store' onPress={()=> dataStore.getData('hymns').then(value => console.log(JSON.parse(value).dailyReadings))}/>
            <Button title='Update data' onPress={()=> dataStore.updateData('hymns', JSON.stringify({ name: 'Arthur' }))}/>
            <Button title='Get keys' onPress={()=> dataStore.getAllKeys().then(keys => console.log(keys))}/>
            <Button title='Clear data' onPress={()=> dataStore.removeData('hymns').then(() => console.log('Item removed'))}/>
            <Button title='Format memory' onPress={()=> dataStore.formatMemory()}/>
        </Screen>
    ) 
}

export default AsyncStoraged;