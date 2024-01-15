import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Events from "../screens/Events";
import AnnouncementViewScreen from "../screens/AnnouncementViewScreen";

const Stack = createNativeStackNavigator();

const EventsNavigator = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen 
            name='Events' 
            component={Events}
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

export default EventsNavigator;