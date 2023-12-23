// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen ";
import SignUpScreen from "../screens/SignUpScreen";
import FingerprintRegister from "../screens/FingerprintRegister";
import SignatureRegister from "../screens/SignatureRegister";
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import ProtectedScreen from "../screens/ProtectedScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import FacialRegister from "../screens/FacialRegister";
import IntroScreen from "../screens/IntroScreen";
import HomeScreen from "../screens/HomeScreen";
import React from "react";
import TabTwoScreen from "../screens/FingerprintRegister";
import TabThreeScreen from "../screens/TabThreeScreen";
import TabOneScreen from "../screens/TabOneScreen";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Protected" component={ProtectedScreen} />
      <Stack.Screen name="Facial Register" component={FacialRegister} />
      <Stack.Screen name="Signature Register" component={SignatureRegister} />
      <Stack.Screen name="Fingerprint Register" component={FingerprintRegister} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Facial Login" component={TabOneScreen} />
      <Stack.Screen name="Fingerprint Login" component={TabTwoScreen} />
      <Stack.Screen name="Signature Login" component={TabThreeScreen} />
    </Stack.Navigator>
  );
}
