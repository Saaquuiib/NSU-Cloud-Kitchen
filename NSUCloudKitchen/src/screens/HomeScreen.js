import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import HomeHeadNav from "../components/HomeHeadNav";
import Categories from "../components/Categories";
import OfferSlider from "../components/OfferSlider";
import Cardslider from "../components/Cardslider";
import BottomNav from "../components/BottomNav";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../globals/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../../Firebase/FirebaseConfig";

const HomeScreen = ({ navigation }) => {
  const [foodData, setFoodData] = useState([]);
  const [VegData, setVegData] = useState([]);
  const [NonVegData, setNonVegData] = useState([]);

  const foodRef = firebase.firestore().collection("FoodData");

  useEffect(() => {
    foodRef.onSnapshot((snapshot) => {
      setFoodData(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    setVegData(foodData.filter((item) => item.foodType === "veg"));
    setNonVegData(foodData.filter((item) => item.foodType === "non-veg"));
  }, [foodData]);

  console.log(foodData);

  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />

      <ScrollView>
        <View style={styles.searchbox}>
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={styles.searchicon}
          />
          <TextInput
            placeholder="Search"
            style={styles.input}
            onChangeText={(text) => {
              setSearch(text);
            }}
          />
        </View>
        {search != "" && (
          <View style={styles.searchresultsouter}>
            <FlatList
              style={styles.searchresultsinner}
              data={foodData}
              renderItem={({ item }) => {
                if (
                  item.foodName
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase())
                ) {
                  return (
                    <View style={styles.searchresult}>
                      <Text style={styles.searchresulttext}>
                        {item.foodName}
                      </Text>
                    </View>
                  );
                }
              }}
            ></FlatList>
            <FlatList></FlatList>
          </View>
        )}
        <Categories />
        <OfferSlider />
        <Cardslider
          title={"Today's special"}
          data={foodData}
          navigation={navigation}
        />
        <Cardslider
          title={"Non-Veg Lovers"}
          data={NonVegData}
          navigation={navigation}
        />
        <Cardslider
          title={"Veg Hunger"}
          data={VegData}
          navigation={navigation}
        />
      </ScrollView>

      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    // alignItems: "center",
    width: "100%",
  },
  searchbox: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: "center",
    padding: 10,
    margin: 20,
    elevation: 10,
  },
  input: {
    marginLeft: 10,
    width: "90%",
    fontSize: 18,
    color: colors.text2,
    fontFamily: "Poppins_400Regular",
  },
  searchicon: {
    color: colors.text1,
  },
  searchresultsouter: {
    width: "100%",
    marginHorizontal: 30,
    height: "100%",
    backgroundColor: colors.col1,
  },
  searchresultsinner: {
    width: "100%",
  },
  searchresult: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  searchresulttext: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
    fontFamily: "Poppins_400Regular",
  },
  bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.col1,
    zIndex: 20,
  },
});
