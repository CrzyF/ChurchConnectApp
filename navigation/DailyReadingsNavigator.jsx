import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, TouchableOpacity } from "react-native";

import DailyReadings from "../screens/DailyReadings";
import DailyReading from "../screens/DailyReading";

const colors = {
    primary: "#2D9C8D",
    light: "#4F4F4F",
    lighter: "#A9A9A9",
    white: "#fff",
}

const Stack = createNativeStackNavigator();

const DailyReadingsNavigator = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen 
            name='DailyReadings' 
            component={DailyReadings}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='DailyReading' 
            component={DailyReading}
            options={{
                title: 'Daily Readings', 
                headerTintColor: colors.primary,
                headerShown: false,
                headerTitleStyle: {fontWeight: "bold", fontSize: 20},
                // headerLeft: ()=> <BackButton onPress={()=> navigation.navigate('DailyReadings')}/>
            }}
        />
    </Stack.Navigator>
)

export default DailyReadingsNavigator;