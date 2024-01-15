// React Native Date Picker – To Pick the Date using Native Calendar
// https://aboutreact.com/react-native-datepicker/

// import React in our code
import React, { useState } from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


//import DatePicker from the package we installed
import DatePicker from 'react-native-datepicker';
import colors from './colors';
import fonts from '../config/fonts';

const App = ({ onSelectDate, style }) => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth()+1).padStart(2, '0');
  const year = String(today.getFullYear());
  const todayDate = day + '-' + month + '-' + year;


  const [date, setDate] = useState(todayDate);

  const years = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const dateMonth = years[parseInt(date.substring(3, 5)) -1] + ' ' + date.substring(6);
  
  const DatePreview = ()=> (
    <View>
      <Text style={styles.dateText}>{dateMonth}</Text>
      <MaterialCommunityIcons 
          name='calendar-blank' 
          size={20} 
          color={colors.primary}
          style={{position: 'absolute', end: 0}}
        />
    </View>
  )

  return (
      <>
        <DatePicker
          style={[styles.datePickerStyle, style]}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate={todayDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateText: {
              display: 'none'
            },
            dateInput: {
              borderWidth: 1,
              display: 'none'
            },
          }}
          onDateChange={(date) => {
            setDate(date);
            onSelectDate(years[parseInt(date.substring(3, 5)) -1] + ' ' + date.substring(6));
          }}
          iconComponent={
            <DatePreview />
          }
        />
      </>
  );
};

export default App;

const styles = StyleSheet.create({
  datePickerStyle: {
    padding: 0
  },
  dateText: {
    color: colors.lighter,
    fontSize: fonts.fontSizeMedium,
    marginEnd: 30
  }
});
