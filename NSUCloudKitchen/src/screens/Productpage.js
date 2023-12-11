import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  navbtn,
  navbtnin,
  navbtnout,
  colors,
  btn2,
  hr80,
  hr81,
  incdecbtn,
  incdecinput,
  incdecout,
} from "../globals/style";
import { firebase } from "../../Firebase/FirebaseConfig";

const Productpage = ({ navigation, route }) => {
  const data = route.params;
  //console.log('product page data',data)
  if (route.params === undefined) {
    navigation.navigate("Home");
  }

  const [quantity, setQuantity] = useState("1");
  const [addonquantity, setAddonquantity] = useState("0");

  const addtocart = () => {
    // console.log("hi");
    const docRef = firebase
      .firestore()
      .collection("UserCart")
      .doc(firebase.auth().currentUser.uid);

    const data1 = {
      data,
      Addonquantity: addonquantity,
      Foodquantity: quantity,
    };
    // console.log('data1', data1);
    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({
          cart: firebase.firestore.FieldValue.arrayUnion(data1),
        });
        alert("Added to Cart");
      } else {
        docRef.set({
          cart: [data1],
        });
        alert("Added to Cart");
      }
    });
  };

  const increaseQuantity = () => {
    setQuantity((parseInt(quantity) + 1).toString());
  };
  const decreaseQuantity = () => {
    if (parseInt(quantity) > 1) {
      setQuantity((parseInt(quantity) - 1).toString());
    }
  };
  const increaseAddonQuantity = () => {
    setAddonquantity((parseInt(addonquantity) + 1).toString());
  };
  const decreaseAddonQuantity = () => {
    if (parseInt(addonquantity) > 0) {
      setAddonquantity((parseInt(addonquantity) - 1).toString());
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={navbtnout}
      >
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.container1}>
        <View style={styles.s1}>
          <Image
            source={{
              uri: data.foodImageUrl,
            }}
            style={styles.cardimgin}
          />
        </View>
        <View style={styles.s2}>
          <View style={styles.s2in}>
            <Text style={styles.head1}>{data.foodName}</Text>
            <Text style={styles.head2}>৳{data.foodPrice}</Text>
          </View>
          <View style={styles.s3}>
            <Text style={styles.head3}>About Food</Text>
            <Text style={styles.head4}>{data.foodDescription}</Text>
            <View style={styles.s3in}>
              {data.foodType == "veg" ? (
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
              <Text style={styles.head5}>{data.foodType}</Text>
            </View>
          </View>

          <View style={styles.container2}>
            <Text style={styles.txt1}>Location</Text>
            <Text style={styles.txt2}>{data.restaurantName}</Text>
            <View style={styles.container2in}>
              <Text style={styles.txt3}>{data.restaurantAddressBuilding}</Text>
              <View style={styles.dash}></View>
              <Text style={styles.txt3}>{data.restaurantAddressStreet}</Text>
              <View style={styles.dash}></View>
              <Text style={styles.txt3}>{data.restaurantAddressCity}</Text>
            </View>
          </View>

          <View style={styles.container3}>
            <View style={hr81}></View>
            <Text style={styles.txt5}>Food Quantity</Text>
            <View style={incdecout}>
              <TouchableOpacity onPress={() => decreaseQuantity()}>
                <Text style={incdecbtn}>-</Text>
              </TouchableOpacity>
              <TextInput value={quantity} style={incdecinput}></TextInput>
              <TouchableOpacity onPress={() => increaseQuantity()}>
                <Text style={incdecbtn}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={hr81}></View>
          </View>

          {data.foodAddonPrice != "" && (
            <View style={styles.container3}>
              <Text style={styles.txt5}>Add Extra</Text>
              <View style={styles.c3in}>
                <Text style={styles.text4}>{data.foodAddon}</Text>
                <Text style={styles.text4}>৳{data.foodAddonPrice}</Text>
              </View>
              <View style={incdecout}>
                <TouchableOpacity onPress={() => decreaseAddonQuantity()}>
                  <Text style={incdecbtn}>-</Text>
                </TouchableOpacity>
                <TextInput
                  value={addonquantity}
                  style={incdecinput}
                ></TextInput>
                <TouchableOpacity onPress={() => increaseAddonQuantity()}>
                  <Text style={incdecbtn}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={hr81}></View>
            </View>
          )}
        </View>

        <View style={styles.container4}>
          <View style={styles.c4in}>
            <Text style={styles.txt2}>Total Price</Text>
            {data.foodAddonPrice != "" ? (
              <Text style={styles.txt6}>
                ৳
                {(
                  parseInt(data.foodPrice) * parseInt(quantity) +
                  parseInt(addonquantity) * parseInt(data.foodAddonPrice)
                ).toString()}
              </Text>
            ) : (
              <Text style={styles.txt6}>
                ৳{(parseInt(data.foodPrice) * parseInt(quantity)).toString()}
              </Text>
            )}
          </View>
          <View style={hr81}></View>
        </View>

        <View style={styles.btncont}>
          <TouchableOpacity style={btn2} onPress={() => addtocart()}>
            <Text style={styles.btntxt}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btn2}>
            <Text style={styles.btntxt}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default Productpage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
  },
  container1: {
    flex: 1,
    backgroundColor: colors.col1,
  },
  s1: {
    width: "100%",
    height: 300,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardimgin: {
    width: "100%",
    height: "100%",
  },
  s2: {
    width: "100%",
    padding: 20,
  },
  s2in: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  head1: {
    fontSize: 30,
    fontFamily: "Poppins_500Medium",
    color: colors.text1,
    width: 200,
    marginRight: 10,
  },
  head2: {
    fontSize: 30,
    fontFamily: "Poppins_400Regular",
    color: colors.text3,
  },
  s3: {
    backgroundColor: colors.text1,
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  head3: {
    fontSize: 25,
    fontFamily: "Poppins_300Light",
    color: colors.col1,
  },
  head4: {
    marginVertical: 10,
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    color: colors.col1,
  },
  s3in: {
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
    width: 130,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  head5: {
    color: colors.text1,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginLeft: 10,
  },
  btncont: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  btntxt: {
    backgroundColor: colors.text1,
    color: colors.col1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    borderRadius: 10,
    width: "90%",
    textAlign: "center",
  },
  container2: {
    width: "100%",
    backgroundColor: colors.col1,
    padding: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 10,
    elevation: 10,
    alignItems: "center",
  },
  txt1: {
    color: colors.text1,
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
  },
  txt2: {
    color: colors.text3,
    fontSize: 30,
    fontFamily: "Poppins_400Regular",
    marginVertical: 10,
  },
  container2in: {
    flexDirection: "row",
    alignItems: "center",
  },
  txt3: {
    color: colors.text1,
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  dash: {
    width: 1,
    height: 20,
    backgroundColor: colors.text1,
    marginHorizontal: 10,
  },
  container3: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  txt5: {
    color: colors.text1,
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    // width: "30%",
    textAlign: "center",
  },
  c3in: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  text4: {
    color: colors.text3,
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    marginHorizontal: 10,
  },
  container4: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  c4in: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
  },
  txt6: {
    color: colors.text1,
    fontSize: 30,
    fontFamily: "Poppins_400Regular",
    // width: "30%",
    textAlign: "center",
  },
});
