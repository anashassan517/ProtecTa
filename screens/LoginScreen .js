// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Button,
// } from "react-native";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const auth = getAuth();
//       await signInWithEmailAndPassword(auth, email, password);

//       navigation.navigate("Root");
//     } catch (error) {
//       console.error("Login Error:", error.message);
//     }
//   };

//   const navigateToSignUp = () => {
//     navigation.navigate("SignUp");
//   };

//   const navigateToLoginOption = () => {
//     navigation.navigate("Root");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry={true}
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={navigateToLoginOption}>
//         <Text style={styles.buttonText}>More Option</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={navigateToSignUp}>
//         <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "80%",
//     height: 50,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     padding: 10,
//     borderRadius: 8,
//   },
//   button: {
//     backgroundColor: "#3498db",
//     padding: 15,
//     width: "80%",
//     borderRadius: 8,
//     marginBottom: 50,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   linkText: {
//     marginTop: 20,
//     color: "#3498db",
//   },
// });

// export default LoginScreen;

import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // New state for success/error messages

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!"); // Set success message
      // Alert("Login successful!");
      navigation.navigate("Root");
    } catch (error) {
      setMessage(`Login Error: ${error.message}`); // Set error message
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const navigateToLoginOption = () => {
    navigation.navigate("Root");
  };

  return (
    <View style={styles.container}>
      <Image 
      source={require("../assets/images/login.png")}
      style={styles.image}
      />
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {/* <TouchableOpacity style={styles.button} onPress={navigateToLoginOption}>
        <Text style={styles.buttonText}>More Option</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    height: 220,
    width: 230,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#3498db",
    height: 50,
    width: "80%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  message: {
    color: "green", // Success message color
    fontSize: 16,
    marginTop: 10,
  },
  linkText: {
    marginTop: 20,
    color: "#3498db",
  },
});

export default LoginScreen;