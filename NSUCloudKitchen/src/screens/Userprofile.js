import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../Firebase/FirebaseConfig";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  navbtn,
  navbtnin,
  navbtnout,
  colors,
  btn2,
  btn1,
  btn3,
  btn4,
} from "../globals/style";

const Userprofile = ({ navigation }) => {
  const [userloggeduid, setUserLoggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
    const checkLogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // console.log(user);
          setUserLoggeduid(user.uid);
        } else {
          setUserLoggeduid(null);
        }
      });
    };
    checkLogin();
  }, []);
  //console.log(userloggeduid);
  useEffect(() => {
    const getuserData = async () => {
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
        //navigation.navigate('Login');
        console.log("No such document");
      }
    };
    getuserData();
  }, [userloggeduid]);

  const [edit, setEdit] = useState(false);
  const [newname, setNewName] = useState("");
  const [newaddress, setNewAddress] = useState("");

  const updateuser = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userloggeduid);
    const doc = await docRef.get();
    if (!doc.empty) {
      if (newname !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            name: newname,
          });
        });
      }
      if (newaddress !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            address: newaddress,
          });
        });
      }
      alert("your user data is updated");
      getuserdata();
      setEdit(false);
      setPasswordedit(false);
    } else {
      console.log("no user data");
    }
  };

  const [Passwordedit, setPasswordedit] = useState(false);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const updatepassword = async () => {
    const reauthenticate = (oldpassword) => {
      var user = firebase.auth().currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldpassword
      );
      return user.reauthenticateWithCredential(cred);
    };
    let docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userloggeduid);
    let doc = await docRef.get();
    reauthenticate(oldpassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newpassword)
          .then(() => {
            // alert("Password updated!");

            if (!doc.empty) {
              doc.forEach((doc) => {
                doc.ref.update({
                  password: newpassword,
                });
              });
              alert("your password is updated");
            }
          })
          .catch((error) => {
            alert("Server Issue");
          });
      })
      .catch((error) => {
        alert("Wrong Password");
      });
  };

  const logoutuser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        alert("you are logged out");
        navigation.navigate("login");
      })
      .catch((error) => {
        // An error happened.
        alert("Server Issue");
      });
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

      {edit == false && Passwordedit == false && (
        <View style={styles.container}>
          <Text style={styles.head1}>Your Profile</Text>
          <View style={styles.containerin}>
            <Text style={styles.head2}>
              Name:{" "}
              {userdata ? (
                <Text style={styles.head2in}>{userdata.name}</Text>
              ) : (
                "loading"
              )}
            </Text>
            <Text style={styles.head2}>
              Email:{" "}
              {userdata ? (
                <Text style={styles.head2in}>{userdata.email}</Text>
              ) : (
                "loading"
              )}
            </Text>
            <Text style={styles.head2}>
              Phone:{" "}
              {userdata ? (
                <Text style={styles.head2in}>{userdata.phone}</Text>
              ) : (
                "loading"
              )}
            </Text>
            <Text style={styles.head2}>
              Address:{" "}
              {userdata ? (
                <Text style={styles.head2in}>{userdata.address}</Text>
              ) : (
                "loading"
              )}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setEdit(!edit);
              setPasswordedit(false);
            }}
            style={btn3}
          >
            <Text style={styles.btntxt}>Edit Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setPasswordedit(!Passwordedit);
              setEdit(false);
            }}
          >
            <View style={btn3}>
              <Text style={styles.btntxt}>Change Password</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {edit == true && (
        <View style={styles.container}>
          <Text style={styles.head1}>Edit Profile</Text>
          <View style={styles.containerin}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={(e) => setNewName(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              onChangeText={(e) => setNewAddress(e)}
            />
          </View>
          <TouchableOpacity onPress={() => updateuser()}>
            <View style={btn4}>
              <Text style={styles.btntxt}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {Passwordedit == true && (
        <View style={styles.container}>
          <Text style={styles.head1}>Change your Password</Text>
          <View style={styles.containerin}>
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              onChangeText={(e) => setOldPassword(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              onChangeText={(e) => setNewPassword(e)}
            />
          </View>
          <TouchableOpacity onPress={() => updatepassword()}>
            <View style={btn4}>
              <Text style={styles.btntxt}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={() => logoutuser()}>
        <View style={btn4}>
          <Text style={styles.btntxt}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Userprofile;
const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    //alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
  },
  head1: {
    fontSize: 40,
    color: colors.text1,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    marginVertical: 50,
  },
  containerin: {
    backgroundColor: "#fff",
    width: "90%",
    alignItems: "center",
    borderWidth: 4,
    borderColor: colors.text1,
    borderRadius: 20,
    padding: 10,
  },
  head2: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    marginVertical: 15,
  },
  head2in: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
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
  input: {
    width: "100%",
    fontFamily: "Poppins_400Regular",
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
  },
});
