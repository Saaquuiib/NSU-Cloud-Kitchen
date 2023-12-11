import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors, veg, nonveg } from "../globals/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Cardslider = ({ title, data, navigation }) => {
  // console.log(data);
  const openProductpage = (item) => {
    //console.log(item)
    navigation.navigate("productpage", item);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>{title}</Text>
      <FlatList
        style={styles.cardsout}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          // <TouchableOpacity key={item.index} onPress={()=>{
          //   openProductpage(item)
          // }}>
          <View style={styles.card}>
            <View style={styles.s1}>
              <Image
                source={{
                  uri: item.foodImageUrl,
                }}
                style={styles.cardimgin}
              />
            </View>
            <View style={styles.s2}>
              <Text style={styles.txt1}>{item.foodName}</Text>
              <View style={styles.s2in}>
                <Text style={styles.txt2}>৳{item.foodPrice}</Text>
                {item.foodType == "veg" ? (
                  <MaterialCommunityIcons
                    name="mushroom"
                    size={24}
                    color="#00334d"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="food-drumstick"
                    size={24}
                    color="#00334d"
                  />
                )}
              </View>
            </View>
            <TouchableOpacity
              key={item.index}
              onPress={() => {
                openProductpage(item);
              }}
            >
              <View style={styles.s3}>
                <Text style={styles.buybtn}>View</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
export default Cardslider;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  cardouthead: {
    color: colors.text1,
    width: "90%",
    fontSize: 30,
    fontFamily: "Poppins_400Regular",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: -50,
    marginBottom: 10,
    // textAlign: "left",
  },
  cardsout: {
    width: "100%",
    marginBottom: 10,
  },
  card: {
    width: 300,
    height: 300,
    marginHorizontal: 10,
    marginBottom: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: colors.col1,
  },
  cardimgin: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  s2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  txt1: {
    fontSize: 18,
    color: colors.text3,
    marginHorizontal: 5,
    width: 150,
    fontFamily: "Poppins_400Regular",
  },
  txt2: {
    fontSize: 18,
    color: colors.text3,
    marginRight: 10,
    fontFamily: "Poppins_400Regular",
  },
  s2in: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  s3: {
    alignItems: "center",
    position: "absolute",
    width: "100%",
  },
  buybtn: {
    backgroundColor: colors.text1,
    color: colors.col1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    borderRadius: 20,
    width: "60%",
    textAlign: "center",
    marginTop: 15,
  },
});
