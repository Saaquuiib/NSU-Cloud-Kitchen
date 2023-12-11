import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { titles, colors, btn1, btn2 } from "../../globals/style";
import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { firebase } from "../../../Firebase/FirebaseConfig";
const LoginScreen = ({ navigation }) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState("");
  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("Logged in Successfully");
        console.log(user);
        navigation.navigate("WelcomePage");
      })
      .catch((error) => {
        var errorMessage = error.message;
        //console.log(errorMessage);
        if (
          errorMessage ===
          "Firebase: The email address is badly formatted.(auth/invalid-email)."
        ) {
          setCustomError("Please enter a valid email address");
        } else {
          setCustomError("Incorrect email or password");
        }
      });
  };
  return (
    <View style={StyleSheet.container}>
      <Text style={styles.head1}>Sign In</Text>
      <View style={styles.container1}>
        {customError !== "" && (
          <Text style={styles.errormsg}>{customError}</Text>
        )}
      </View>
      <View style={styles.inputout}>
        <MaterialCommunityIcons
          name="email-outline"
          size={24}
          color={emailfocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={() => {
            setEmailfocus(true);
            setPasswordfocus(false);
            setShowpassword(false);
            setCustomError("");
          }}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>
      <View style={styles.inputout}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={24}
          color={passwordfocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onFocus={() => {
            setEmailfocus(false);
            setPasswordfocus(true);
            setShowpassword(false);
            setCustomError("");
          }}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={showpassword === false ? true : false}
        />
        <Octicons
          name={showpassword == false ? "eye-closed" : "eye"}
          size={24}
          color="black"
          onPress={() => setShowpassword(!showpassword)}
        />
      </View>
      <TouchableOpacity style={btn1} onPress={() => handleLogin()}>
          <Text style={styles.signin}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.forget}>Forgot Password?</Text>
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
          onPress={() => navigation.navigate("SignUp")}
        >
          Don't have an account? <Text style={styles.signup1}>Sign up</Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: "center",
    marginVertical: 80,
    fontFamily: "Poppins_500Medium",
  },
  inputout: {
    flexDirection: "row",
    width: "80%",
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
    elevation: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: "80%",
    fontFamily: "Poppins_400Regular",
  },
  forget: {
    alignSelf: "center",
    color: colors.text2,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
  },
  or: {
    color: colors.text1,
    marginVertical: 10,
    fontFamily: "Poppins_400Regular",
    alignSelf: "center",
  },
  sign: {
    color: colors.text1,
    marginVertical: 10,
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
  },
  gf: {
    alignSelf: "center",
    flexDirection: "row",
  },
  signup: {
    color: colors.text1,
    alignSelf: "center",
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
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
  signin: {
    color: colors.col1,
    fontSize: titles.btntxt,
    fontFamily: "Poppins_500Medium",
  },
  errormsg: {
    color: "red",
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    marginVertical: 10,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "80%",
  },
});
export default LoginScreen;
