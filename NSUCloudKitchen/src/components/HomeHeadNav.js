import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { colors } from "../globals/style";
import { useNavigation } from "@react-navigation/native";
const HomeHeadNav = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Fontisto
        name="nav-icon-a"
        size={24}
        color="black"
        style={styles.myicon}
      />
      <View style={styles.containerin}>
        <Text style={styles.mytext}>RannaGhor</Text>
        <MaterialCommunityIcons
          name="food-outline"
          size={26}
          color="black"
          style={styles.myicon}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("userprofile")}>
        <FontAwesome5
          name="user-circle"
          size={30}
          color="black"
          style={styles.myicon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeadNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.text1,
    elevation: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerin: {
    flexDirection: "row",
    alignItems: "center",
  },
  myicon: {
    color: colors.col1,
  },
  mytext: {
    color: colors.col1,
    fontSize: 24,
    fontFamily: "Poppins_500Medium",
  },
});
