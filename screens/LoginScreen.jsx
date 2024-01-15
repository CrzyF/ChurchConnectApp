import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import logo from '../assets/logo_green.png'
import backgroundDesign from '../assets/backgrounddesign.png'
import fonts from '../config/fonts'
import authApi from '../services/auth'
import colors from '../components/colors'
import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import LoadingScreen from './LoadingScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C7676',
    padding: 0,
  },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: 20,
    margin: 0,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    transform: [{ scaleY: -1 }],
    height: '50%',
  },
  whiteCard: {
    backgroundColor: '#fff',
    width: '90%',
    height: '60%',
    borderRadius: 10,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: fonts.fontSizeSmall,
    fontWeight: '300',
    marginBottom: 20,
    textAlign: 'center',
  },
  texthelp: {
    fontSize: fonts.fontSizeSmall,
    fontWeight: '300',
    marginVertical: 20,
    textAlign: 'center',
    paddingHorizontal: 100,
    color: '#fff',
  },
  link: {
    color: '#FCAB10',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: fonts.fontSizeNormal,
    fontWeight: '300',
    color: '#000',
    backgroundColor: '#fff',
    width: '100%',
  },
  loginBtn: {
    backgroundColor: '#1C7676',
    width: '100%',
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn2: {
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#1C7676',
    borderWidth: 1,
    color: '#1C7676',
  },
  textwhite: {
    color: '#fff',
  },
  texttheme: {
    color: '#1C7676',
  },
  label: {
    fontSize: fonts.fontSizeSmall,
    color: '#656565',
    marginVertical: 10,
    width: '100%',
  },
  pickerStyle: {
    inputIOS: {
      borderRadius: 5,
      height: 40,
      borderWidth: 1,
      padding: 10,
      borderColor: '#ccc',
      fontSize: 16,
      fontWeight: '300',
      color: '#000',
      backgroundColor: '#fff',
    },
    placeholder: {
      color: '#000',
      fontSize: 12,
      fontWeight: '300',
    },
    inputAndroid: {
      borderRadius: 5,
      height: 40,
      borderWidth: 1,
      padding: 10,
      borderColor: '#ccc',
      fontSize: 16,
      fontWeight: '300',
      color: '#000',
      backgroundColor: '#fff',
    },
  },
})

const LoginScreen = ({ navigation }) => {
  const [loginFailed, setLoginFailed] = React.useState(false)
  const [networkError, setNetworkError] = React.useState(false)
  const [loginCode, setLoginCode] = React.useState(
    '7bb58bc8-91c7-4505-a1a2-3141ba1b4c11',
  )
  const [loading, setLoading] = React.useState(false)

  const authContext = React.useContext(AuthContext)
  const handleSignIn = async () => {
    setLoading(true)
    // authContext.setUser({ userLoggedIn: true });
    // authStorage.storeUser({ userLoggedIn: true })

    const result = await authApi.login(loginCode)
    if (!result.ok) {
      setNetworkError(true)
      console.log('Unable to login.. check internet connection and try again')
      return
    }

    if (loginCode === '') return setLoginFailed(true)

    const data = result.data
    setLoginFailed(!data.succeeded)
    setNetworkError(false)
    if (data.succeeded) {
      const user = data.data
      authContext.setUser(user)
      authStorage.storeUser(user)
    }
    setLoading(false)
  }

  const hanldeGuestSignIn = async () => {
    setLoading(true)
    authContext.setUser({ isGuest: true })
    authStorage.storeUser({ isGuest: true })
    setLoading(false)
  }

  ;<View style={styles.container}>
    <ImageBackground source={backgroundDesign} style={styles.backgroundImage}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0, 78, 78, 1)', 'transparent']}
        style={styles.background}
      />
      <View style={styles.whiteCard}>
        <Image source={logo} style={{ width: 188, height: 104 }} />
        <Text style={styles.text}>
          Please login into the place of faith by filling the short form below.
          See you on the other side
        </Text>

        {loginFailed && (
          <Text style={{ color: colors.danger }}>Invalid parish code</Text>
        )}
        {networkError && (
          <Text style={{ color: colors.danger }}>
            Unable to Login, please check internet connection and retry!.
          </Text>
        )}

        <View>
          {/* <Text style={styles.label}>Select Church</Text>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              style={styles.pickerStyle}
              items={[
                { label: "St.Patrick Church", value: "football" },
                { label: "St. Mark Parish", value: "baseball" },
                { label: "St. Peter and Paul", value: "hockey" },
              ]}
            /> */}
          <Text style={styles.label}>Enter parish code</Text>
          <TextInput
            style={styles.input}
            onChangeText={(code) => setLoginCode(code)}
            placeholderStyle={{
              color: '#656565',
              fontSize: fonts.fontSizeSmall,
              fontWeight: '300',
            }}
          />
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleSignIn}
            // onPress={() => navigation.replace("DrawerNavigator")}
          >
            <Text style={styles.textwhite}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn2}
            onPress={hanldeGuestSignIn}
          >
            <Text style={styles.texttheme}>Sign in as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.texthelp}>
        I don’t know my parish code?{' '}
        <Text style={styles.link}>Visit help!</Text>
      </Text>
    </ImageBackground>
  </View>

  return (
    <View style={{ backgroundColor: '#1C7676', paddingHorizontal: 0, flex: 1 }}>
      {loading && <LoadingScreen />}
      <ImageBackground source={backgroundDesign} style={styles.backgroundImage}>
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0, 78, 78, 1)', 'transparent']}
          style={styles.background}
        />
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              backgroundColor: colors.white,
              borderRadius: 10,
              padding: 30,
            }}
          >
            <Image
              source={logo}
              style={{ width: 150, height: 120, resizeMode: 'contain' }}
            />
            <Text style={styles.text}>
              Please login into the place of faith by filling the short form
              below. See you on the other side
            </Text>

            {loginFailed && (
              <Text style={{ color: colors.danger, textAlign: 'center' }}>
                Invalid parish code
              </Text>
            )}
            {networkError && (
              <Text style={{ color: colors.danger, textAlign: 'center' }}>
                Unable to Login, please check internet connection and retry!.
              </Text>
            )}

            <Text style={styles.label}>Enter parish code</Text>
            <TextInput
              style={styles.input}
              onChangeText={(code) => setLoginCode(code)}
              placeholderStyle={{
                color: '#656565',
                fontSize: fonts.fontSizeSmall,
                fontWeight: '300',
              }}
            />
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleSignIn}
              // onPress={() => navigation.replace("DrawerNavigator")}
            >
              <Text style={styles.textwhite}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginBtn2}
              onPress={hanldeGuestSignIn}
            >
              <Text style={styles.texttheme}>Sign in as Guest</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.texthelp}>
            I don’t know my parish code?{' '}
            <Text style={styles.link}>Visit help!</Text>
          </Text>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen
