import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProtectedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected Screen</Text>
      <Text style={styles.subtitle}>All Factors Authenticated</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "300",
    marginBottom: 20,
  },
});

export default ProtectedScreen;
