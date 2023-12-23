import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const paragraph = "ProtecTa is a multi-factor authentication portal that uses advanced technologies like facial recognition, fingerprint scanning, and signature verification to enhance user security and protect digital identities.";
const phrase = "Start by registering yourself if you're new here, or log in if you already have an account.";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground style={styles.backgroundImage} source={require("../assets/images/background.jpg")}>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/images/security.png")}/>
        <Text style={styles.title}>WELCOME TO PROTECTA</Text>
        <Text style={styles.para}>{paragraph}</Text>
        <Text style={styles.phrase}>{phrase}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "center",
      opacity: 1,
    },
    image: {
      resizeMode: "cover",
      width: 380,
      height: 380,
    },
    title: {
      fontSize: 25, 
      width: "85%",
      color: "black",
      marginTop: 50,
      textAlign: "justify",
      fontWeight: "bold",
    },
    para: {
      color: "black",
      fontSize: 15,
      width: "85%",
      marginTop: 10,
      maxWidth: "90%",
      textAlign: "justify",
      lineHeight: 23,
    },
    phrase: {
      fontSize: 15,
      width: "85%",
      maxWidth: "90%",
      textAlign: "justify",
      lineHeight: 23,
    },
    buttonContainer: {
      paddingTop: 50,
      width: "85%",
    },
    button: {
      backgroundColor: "#3498db",
      height: 50,
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
  
export default HomeScreen;
