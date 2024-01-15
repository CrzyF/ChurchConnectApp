import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import News from "../screens/News";
import AnnouncementViewScreen from "../screens/AnnouncementViewScreen";

const Stack = createNativeStackNavigator();

const NewsNavigator = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen 
            name='News' 
            component={News}
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

export default NewsNavigator;