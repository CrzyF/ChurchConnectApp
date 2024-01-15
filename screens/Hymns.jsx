import React from "react";
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import catholicHymn from "../assets/icons/catholichymn.png";
import englishHymn from "../assets/icons/englishhymn.png";
import videoplaylist from "../assets/icons/videoplaylist.png";
import HeaderComponent from "../components/HeaderComponent";
import Screen from "../components/Screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "flex-start",
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

const Hymns = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.container}>
        <HeaderComponent
          backEnabled
          navigation={navigation}
          title={'hymns'}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <TouchableWithoutFeedback onPress={()=> navigation.navigate('HymnList')}>
            <View style={styles.card}>
              <Image
                source={catholicHymn}
                style={{ width: "50%", height: "40%", marginBottom: 10 }}
              />
              <Text>Catholic hyms</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.card}>
            <Image
              source={videoplaylist}
              style={{ width: "50%", height: "50%", marginBottom: 10 }}
            />
            <Text>Coming Soon...</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default Hymns;
