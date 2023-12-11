import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../Firebase/FirebaseConfig";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { navbtn, navbtnin, navbtnout, colors, btn2 } from "../globals/style";
import BottomNav from "../components/BottomNav";

const UserCart = ({ navigation }) => {
  const [cartdata, setCartData] = useState(null);
  const [totalcost, setTotalCost] = useState("0");

  const getCartData = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserCart")
      .doc(firebase.auth().currentUser.uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = JSON.stringify(doc.data());
          setCartData(data);
        } else {
          console.log("No such document!");
        }
      })
      .catch((err) => {
        console.error("Error getting document:", err);
      });
  };

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    if (cartdata != null) {
      const foodprice = JSON.parse(cartdata).cart;
      let totalfoodprice = 0;
      foodprice.map((item) => {
        totalfoodprice =
          parseInt(item.data.foodPrice) * parseInt(item.Foodquantity) +
          parseInt(item.data.foodAddonPrice) * parseInt(item.Addonquantity) +
          totalfoodprice;
      });
      // console.log(totalfoodprice);
      setTotalCost(JSON.stringify(totalfoodprice));
    }
  }, [cartdata]);

  const deleteItem = (item) => {
    const docRef = firebase
      .firestore()
      .collection("UserCart")
      .doc(firebase.auth().currentUser.uid);
    docRef.update({
      cart: firebase.firestore.FieldValue.arrayRemove(item),
    });
    getCartData();
  };

  return (
    <View style={styles.containerout}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={navbtnout}
      >
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <View style={styles.container}>
        <Text style={styles.head1}>Your Cart</Text>
        <View style={styles.cartout}>
          {cartdata == null || JSON.parse(cartdata).cart.length == 0 ? (
            <Text style={styles.head2}>Your Cart is Empty</Text>
          ) : (
            <FlatList
              style={styles.cardlist}
              data={JSON.parse(cartdata).cart}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cartcard}>
                    <Image
                      source={{ uri: item.data.foodImageUrl }}
                      style={styles.cartimg}
                    />
                    <View style={styles.cartcardin}>
                      <View style={styles.c1}>
                        <Text style={styles.txt1}>
                          {item.Foodquantity} x {item.data.foodName}
                        </Text>
                        <Text style={styles.txt2}>
                          ৳{item.data.foodPrice}/each
                        </Text>
                      </View>
                      {item.Addonquantity > 0 && (
                        <View style={styles.c2}>
                          <Text style={styles.txt3}>
                            {item.data.foodAddon} x {item.Addonquantity}
                          </Text>
                          <Text style={styles.txt3}>
                            ৳{item.data.foodAddonPrice}/each
                          </Text>
                        </View>
                      )}
                      <TouchableOpacity
                        style={styles.c4}
                        onPress={() => deleteItem(item)}
                      >
                        <Text style={styles.txt1}>Delete</Text>
                        <FontAwesome
                          name="trash-o"
                          size={24}
                          color="black"
                          style={styles.del}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
        <View style={styles.btncont}>
          <View style={styles.c3}>
            <Text style={styles.txt5}>Total</Text>
            <Text style={styles.txt6}>৳{totalcost}</Text>
          </View>
          <TouchableOpacity
            style={btn2}
            onPress={() => navigation.navigate("placeorder", { cartdata })}
          >
            <Text style={styles.btntxt}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserCart;

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
  },
  bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.col1,
    zIndex: 20,
  },
  head1: {
    fontSize: 32,
    fontFamily: "Poppins_500Medium",
    color: colors.text1,
    margin: 10,
    textAlign: "center",
  },
  head2: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    marginVertical: 20,
    elevation: 10,
    color: colors.text1,
    backgroundColor: colors.col1,
    width: "90%",
    height: "50%",
    alignSelf: "center",
    paddingVertical: "25%",
    borderRadius: 10,
  },
  cartout: {
    flex: 1,
    width: "100%",
  },
  cardlist: {
    width: "100%",
  },
  cartcard: {
    flexDirection: "row",
    backgroundColor: colors.col1,
    marginVertical: 10,
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
    elevation: 10,
    alignItems: "center",
  },
  cartimg: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  cartcardin: {
    flexDirection: "column",
    margin: 5,
    width: "54%",
    alignItems: "center",
    justifyContent: "center",
  },
  c1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: colors.col1,
  },
  c2: {
    backgroundColor: colors.text1,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    flexDirection: "row",
  },
  txt1: {
    fontSize: 15,
    color: colors.text1,
    width: "50%",
    fontFamily: "Poppins_500Medium",
  },
  txt2: {
    fontSize: 15,
    color: colors.text3,
    fontFamily: "Poppins_500Medium",
  },
  txt3: {
    fontSize: 14,
    color: colors.col1,
    fontFamily: "Poppins_400Regular",
  },
  c4: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 10,
    borderColor: colors.text1,
    borderWidth: 1,
    marginVertical: 10,
    paddingVertical: 5,
  },
  del: {
    color: colors.text1,
  },
  btncont: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    flexDirection: "row",
    marginBottom: 70,
    borderTopColor: colors.text3,
    borderTopWidth: 0.5,
  },
  btntxt: {
    backgroundColor: colors.text1,
    color: colors.col1,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    borderRadius: 10,
    width: "90%",
    textAlign: "center",
  },
  c3: {
    flexDirection: "row",
    alignItems: "center",
  },
  txt5: {
    fontSize: 22,
    fontFamily: "Poppins_400Regular",
    color: colors.text1,
    marginHorizontal: 5,
  },
  txt6: {
    fontSize: 22,
    fontFamily: "Poppins_500Medium",
    color: colors.text3,
    marginHorizontal: 5,
  },
});
