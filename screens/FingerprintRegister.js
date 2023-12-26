import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert ,StyleSheet,Image} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { AntDesign } from "@expo/vector-icons";
// import Modal from "react-native-modal";

export default function TabTwoScreen({ navigation }) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    // if (!isBiometricSupported) {
    //   navigation.navigate("Signature Register");
    //   Alert.alert("Alert", "Fingerprint Not Supported. Redirect to Facial");
    // }

    if (compatible && enrolled) {
      setIsBiometricSupported(true);
    } else {
      setIsBiometricSupported(false);
    }
  };

  const authenticateBiometric = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with your fingerprint",
      });

      if (result.success) {
        // Authentication successful, show the modal

        console.log("Authentication Success");
        Alert.alert("Success", "Fingerprint Register Successfully");
        navigation.navigate("Signature Register");

        // Alert(result.success);
      } else {
        // Authentication failed or was cancelled
        Alert.alert("Error", "Fingerprint Register failed!");1
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error during biometric authentication:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <Image 
      source={require("../assets/images/Fingerprint-login.png")}
      style={styles.image}
      />
      <Text>Fingerprint Recognition</Text>
      {isBiometricSupported && (
        <Button
          onPress={authenticateBiometric}
          title="Authenticate with Fingerprint"
        />
      )}
      
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop:0,
    paddingTop:0,
    resizeMode: "cover",
    height: 400,
    width: 430,
    marginBottom: 10,
  }})