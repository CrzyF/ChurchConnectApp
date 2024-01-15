import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Prayers from "../screens/Prayers";
import DailyReadingsNavigator from "./DailyReadingsNavigator";
import PrayersListScreen from "../screens/PrayersListScreen";
import PrayersListDetail from "../screens/PrayersListDetails";
import ConfessionGuideScreen from "../screens/ConfessionGuideScreen";

const Stack = createNativeStackNavigator();

const PrayersNavigator = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen 
            name='Prayers' 
            component={Prayers}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='PrayersList' 
            component={PrayersListScreen}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='PrayersListDetail' 
            component={PrayersListDetail}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='ConfessionGuide' 
            component={ConfessionGuideScreen}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='DailyReadingsNavigator' 
            component={DailyReadingsNavigator}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
)

export default PrayersNavigator;