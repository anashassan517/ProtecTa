import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { firebaseConfig } from "./config"; // Create a 'config.js' file to store your Firebase config

// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getAuth } from "firebase/auth";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";
import { useEffect } from "react";

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();
  // Initialize Firebase when the app starts
  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />

        <StatusBar
          // animated={true}
          backgroundColor="#696969"
          // barStyle={statusBarStyle}
          // showHideTransition={statusBarTransition}
          // hidden
        />
      </SafeAreaProvider>
    );
  }
}
