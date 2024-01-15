import { useEffect, useState } from 'react';
import { getDatabase, ref, child, set, get, onValue } from 'firebase/database';
import app from '../config/firebaseConfig';
import _ from 'lodash';

const dailyReadings = [
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
    {
      id: 5,
      date: {
        dayOfWeek: 'Wednesday',
        day: 5,
        month: 'Jul',
        year: '2022'
      },
      title: 'Justin, Matyr Obligatory Memorial',
      firstReading: 'Acts 20:28-38',
      gospel: 'John 17:11b-19',
      readContent: {
          readNumber: 1,
          title: 'Title 5',
          bibleVerse: '1 pet 5:7',
          content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
        }
    },
    {
      id: 6,
      date: {
        dayOfWeek: 'Wednesday',
        day: 6,
        month: 'Jul',
        year: '2022'
      },
      title: 'Justin, Matyr Obligatory Memorial',
      firstReading: 'Acts 20:28-38',
      gospel: 'John 17:11b-19',
      readContent: {
          readNumber: 1,
          title: 'Title 6',
          bibleVerse: '1 pet 5:7',
          content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
          
        }
    },
    {
      id: 7,
      date: {
        dayOfWeek: 'Wednesday',
        day: 7,
        month: 'Jul',
        year: '2022'
      },
      title: 'Justin, Matyr Obligatory Memorial',
      firstReading: 'Acts 20:28-38',
      gospel: 'John 17:11b-19',
      readContent: {
          readNumber: 1,
          title: 'Title 7',
          bibleVerse: '1 pet 5:7',
          content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
          
        }
    },
    {
      id: 8,
      date: {
        dayOfWeek: 'Wednesday',
        day: 8,
        month: 'Jul',
        year: '2022'
      },
      title: 'Justin, Matyr Obligatory Memorial',
      firstReading: 'Acts 20:28-38',
      gospel: 'John 17:11b-19',
      readContent: {
          readNumber: 1,
          title: 'Title 8',
          bibleVerse: '1 pet 5:7',
          content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
          
        }
    },
    {
      id: 9,
      date: {
        dayOfWeek: 'Wednesday',
        day: 9,
        month: 'Jul',
        year: '2022'
      },
      title: 'Justin, Matyr Obligatory Memorial',
      firstReading: 'Acts 20:28-38',
      gospel: 'John 17:11b-19',
      readContent: {
          readNumber: 1,
          title: 'Title 9',
          bibleVerse: '1 pet 5:7',
          content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
          
        }
    },
    {
      id: 10,
      date: {
        dayOfWeek: 'Wednesday',
        day: 10,
        month: 'Jul',
        year: '2022'
      },
      title: 'Justin, Matyr Obligatory Memorial',
      firstReading: 'Acts 20:28-38',
      gospel: 'John 17:11b-19',
      readContent: {
          readNumber: 1,
          title: 'Title 10',
          bibleVerse: '1 pet 5:7',
          content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
          
        }
    },
    {
      id: 11,
      date: {
        dayOfWeek: 'Wednesday',
        day: 11,
        month: 'Oct',
        year: '2022'
      },
      title: 'Justin, Matyr Obligatory Memorial',
      firstReading: 'Acts 20:28-38',
      gospel: 'John 17:11b-19',
      readContent: {
          readNumber: 1,
          title: 'Title 11',
          bibleVerse: '1 pet 5:7',
          content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
          
        }
    },
    {
      id: 12,
      date: {
        dayOfWeek: 'Wednesday',
        day: 1,
        month: 'Apr',
        year: '2022'
      },
      title: 'Justin, Matyr Obligatory Memorial',
      firstReading: 'Acts 20:28-38',
      gospel: 'John 17:11b-19',
      readContent: {
          readNumber: 1,
          title: 'Title 12',
          bibleVerse: '1 pet 5:7',
          content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
          
        }
    },
    {
      id: 13,
      date: {
        dayOfWeek: 'Wednesday',
        day: 1,
        month: 'Apr',
        year: '2022'
      },
      title: 'Justin, Matyr Obligatory Memorial',
      firstReading: 'Acts 20:28-38',
      gospel: 'John 17:11b-19',
      readContent: {
          readNumber: 1,
          title: 'Title 13',
          bibleVerse: '1 pet 5:7',
          content: "The way of the just is smooth; the path of the just you make level. Yes, for your way and your judgments, O LORD, we look to you; Your name and your title are the desire of our souls. My soul yearns for you in the night, yes, my spirit within me keeps vigil for you; When your judgment dawns upon the earth, the world’s inhabitants learn justice. O LORD, you mete out peace to us, for it is you who have accomplished all we have done.",
          
        }
    },
]

export const getDailyReadings = ()=> {
  let readings = null;

  const db = getDatabase();
  const dbRef = ref(db, 'readings/');
  onValue(dbRef, (snapshot) => {
    readings = _.map(snapshot.val())
  });
  return readings;
}

export default dailyReadings;