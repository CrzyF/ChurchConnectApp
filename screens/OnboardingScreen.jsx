import * as React from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import fonts from "../config/fonts";

const styles = StyleSheet.create({
  skipButton: {
    backgroundColor: "#2D9C8D",
    padding: 10,
    borderRadius: 5,
  },
});

const Skip = ({ ...props }) => (
  <Button title="<< Skip" color="#2D9C8D" {...props} />
);
const Next = ({ ...props }) => (
  <Button title="Next >>" buttonStyle={{backgroundColor:"#2d9c8d"}}  containerViewStyle={{
    marginVertical: 10,
    width: 70,
    marginHorizontal:20,
  }} color="#2D9C8D" {...props} />
);

const Done = ({ ...props }) => (
  <TouchableOpacity
    style={{
      marginHorizontal: 10,
      backgroundColor: "#2D9C8D",
      padding: 10,
      borderRadius: 5,
      width: "180%",
      margin: "auto",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      left: "-110%",
    }}
    {...props}
  >
    <Text
      style={{
        fontSize: fonts.fontSizeNormal,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
      }}
    >
      Get Started
    </Text>
  </TouchableOpacity>
);

const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? "rgba(45,156,141,1)" : "rgba(45,156,141,0.3)";
  return (
    <View
      style={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor,
        top: "-50%",
      }}
    />
  );
};

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      bottomBarColor="#fafafa"
      bottomBarHeight={60}
      bottomBarHighlight={false}
      containerStyles={{ justifyContent: "center", alignItems: "center" }}
      titleStyles={{
        marginTop: 0,
        fontSize: 35,
        fontWeight: "bold",
        color: "#2D9C8D",
      }}
      subTitleStyles={{
        fontSize: fonts.fontSizeNormal,
        color: "#A8A6A6",
        paddingHorizontal: 40,
      }}
      imageContainerStyles={{ marginTop: 20 }}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      pages={[
        {
          backgroundColor: "#fafafa",
          image: (
            <Image
              source={require("../assets/onboard1.png")}
              style={{ width: 333, height: 240 }}
            />
          ),
          title: "Togertherness ",
          subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        },
        {
          backgroundColor: "#fafafa",
          image: (
            <Image
              source={require("../assets/onboard2.png")}
              style={{ width: 333, height: 240 }}
            />
          ),
          title: "Personal Growth",
          subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        },
        {
          backgroundColor: "#fafafa",
          image: (
            <Image
              source={require("../assets/onboard3.png")}
              style={{ width: 333, height: 240 }}
            />
          ),
          title: "Love",
          subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
