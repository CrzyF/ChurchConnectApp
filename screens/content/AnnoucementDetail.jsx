import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import mary from "../../assets/mary.png";
import fonts from "../../config/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "flex-start",
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  list: {
    alignItems: "flex-start",
  },
  listitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  heading: {
    fontSize: fonts.fontSizeMedium,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: fonts.fontSizeSmall,
    color: "#999",
  },
  column8: {
    flexDirection: "column",
    width: "80%",
    marginRight: 10,
  },
  column4: {
    flexDirection: "column",
    width: "20%",
  },
  listImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
});

const AnnoucementDetail = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Search bar hers</Text>
      </View>
    </View>
  );
};

export default AnnoucementDetail;
