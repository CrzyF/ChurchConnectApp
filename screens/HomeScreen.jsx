import * as React from "react";

import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
  FlatList,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import handshake from "../assets/handshake.png";
import notify from "../assets/Notification.png";
// import HomeSlide from "./HomeSlide";
import slide1 from "../assets/homeslide.jpg";
import hymnicon from "../assets/hymn.png";
import prayer from "../assets/prayer.png";
import news from "../assets/NewspaperClipping.png";
import readings from "../assets/readings.png";
import Screen from "../components/Screen";
import fonts from "../config/fonts";
import AuthContext from "../auth/context";
import LoginRedirect from "../components/LoginRedirect";
import Swiper from "react-native-swiper";
// import announcements from "../services/announcements";
import colors from "../components/colors";
import dailyReadings from "../services/dailyReadings";
import useApi from "../services/useApi";
import authApi from "../services/auth";
import { getNextWeekDates } from "./DailyReadings";
// import Bottomnavigation from "../navigation/tabs";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "flex-start",
  },
  contain: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  topheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  containerContent: {
    paddingVertical: 15,
  },
  columnCard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    height: 70,
    width: 70,
    borderRadius: 35,
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
  cardText: {
    fontSize: fonts.fontSizeSmall,
    color: "#818E9E",
    marginTop: 5,
  },
  containCard: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
});

const HomeScreen = ({ navigation }) => {
  const { user } = React.useContext(AuthContext);

  const [data, setData] = React.useState([]);
  const [readingLoading, setReadingLoading] = React.useState(false);
  const [readingError, setReadingError] = React.useState(false);

  const dates = getNextWeekDates();

  const getReading = () => {
    const dailyReadingss = [];

    dates.forEach(async (date) => {
      setReadingLoading(true);
      setReadingError(false);
      await authApi
        .getDailyReadings(date)
        .then((data) => {
          if (!dailyReadingss.includes(data.data.data)) {
            dailyReadingss.push(data.data.data);
          }
        })
        .catch((err) => setReadingError(true));
      setData(dailyReadingss);
      setReadingLoading(false);
    });
  };

  const {
    request: getAnnouncements,
    data: announcements,
    loading,
    error,
  } = useApi(authApi.getAnnouncement);

  React.useEffect(() => {
    getReading();
    getAnnouncements(user.id);

    if (error) {
      console.log("Error getting announcements...");
      return;
    }
    if (loading) {
      console.log("Loading...");
    }
  }, []);

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.topheader}>
            <View>
              <View>
                <Text>
                  {" "}
                  <Image source={handshake} style={{ width: 20, height: 20 }} />
                  Hi Catholic faithful!!
                </Text>
              </View>
              <View>
                <Text style={{ color: "#818E9E", marginRight: 10 }}>
                  Let's feed your soul today
                  <Text
                    style={{
                      color: "#1C7676",
                      fontWeight: "bold",
                    }}
                  >
                    25.07.22
                  </Text>
                </Text>
              </View>
            </View>
            <Pressable onPress={() => navigation.openDrawer()}>
              <MaterialCommunityIcons
                name="format-align-right"
                size={25}
                color
              />
            </Pressable>
          </View>

          <View style={styles.containerContent}>
            {/* <Image
              source={slide1}
              alt=""
              style={{ width: "100%", height: 180, borderRadius: 10 }}
            /> */}

            <View style={{ overflow: "hidden", borderRadius: 10 }}>
              <ImageBackground
                style={{ width: "100%", height: 180 }}
                imageStyle={{ borderRadius: 10 }}
                source={slide1}
                borderRadius={10}
              >
                {/* <Text style={{ paddingVertical: 10, textAlign: 'center', backgroundColor: colors.primary, fontWeight: '800' }}>Daily Reading</Text> */}
                <Swiper
                  autoplayTimeout={5}
                  loop
                  autoplay
                  showsPagination={false}
                >
                  {!readingLoading &&
                    !readingError &&
                    data.map((reading, index) => {
                      return (
                        <TouchableOpacity
                          style={{ flex: 1 }}
                          key={index}
                          onPress={() =>
                            navigation.navigate("DailyReading", {
                              item: reading,
                              list: dailyReadings,
                            })
                          }
                        >
                          <View
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                              paddingHorizontal: 20,
                              backgroundColor: "rgba(0, 0, 0, .7)",
                            }}
                          >
                            <Text
                              style={{
                                color: colors.white,
                                fontWeight: "700",
                                fontSize: fonts.fontSizeMedium,
                                marginBottom: 10,
                                textAlign: "center",
                                textTransform: "capitalize",
                              }}
                            >
                              {reading.weekday}
                            </Text>
                            <Text
                              style={{
                                color: colors.white,
                                textAlign: "center",
                                fontWeight: "700",
                                marginBottom: 5,
                              }}
                              // numberOfLines={3}
                            >
                              {reading.subTitle}
                            </Text>
                            <Text
                              style={{
                                color: colors.white,
                                textAlign: "center",
                                fontWeight: "700",
                              }}
                              // numberOfLines={3}
                            >
                              {reading.title}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </Swiper>
              </ImageBackground>
            </View>
          </View>

          {/* this is the section for the 4 circle cards */}
          <View style={styles.contain}>
            <View style={styles.columnCard}>
              <Pressable onPress={() => navigation.navigate("HymnsNavigator")}>
                <View style={styles.card}>
                  <Image
                    source={hymnicon}
                    alt=""
                    style={{ width: 40, height: 40 }}
                  />
                </View>
              </Pressable>
              <Text style={styles.cardText}>Hymns</Text>
            </View>
            <View style={styles.columnCard}>
              <Pressable
                onPress={() => navigation.navigate("PrayersNavigator")}
              >
                <View style={styles.card}>
                  <Image
                    source={prayer}
                    alt=""
                    style={{ width: 40, height: 40 }}
                  />
                </View>
              </Pressable>
              <Text style={styles.cardText}>Prayers</Text>
            </View>
            <View style={styles.columnCard}>
              <Pressable
                onPress={() => navigation.navigate("MyParishNavigator")}
              >
                <View style={styles.card}>
                  <Image
                    source={require("../assets/icons/parish.png")}
                    alt=""
                    style={{ width: 40, height: 40, tintColor: colors.primary }}
                  />
                </View>
              </Pressable>
              <Text style={styles.cardText}>Parish</Text>
            </View>
            <View style={styles.columnCard}>
              <Pressable
                onPress={() => navigation.navigate("DailyReadingsNavigator")}
              >
                <View style={styles.card}>
                  <Image
                    source={readings}
                    alt=""
                    style={{ width: 40, height: 40 }}
                  />
                </View>
              </Pressable>
              <Text style={styles.cardText}>Daily Readings</Text>
            </View>
          </View>
          <View style={styles.containCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 10,
                borderBottomColor: "#A9E5DD",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ fontSize: fonts.fontSizeNormal, fontWeight: "bold" }}
              >
                Annoucements
              </Text>
              <Pressable
                onPress={() => navigation.navigate("AnnouncementNavigator")}
              >
                <Text
                  style={{ fontSize: fonts.fontSizeNormal, fontWeight: "bold" }}
                >
                  {"See All >"}
                </Text>
              </Pressable>
            </View>

            {
              user.isGuest ? (
                <LoginRedirect />
              ) : (
                <View style={{ paddingVertical: 10, flex: 1 }}>
                  {loading ? (
                    <Text>Loading...</Text>
                  ) : !loading && error ? (
                    <View style={{ flexDirection: "row" }}>
                      <Text>Unable to load data, </Text>
                      <Text
                        style={{
                          color: colors.primary,
                          textDecorationLine: "underline",
                          textDecorationColor: colors.primary,
                        }}
                        onPress={() => getAnnouncements(user.id)}
                      >
                        Retry
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      data={announcements.data?.slice(0, 3)}
                      keyExtractor={(item) => item.id.toString()}
                      refreshing={loading}
                      onRefresh={() => getAnnouncements(user.id)}
                      renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                          onPress={() =>
                            navigation.navigate("AnnouncementView", item)
                          }
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              paddingVertical: 10,
                              alignItems: "center",
                            }}
                          >
                            <View style={{ width: "80%" }}>
                              <Text
                                style={{ fontWeight: "500" }}
                                numberOfLines={2}
                              >
                                {item.title}
                              </Text>
                              <Text
                                style={{
                                  fontSize: fonts.fontSizeSmall,
                                  color: colors.light,
                                }}
                              >
                                {new Date(
                                  Date.parse(item.dateOfActivity)
                                ).toDateString()}
                              </Text>
                            </View>
                            <Image
                              source={
                                item.photoUrl ? { uri: item.photoUrl } : slide1
                              }
                              style={{
                                height: 50,
                                width: 50,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </TouchableWithoutFeedback>
                      )}
                      ItemSeparatorComponent={() => (
                        <View
                          style={{
                            width: "100%",
                            height: 0.5,
                            backgroundColor: colors.lighter,
                          }}
                        ></View>
                      )}
                    />
                  )}
                </View>
              )

              // <ScrollView
              //   style={{ height: 10, paddingVertical: 10 }}
              // >
              //   <>
              //   {announcements.data && announcements.data.length > 0 ? announcements.data.slice(0,3).map((announce, index) => (
              //     <TouchableWithoutFeedback key={index} onPress={()=> navigation.navigate('AnnouncementView', announce.content)}>
              //       <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              //         <View style={{ width: '80%' }}>
              //           <Text style={{ fontWeight: '500' }} numberOfLines={2}>{ announce.title }</Text>
              //           <Text style={{ fontSize: fonts.fontSizeSmall, color: colors.light }}>{ new Date(Date.parse(announce.publishDate)).toDateString() }</Text>
              //         </View>
              //         <Image source={slide1} style={{ height: 50, width: 50, borderRadius: 10, }}/>
              //       </View>
              //     </TouchableWithoutFeedback>
              //   )): <Text>Loading...</Text>}
              //   </>
              // </ScrollView>
            }
          </View>
          <View>{/* <Bottomnavigation /> */}</View>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
};

export default HomeScreen;
