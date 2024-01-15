import * as React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DailyReadingsNavigator from "./DailyReadingsNavigator";
import HymnsNavigator from './HymnsNavigator';
import PrayersNavigator from "./PrayersNavigator";
import HomeNavigator from "./HomeNavigator";
import MyParishNavigator from "./MyParishNavigator";
import colors from "../components/colors";


// Implementing a Bottom-Tab Navigator 
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
  style={{
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  }}
    onPress={onPress}
  >
    <View style={{
      width: 70,
      height: 70, 
      borderRadius: 35,
      backgroundColor: '#fff',
    }}>
      {children}
    </View>
  </TouchableOpacity>
)

const TabNavigatorRoutes = () => (
      <Tab.Navigator screenOptions={{
          activeBackgroundColor: "#fff",
          activeTintColor: "#2D9C8D",
          headerShown: false, 
        }} 
        safeAreaInsets={{bottom: 20}}
      >

        <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={{
          tabBarShowLabel: false,
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
              source={require('../assets/icons/home.png')}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#2D9C8D" : "#A9A9A9",
              }}
            />
            <Text style={{color: focused ? "#2D9C8D" : "#A9A9A9", fontSize: 12}}>Home</Text>
            </View>
          )
          }}/>
        <Tab.Screen name="MyParishNavigator" component={MyParishNavigator} options={{
          tabBarShowLabel: false,
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
              source={require('../assets/icons/parish.png')}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#2D9C8D" : "#A9A9A9",
              }}
            />
            <Text style={{color: focused ? "#2D9C8D" : "#A9A9A9", fontSize: 12}}>My Parish</Text>
            </View>
          )
          }}/>
        <Tab.Screen name="DailyReadingsNavigator" component={DailyReadingsNavigator} options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.shadow}>
              <Image
              source={require('../assets/readings.png')}
              resizeMode='contain'
              style={{
                width: 45,
                height: 45,
                tintColor: focused ? "#2D9C8D" : "#A9A9A9",
              }}
            />
            </View>
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}/>
          )
          }}/>
        <Tab.Screen name="PrayersNavigator" component={PrayersNavigator} options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
              source={require('../assets/prayer.png')}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#2D9C8D" : "#A9A9A9",
              }}
            />
            <Text style={{color: focused ? "#2D9C8D" : "#A9A9A9", fontSize: 12}}>Prayers</Text>
            </View>
          )
          }}/>
        <Tab.Screen name="HymnsNavigator" component={HymnsNavigator} options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
              source={require('../assets/icons/hymn.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#2D9C8D" : "#A9A9A9",
              }}
            />
            <Text style={{color: focused ? "#2D9C8D" : "#A9A9A9", fontSize: 12}}>Hymns</Text>
            </View>
          )
          }}/>

      </Tab.Navigator>
)

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#314F7C",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 16,
    alignItems: 'center', 
    backgroundColor: colors.white, 
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 30
  }
})

export default TabNavigatorRoutes;