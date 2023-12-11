import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { btn1, btn2, colors, hr81, navbtn, navbtnin } from "../globals/style";
import { firebase } from "../../Firebase/FirebaseConfig";
import { AntDesign } from "@expo/vector-icons";

const Placeorder = ({ navigation, route }) => {
  const { cartdata } = route.params;
  const [orderdata, setOrderdata] = useState([]);
  const [totalCost, setTotalCost] = useState("0");
  useEffect(() => {
    setOrderdata(JSON.parse(cartdata));
  }, [cartdata]);

  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if (user) {
          // navigation.navigate('home');
          setUserloggeduid(user.uid);
        } else {
          // No user is signed in.
          console.log("no user");
        }
      });
    };
    checklogin();
  }, []);

  // // console.log(userloggeduid);

  useEffect(() => {
    const getuserdata = async () => {
      const docRef = firebase
        .firestore()
        .collection("UserData")
        .where("uid", "==", userloggeduid);
      const doc = await docRef.get();
      if (!doc.empty) {
        doc.forEach((doc) => {
          setUserdata(doc.data());
        });
      } else {
        console.log("no user data");
      }
    };
    getuserdata();
  }, [userloggeduid]);

  useEffect(() => {
    if (cartdata != null) {
      const foodprice = JSON.parse(cartdata).cart;
      let totalfoodprice = 0;
      foodprice.map((item) => {
        // console.log(item.data.foodPrice)
        totalfoodprice =
          parseInt(item.data.foodPrice) * parseInt(item.Foodquantity) +
          parseInt(item.data.foodAddonPrice) * parseInt(item.Addonquantity) +
          totalfoodprice;
      });
      // console.log(totalfoodprice)
      setTotalCost(JSON.stringify(totalfoodprice));
    }
  }, [cartdata]);

  // console.log(userdata);

  const placenow = () => {
    const docRef = firebase
      .firestore()
      .collection("UserOrders")
      .doc(new Date().getTime().toString());
    docRef.set({
      orderid: docRef.id,
      orderdata: orderdata.cart,
      orderstatus: "pending",
      ordercost: totalCost,
      orderdate: firebase.firestore.FieldValue.serverTimestamp(),
      orderaddress: userdata.address,
      orderphone: userdata.phone,
      ordername: userdata.name,
      orderuseruid: userloggeduid,
      orderpayment: "cash on delivery",
      paymenttotal: totalCost,
    });
    // navigation.navigate('home');
    alert("Order Placed Successfully");
    // navigation.navigate('trackorders');
  };

  return (
    <FlatList
      style={styles.containerout}
      ListHeaderComponent={
        <>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View style={navbtn}>
              <AntDesign name="back" size={24} color="black" style={navbtnin} />
            </View>
          </TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.head1}>Order Summary</Text>
          </View>
        </>
      }
      data={orderdata.cart}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.rowout}>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.qty}>{item.Foodquantity}</Text>
              <Text style={styles.title}>{item.data.foodName}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.totalprice}>
                ৳{parseInt(item.Foodquantity) * parseInt(item.data.foodPrice)}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.qty}>{item.Addonquantity}</Text>
              <Text style={styles.title}>{item.data.foodAddon}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.totalprice}>
                ৳
                {parseInt(item.Addonquantity) *
                  parseInt(item.data.foodAddonPrice)}
              </Text>
            </View>
          </View>
        </View>
      )}
      ListFooterComponent={
        <>
          <View style={hr81}></View>
          <View style={styles.row}>
            <View style={styles.total}>
              <Text style={styles.title1}>Order Total :</Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.ordertotal}>৳{totalCost}</Text>
            </View>
          </View>

          <View style={hr81}></View>

          <View style={styles.userdataout}>
            <Text style={styles.head1}>Your Details</Text>
            <View style={styles.row}>
              <View style={styles.left1}>
                <Text style={styles.title}>Name :</Text>
              </View>
              <View style={styles.right1}>
                <Text style={styles.title}>{userdata?.name}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.left1}>
                <Text style={styles.title}>Email :</Text>
              </View>
              <View style={styles.right1}>
                <Text style={styles.title}>{userdata?.email}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.left1}>
                <Text style={styles.title}>Phone :</Text>
              </View>

              <View style={styles.right1}>
                <Text style={styles.title}>{userdata?.phone}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.left1}>
                <Text style={styles.title}>Address :</Text>
              </View>
              <View style={styles.right1}>
                <Text style={styles.title}>{userdata?.address}</Text>
              </View>
            </View>
          </View>

          <View style={hr81}></View>

          <View style={styles.paybtn}>
            <TouchableOpacity style={btn1} onPress={() => placenow()}>
              <Text style={styles.btntext}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    />
  );
};

export default Placeorder;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  head1: {
    fontSize: 32,
    fontFamily: "Poppins_500Medium",
    color: colors.text1,
    margin: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  rowout: {
    flexDirection: "column",
    alignSelf: "center",
    width: "90%",
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },
  qty: {
    width: 40,
    height: 30,
    backgroundColor: colors.text1,
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
    marginRight: 10,
    color: colors.col1,
    fontSize: 17,
    fontFamily: "Poppins_500Medium",
  },
  title: {
    fontSize: 17,
    fontFamily: "Poppins_400Regular",
    marginRight: 10,
  },
  title1: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    marginLeft: 50,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  right: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  total: {
    flexDirection: "row",
    alignItems: "center",
  },
  left1: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },
  right1: {
    flexDirection: "row",
    marginRight: 30,
  },
  totalprice: {
    fontSize: 17,
    fontFamily: "Poppins_500Medium",
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  ordertotal: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    borderColor: colors.text1,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginRight: 50,
  },
  btntext: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    color: colors.col1,
    margin: 10,
  },
  paybtn: {
    marginBottom: 40,
    width: "80%",
    alignSelf: "center",
  },
});
