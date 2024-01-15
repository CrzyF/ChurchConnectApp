import React, { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Button, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePickerScreen({ cancelStyle, onDateSelect, visibility = true, onCancel }) {

  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const [timePicker, setTimePicker] = useState(false);

  const [time, setTime] = useState(new Date(Date.now()));

  function showDatePicker() {
    setDatePicker(visibility);
  };

  function showTimePicker() {
    setTimePicker(true);
  };

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  };

  const months = [''];

  return (
      <View style={styleSheet.MainContainer}>

        {/* <Text style={styleSheet.text}>Date = {date.toDateString()}</Text> */}

        {/* <Text style={styleSheet.text}>Time = {time.toLocaleTimeString('en-US')}</Text> */}

        {/* {datePicker && ( */}
          <>
          {Platform.OS === 'ios' && <Text style={[{ backgroundColor: 'white', width: '100%', textAlign: "right", padding: 10 }, cancelStyle]} onPress={()=> setDatePicker(false)}>Cancel</Text>}
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={(event, date)=> onDateSelect(date.toDateString().substring(4, 7).toLowerCase() + date.getFullYear().toString())}
            style={styleSheet.datePicker}
          />
          </>
        {/* )} */}

        {timePicker && (
          <DateTimePicker
            value={time}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={onTimeSelected}
            style={styleSheet.datePicker}
          />
        )}

        {!datePicker && (
          <View style={{ margin: 10 }}>
            <Button title="Show Date Picker" color="green" onPress={showDatePicker} />
          </View>
        )}

        {/* {!timePicker && (
          <View style={{ margin: 10 }}>
            <Button title="Show Time Picker" color="green" onPress={showTimePicker} />
          </View>
        )} */}

      </View>
  );
}

const styleSheet = StyleSheet.create({

  MainContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    position: "absolute",
    height: '100%',
    width: '100%'
  },

  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center'
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 260,
    display: 'flex',
    backgroundColor: 'white'
  },

});