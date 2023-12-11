import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import logo from "../../../assets/logo.jpg";
import { colors, hr80 } from "../../globals/style";
import { firebase } from "../../../Firebase/FirebaseConfig";

const WelcomeScreen = ({ navigation }) => {
  const [userlogged, setUserLogged] = useState(null);
  useEffect(() => {
    const checkLogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // console.log(user);
          setUserLogged(user);
        } else {
          setUserLogged(null);
          console.log("No user logged in");
        }
      });
    };
    checkLogin();
  }, []);
  //console.log(userlogged);
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUserLogged(null);
        console.log("User logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.title1}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.title}>to</Text>
        <Text style={styles.title}>NSU RannaGhor</Text>
      </View>
      <View style={styles.logoout}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={hr80} />
      <Text style={styles.text}>
        Find the best food around you at lowest price.
      </Text>
      <View style={hr80} />
      {userlogged == null ? (
        <View style={styles.btnout}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.btn}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.btn}>Sign in</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.logged}>
            <Text style={styles.txtlog}>
              Signed in as &nbsp;
              <Text style={styles.txtlogin}>{userlogged.email}</Text>
            </Text>
            <View style={styles.logbtn}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.btn}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLogout()}>
                <Text style={styles.btn}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.text1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title1: {
    marginTop: 20,
  },
  title: {
    fontSize: 35,
    color: colors.col1,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  logoout: {
    width: "80%",
    height: "38%",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "80%",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    width: "80%",
    color: colors.col1,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    marginBottom: 25,
  },
  btnout: {
    flexDirection: "row",
    marginTop: -10,
  },
  btn: {
    fontSize: 20,
    color: colors.text1,
    textAlign: "center",
    marginVertical: 30,
    marginHorizontal: 10,
    fontFamily: "Poppins_500Medium",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  logged: {
    alignItems: "center",
  },
  txtlog: {
    fontSize: 17,
    color: colors.col1,
  },
  txtlogin: {
    fontSize: 19,
    color: colors.col1,
    fontWeight: "700",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  logbtn: {
    flexDirection: "row",
  },
});
export default WelcomeScreen;
