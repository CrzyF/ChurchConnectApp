import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Annoucements from "../screens/Annoucement";
import AnnouncementViewScreen from "../screens/AnnouncementViewScreen";

const Stack = createNativeStackNavigator();

const AnnouncementNavigator = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen 
            name='Announcement' 
            component={Annoucements}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='AnnouncementView' 
            component={AnnouncementViewScreen}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
)

export default AnnouncementNavigator;