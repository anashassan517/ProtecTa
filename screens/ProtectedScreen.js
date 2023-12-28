import { View, Text, StyleSheet, TouchableOpacity ,Image,Button,Alert} from "react-native";
import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";


const ProtectedScreen = ({navigation}) => {
  const auth=getAuth;

  const user = auth().currentUser;

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert("Success","Logout Successfully!");
      navigation.navigate('Login'); // Navigate to your login screen
    } catch (error) {
      Alert.alert("Error","Logout Error!");

      console.error('Logout Error', error);
    }
  };

  const handleResetPassword = () => {
    // Implement password reset functionality
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/images/avatar.jpg")} />
      <Text style={styles.subtitle}>Congratulations !!! All Factors are Authenticated Successfully.</Text>
      <Text style={styles.title}>Your Name: {user?.displayName}</Text>

      <Text style={styles.title}>Your Email: {user?.email}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    marginTop: 50,
    width: "90%",
    height: "55%",
    borderRadius: 50,
    marginBottom: 20,

  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "black",
    width: "85%",
    // marginTop: 40,
    // maxWidth: "90%",
    lineHeight: 23,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    color: "black",
    width: "85%",
    marginTop: 40,
    // maxWidth: "90%",
    lineHeight: 23,
    textAlign: "center",
  },
  buttonContainer: {
    width: "85%",
  },
  button: {
    backgroundColor: "#3498db",
    height: 50,
    marginTop: 70,

    marginBottom: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});



export default ProtectedScreen;
