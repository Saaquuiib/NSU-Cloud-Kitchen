import { StyleSheet, View, Text, ScrollView } from "react-native";
import React from "react";
import { colors } from "../globals/style";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Categories</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.box}>
          <FontAwesome5
            name="hamburger"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>Burger</Text>
        </View>
        <View style={styles.box}>
          <FontAwesome5
            name="pizza-slice"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>Pizza</Text>
        </View>
        <View style={styles.box}>
          <MaterialCommunityIcons
            name="rice"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>Biriyani</Text>
        </View>
        <View style={styles.box}>
          <MaterialCommunityIcons
            name="noodles"
            size={26}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>Noodles</Text>
        </View>
        <View style={styles.box}>
          <MaterialCommunityIcons
            name="pasta"
            size={26}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>Pasta</Text>
        </View>
        <View style={styles.box}>
          <Entypo name="cake" size={24} color="black" style={styles.icon} />
          <Text style={styles.text}>Cake</Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default Categories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.col1,
    width: "90%",
    elevation: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },
  head: {
    color: colors.text1,
    fontSize: 25,
    fontFamily: 'Poppins_400Regular',
    margin: 10,
    alignSelf: "center",
    paddingBottom: 5,
    borderBottomColor: colors.text1,
    borderBottomWidth: 1,
  },
  box: {
    backgroundColor: colors.col1,
    elevation: 10,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
    color: colors.text1,
  },
  text: {
    color: colors.text1,
    fontFamily: 'Poppins_400Regular',
  },
});
