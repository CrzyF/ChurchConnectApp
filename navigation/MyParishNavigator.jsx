import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AnnouncementNavigator from "./AnnouncementNavigator";
import Schedules from "../screens/Schedules";
import MyParish from "../screens/MyParish";
import Leadership from "../screens/Leadership2";
import EventsNavigator from "./EventsNavigator";

const Stack = createNativeStackNavigator();

const MyParishNavigator = ({ navigation }) => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyParish" component={MyParish}/>
        <Stack.Screen name="AnnouncementNavigator" component={AnnouncementNavigator}/>
        <Stack.Screen name="Schedules" component={Schedules}/>
        <Stack.Screen name="EventsNavigator" component={EventsNavigator}/>
        <Stack.Screen name="Leadership" component={Leadership}/>
    </Stack.Navigator>
)

export default MyParishNavigator;