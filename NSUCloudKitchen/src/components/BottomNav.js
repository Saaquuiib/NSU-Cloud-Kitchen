import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../globals/style";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";

const BottomNav = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.btncon1}>
        <AntDesign
          name="home"
          size={30}
          color={colors.text1}
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
      <View style={styles.btncon2}>
        <Feather
          name="search"
          size={38}
          color={colors.text1}
          style={styles.icon2}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
      <View style={styles.btncon1}>
        <AntDesign
          name="shoppingcart"
          size={30}
          color={colors.text1}
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("cart");
          }}
        />
      </View>
      <View style={styles.btncon1}>
        <FontAwesome5
          name="map-marked-alt"
          size={30}
          color={colors.text1}
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("trackorders");
          }}
        />
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.col1,
    width: "100%",
    elevation: 30,
    borderTopColor: colors.text1,
    borderTopWidth: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  icon1: {
    color: colors.text1,
  },
  icon2: {
    color: colors.col1,
  },
  btncon2: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: -15,
    backgroundColor: colors.text1,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  // btncon1: {
  //   backgroundColor: colors.col1,
  //   width: 50,
  //   height: 50,
  //   borderRadius: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   elevation: 10,
  // },
});
