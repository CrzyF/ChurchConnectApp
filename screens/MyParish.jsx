import React, { useContext } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import Screen from "../components/Screen";
import annoucement from "../assets/BellSimpleRinging.png";
import schedule from "../assets/Calendar.png";
import events from "../assets/FlagBanner.png";
import leadership from "../assets/UsersThree.png";
import LoginRedirect from "../components/LoginRedirect";
import AuthContext from "../auth/context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "flex-start",
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    height: 150,
    width: 150,
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#314F7C",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 16,
  },
});
const MyParish = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <Screen>
      <HeaderComponent
        title={"My Parish"}
        backEnabled
        navigation={navigation}
      />

      {user.isGuest ? <LoginRedirect /> :
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("AnnouncementNavigator")}
          >
            <Image
              source={annoucement}
              style={{ width: "50%", height: "50%", marginBottom: 10 }}
            />
            <Text>Annoucements</Text>
          </Pressable>
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Schedules")}
          >
            <Image
              source={schedule}
              style={{ width: "50%", height: "50%", marginBottom: 10 }}
            />
            <Text>Schedules</Text>
          </Pressable>
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("EventsNavigator")}
          >
            <Image
              source={events}
              style={{ width: "50%", height: "50%", marginBottom: 10 }}
            />
            <Text>Events</Text>
          </Pressable>
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Leadership")}
          >
            <Image
              source={leadership}
              style={{ width: "50%", height: "50%", marginBottom: 10 }}
            />
            <Text>Leadership</Text>
          </Pressable>
        </View>
      </>}
    </Screen>
  );
};

export default MyParish;
