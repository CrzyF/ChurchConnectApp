import 'react-native-gesture-handler'

// In App.js in a new project
import * as React from 'react'
import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppNavigator from './navigation/AppNavigator'
import AuthContext from './auth/context'
import authStorage from './auth/storage'
import * as SplashScreen from 'expo-splash-screen'

import MyDrawer from './navigation/DrawerNavigator'
import DatePickerScreen from './screens/DatePickerScreen'
import LoadingScreen from './screens/LoadingScreen'
import Notifications from './screens/Notifications'
import HomeScreen2 from './screens/HomeScreen2'

const AppStack = createNativeStackNavigator()

// const App = () => {
//   const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

//   React.useEffect(() => {
//     AsyncStorage.getItem("alreadyLaunched").then((value) => {
//       if (value === null) {
//         AsyncStorage.setItem("alreadyLaunched", "true");
//         setIsFirstLaunch(true);
//       } else {
//         setIsFirstLaunch(false);
//       }
//     });
//   }, []);

//   if (isFirstLaunch === null) {
//     return null;
//   } else if (isFirstLaunch) {
//     return (
//       <NavigationContainer>
//         <AppStack.Navigator headmode="none">
//           <AppStack.Screen
//             name="Onboarding"
//             options={{ headerShown: false }}
//             component={OnboardingScreen}
//           />
//           <AppStack.Screen
//             options={{ headershow: false }}
//             name="Login"
//             component={LoginScreen}
//           />
//           <AppStack.Screen name="Home" component={HomeScreen} />
//         </AppStack.Navigator>
//       </NavigationContainer>
//     );
//   } else return <LoginScreen />;
// };

const App = () => {
  const [user, setUser] = useState()
  const [isReady, setIsReady] = useState(false)

  const restoreUser = async () => {
    // SplashScreen.preventAutoHideAsync();
    const user = await authStorage.getUser()
    if (!user) {
      setIsReady(true)
      return
    }

    setUser(user)
    setIsReady(true)
  }

  React.useEffect(() => {
    restoreUser()
  }, [])

  if (!isReady) {
    return null
  }

  return (
    // Navigation Views
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {!user ? <AppNavigator /> : <MyDrawer />}
      </NavigationContainer>
    </AuthContext.Provider>

    // <NavigationContainer>
    //   <SupportNavigator />
    // </NavigationContainer>

    //Page Views
    // <Notifications />
  )
}
export default App
