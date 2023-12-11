import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { titles, colors, btn1 } from "../../globals/style";
import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { firebase } from "../../../Firebase/FirebaseConfig";

const SignupScreen = ({ navigation }) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [showcpassword, setShowcpassword] = useState(false);
  const [cpasswordfocus, setcPasswordfocus] = useState(false);
  const [phonefocus, setPhoneFocus] = useState(false);
  const [addressfocus, setAddressFocus] = useState(false);
  const [namefocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [customError, setCustomError] = useState("");
  const [successmsg, setSucessmsg] = useState(null);

  const handleSignup = () => {
    // const FormData = {
    //   email: email,
    //   password: password,
    //   // cpassword: cpassword,
    //   phone: phone,
    //   name: name,
    //   address: address,
    // };
    if (password != cpassword) {
      alert("Password doesn't match");
      return;
    }
    if (phone.length != 11) {
      alert("Invalid Phone Number!");
      return;
    }
    if (name == "") {
      alert("Please enter your name!");
      return;
    }
    if (phone == "") {
      alert("Please enter a valid phone number!");
      return;
    }
    if (address == "") {
      alert("Please enter your address!");
      return;
    }
    if (name == "") {
      alert("Please enter your name!");
      return;
    }
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          //console.log(userCredentials?.user.uid)
          console.log("user created");
          //setSucessmsg('User Created Successfully')
          if (userCredentials?.user.uid) {
            const userRef = firebase.firestore().collection("UserData");
            userRef
              .add({
                email: email,
                password: password,
                phone: phone,
                name: name,
                address: address,
                //cpassword:cpassword,
                uid: userCredentials?.user.uid,
              })
              .then(() => {
                console.log("data added to firestore");
                setSucessmsg("User Created Successfully");
              })
              .catch((error) => {
                console.log("firestore error", error);
              });
          }
        })
        .catch((error) => {
          console.log("sign up firebase error", error.message);
          if (
            error.message ==
            "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
          ) {
            setCustomError("Email already exist");
          } else if (
            error.message ==
            "Firebase: The email address is badly formatted. (auth/invalid-email)."
          ) {
            setCustomError("Invalid Email");
          } else if (
            error.message ==
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            setCustomError("Password should be at least 6 characters");
          } else {
            setCustomError(error.message);
          }
        });
    } catch (error) {
      console.log("sign up system error", error.message);
    }
  };
  return (
    <View>
      {successmsg == null ? (
        <View style={StyleSheet.container}>
          <Text style={styles.head1}>Sign Up</Text>
          {customError !== "" && (
            <Text style={styles.errormsg}>{customError}</Text>
          )}
          <View style={styles.inputout}>
            <Ionicons
              name="person-circle-outline"
              size={24}
              color={namefocus === true ? colors.text1 : colors.text2}
            />
            <TextInput
              textContentType="name"
              style={styles.input}
              placeholder="Full Name"
              onFocus={() => {
                setEmailfocus(false);
                setNameFocus(true);
                setPhoneFocus(false);
                setPasswordfocus(false);
                setShowpassword(false);
                setcPasswordfocus(false);
                setAddressFocus(false);
                setCustomError("");
              }}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputout}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color={emailfocus === true ? colors.text1 : colors.text2}
            />
            <TextInput
              textContentType="emailAddress"
              style={styles.input}
              placeholder="Email"
              onFocus={() => {
                setEmailfocus(true);
                setNameFocus(false);
                setPasswordfocus(false);
                setShowpassword(false);
                setcPasswordfocus(false);
                setPhoneFocus(false);
                setAddressFocus(false);
                setCustomError("");
              }}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputout}>
            <Feather
              name="smartphone"
              size={24}
              color={phonefocus === true ? colors.text1 : colors.text2}
            />
            <TextInput
              keyboardType="number-pad"
              textContentType="telephoneNumber"
              style={styles.input}
              placeholder="Phone Number"
              onFocus={() => {
                setEmailfocus(false);
                setNameFocus(false);
                setPasswordfocus(false);
                setPhoneFocus(true);
                setShowpassword(false);
                setcPasswordfocus(false);
                setAddressFocus(false);
                setCustomError("");
              }}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <View style={styles.inputout}>
            <Feather
              name="map-pin"
              size={24}
              color={addressfocus === true ? colors.text1 : colors.text2}
            />
            <TextInput
              textContentType="fullStreetAddress"
              style={styles.input}
              placeholder="Enter your address"
              onFocus={() => {
                setEmailfocus(false);
                setNameFocus(false);
                setPasswordfocus(false);
                setPhoneFocus(false);
                setShowpassword(false);
                setcPasswordfocus(false);
                setAddressFocus(true);
                setCustomError("");
              }}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View style={styles.inputout}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color={passwordfocus === true ? colors.text1 : colors.text2}
            />
            <TextInput
              textContentType="password"
              style={styles.input}
              placeholder="Password"
              onFocus={() => {
                setEmailfocus(false);
                setNameFocus(false);
                setPasswordfocus(true);
                setPhoneFocus(false);
                setShowpassword(false);
                setcPasswordfocus(false);
                setAddressFocus(false);
                setCustomError("");
              }}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={showpassword === false ? true : false}
            />
            <Octicons
              name={showpassword == false ? "eye-closed" : "eye"}
              size={24}
              color="black"
              onPress={() => setShowpassword(!showpassword)}
            />
          </View>

          <View style={styles.inputout}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color={cpasswordfocus === true ? colors.text1 : colors.text2}
            />
            <TextInput
              textContentType="password"
              style={styles.input}
              placeholder="Confirm Password"
              onFocus={() => {
                setEmailfocus(false);
                setNameFocus(false);
                setPasswordfocus(false);
                setPhoneFocus(false);
                setShowpassword(false);
                setcPasswordfocus(true);
                setAddressFocus(false);
                setCustomError("");
              }}
              onChangeText={(text) => setcPassword(text)}
              secureTextEntry={showcpassword === false ? true : false}
            />
            <Octicons
              name={showcpassword == false ? "eye-closed" : "eye"}
              size={24}
              color="black"
              onPress={() => setShowcpassword(!showcpassword)}
            />
          </View>
          <TouchableOpacity style={btn1} onPress={() => handleSignup()}>
              <Text style={styles.btn2}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.or}>OR</Text>
          <Text style={styles.sign}>Sign In With</Text>

          <View style={styles.gf}>
            <TouchableOpacity>
              <View style={styles.icn}>
                <AntDesign name="google" size={24} color="#EA4335" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.icn}>
                <FontAwesome5 name="facebook-f" size={24} color="#4267B2" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.hr80}>
            <Text
              style={styles.signup}
              onPress={() => navigation.navigate("Login")}
            >
              Already have an account?{" "}
              <Text style={styles.signup1}>Sign in</Text>
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.container1}>
          <Text style={styles.successmsg}>{successmsg}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Login")}
          >
            <View>
              <Text style={styles.btn2}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setSucessmsg(null)}
          >
            <View>
              <Text style={styles.btn2}>Go Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  container1: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250,
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: "center",
    marginTop: 80,
    marginBottom: 10,
    fontFamily: "Poppins_500Medium",
  },
  inputout: {
    flexDirection: "row",
    width: "80%",
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
    elevation: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 5,
    width: "80%",
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
  },
  forget: {
    color: colors.text2,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 0,
  },
  or: {
    color: colors.text1,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
    alignSelf: "center",
  },
  sign: {
    color: colors.text1,
    marginVertical: 0,
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
  },
  gf: {
    alignSelf: "center",
    flexDirection: "row",
  },
  signup1: {
    color: colors.text1,
    textDecorationLine: "underline",
    fontFamily: "Poppins_500Medium",
  },
  icn: {
    backgroundColor: "white",
    width: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 20,
    alignItems: "center",
  },
  signup: {
    color: colors.text1,
    alignSelf: "center",
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },
  address: {
    fontSize: 18,
    color: colors.text2,
    textAlign: "center",
    marginTop: 20,
  },
  btn: {
    width: "80%",
    height: 50,
    backgroundColor: "#00334d",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    color: "white",
    marginTop: 30,
    marginBottom: -10,
  },
  btn2: {
    color: colors.col1,
    fontSize: titles.btntxt,
    fontFamily: "Poppins_500Medium",
  },
  errormsg: {
    color: "red",
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    marginTop: 10,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  successmsg: {
    color: "green",
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    margin: 10,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
export default SignupScreen;
