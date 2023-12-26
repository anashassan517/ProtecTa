import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, Image, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function TabTwoScreen({ navigation }) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

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

        console.log("Authentication Success");
        Alert.alert("Success", "Fingerprint Authenticated!");
        navigation.navigate("Facial Login")
      } else {
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
      {!isBiometricSupported && (
        <Text>Fingerprint not supported on this device.</Text>
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
    marginTop: 0,
    paddingTop: 0,
    resizeMode: "cover",
    height: 400,
    width: 430,
    marginBottom: 10,
  }
})