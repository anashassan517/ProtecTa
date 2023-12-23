// import React, { useRef } from "react";
// import { View, Button, StyleSheet } from "react-native";
// import Signature from "react-native-signature-canvas";

// export default function SignaturePad() {
//   const signatureRef = useRef(null);

//   const handleSignature = async () => {
//     if (signatureRef.current) {
//       const signature = await signatureRef.current.readSignature();
//       console.log("Signature:", signature);
//       // You can handle the signature data as needed (e.g., save it to a file, send it to a server, etc.).
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Signature
//         ref={signatureRef}
//         onOK={handleSignature}
//         onEmpty={() => console.log("Empty")}
//         descriptionText="Sign"
//       />
//       <Button title="Save Signature" onPress={handleSignature} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// import React, { useRef } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import Signature from "react-native-signature-canvas";

// export default function SignatureRegister() {
//   const signatureRef = useRef(null);

//   const handleSignature = async () => {
//     if (signatureRef.current) {
//       const signature = await signatureRef.current.readSignature();
//       console.log("Signature:", signature);
//       // You can handle the signature data as needed (e.g., save it to a file, send it to a server, etc.).
//     }
//   };
//   const imgWidth = 400;
//   const imgHeight = 600;
//   const style = `.m-signature-pad {box-shadow: none; border: none; }
//                 .m-signature-pad--body {border: none;}
//                 .m-signature-pad--footer {display: none; margin: 0px;}
//                 body,html {
//                 width: ${imgWidth}px; height: ${imgHeight}px;}`;
//   return (
//     <View style={styles.container}>
//       <View style={{ width: imgWidth, height: imgHeight }}>
//         <Signature
//           ref={signatureRef}
//           overlaySrc="https://pngimg.com/image/88090"
//           overlayWidth={imgWidth}
//           overlayHeight={imgHeight}
//           webStyle={style}
//           onOK={handleSignature}
//           onEmpty={() => console.log("Empty")}
//           descriptionText="Please sign Abobe"
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   instructions: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
// });

// import React, { useRef, useState } from "react";
// import { View, Text, Button, StyleSheet, Image, Alert } from "react-native";
// import Signature from "react-native-signature-canvas";
// import { MaterialIcons } from "@expo/vector-icons";
// import {
//   getAuth,
//   getStorage,
//   getFirestore,
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   collection,
//   addDoc,
// } from "firebase/firestore";

// const SignatureRegister = ({ navigation }) => {

//   const signatureRef = useRef(null);
//   const [signatureImage, setSignatureImage] = useState(null);

//   const handleSignature = async () => {
//     if (signatureRef.current) {
//       const signature = await signatureRef.current.readSignature();
//       setSignatureImage(signature);
//     }
//   };

//   const handleClear = () => {
//     if (signatureRef.current) {
//       signatureRef.current.clearSignature();
//       setSignatureImage(null);
//     }
//   };

//   const handleSave = async () => {
//     if (signatureImage) {
//       try {
//         // Your Firebase storage and Firestore logic...

//         console.log("Signature uploaded to Firebase Storage and Firestore.");
//         Alert.alert("Success", "All Factors Registered! Now Login To Continue");
//         navigation.navigate("Login");
//       } catch (error) {
//         console.error("Error saving signature:", error.message);
//         Alert.alert("Error", "Failed to save signature. Please try again.");
//       }
//     }
//   };

// const signatureRef = useRef(null);
// const [signatureImage, setSignatureImage] = useState(null);

// const handleSignature = async () => {
//   console.log("Signature Data:");

//   if (signatureRef.current) {
//     const signature = await signatureRef.current.readSignature();
//     console.log("Signature Data:", signature);
//     setSignatureImage(signature);
//   }
// };

// const handleClear = () => {
//   if (signatureRef.current) {
//     signatureRef.current.clearSignature();
//     setSignatureImage(null);
//   }
// };

// const handleSave = async () => {
//   if (signatureImage) {
//     console.log("anas");
//   }

// if (signatureImage) {
//   try {
//     console.log("handle save");
//     const user = getAuth().currentUser;
//     const storage = getStorage();
//     const db = getFirestore();

//     // Save to Firebase Storage
//     const storageRef = ref(
//       storage,
//       `userData/${user.uid}/${user.displayName}/signature/${user.displayName}.jpg`
//     );
//     await uploadBytes(storageRef, signatureImage, "data_url");

//     // Get the download URL
//     const downloadURL = await getDownloadURL(storageRef);

//     // Save URL to Firestore
//     const userRef = collection(db, "users");
//     const docRef = collection(userRef, user.uid);
//     await addDoc(docRef, {
//       signatureURL: downloadURL,
//     });

//     console.log("Signature uploaded to Firebase Storage and Firestore.");
//     Alert.alert("Success", "All Factors Registered! Now Login To Continue");
//     navigation.navigate("Login");
//   } catch (error) {
//     console.error("Error saving signature:", error.message);
//     Alert.alert("Error", "Failed to save signature. Please try again.");
//   }
// }
// };

// const imgWidth = 400;
// const imgHeight = 600;
// const style = `.m-signature-pad {box-shadow: none; border: none; }
//               .m-signature-pad--body {border: none;}
//               .m-signature-pad--footer {display: none; margin: 0px;}
//               body,html {
//                 width: ${imgWidth}px; height: ${imgHeight}px;}`;

//   return (
//     <View style={styles.container}>
//       <View style={{ width: imgWidth, height: imgHeight }}>
//         <Signature
//           ref={signatureRef}
//           overlaySrc="https://pngimg.com/image/88090"
//           overlayWidth={imgWidth}
//           overlayHeight={imgHeight}
//           webStyle={style}
//           onBegin={() => console.log("Signature drawing started")}
//           onEnd={handleSignature} // Call handleSignature when drawing ends
//           descriptionText="Please sign Abobe"
//         />
//       </View>
//       {signatureImage && (
//         <View style={{ marginTop: 20 }}>
//           <Text>Saved Signature:</Text>
//           <Image
//             source={{ uri: signatureImage }}
//             style={{ width: 100, height: 100, marginTop: 10 }}
//           />
//         </View>
//       )}
//       <View style={styles.Button1}>
//         <Button title="Clear" onPress={handleClear} />
//         <Button title="Upload" onPress={handleSave} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   Button1: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "80%",
//   },
// });

// export default SignatureRegister;

// workded perfect!!
import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  View,
  Alert,
} from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const SignatureRegister = ({ navigation }) => {
  const [signature, setSign] = useState(null);
  // const [colorText, setPenColor] = useState("");
  const uref = useRef();

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log(signature);
    setSign(signature);
    // console.log(colorText);
  };

  const handleEmpty = () => {
    alert("Kindly Affix your Signature!");
  };

  const handleClear = () => {
    console.log("clear success!");
  };

  // const handleColorChange = () => {
  //   ref.current.changePenColor(colorText);
  // };
  const handleUndo = () => {
    uref.current.undo();
  };
  const handleRedo = () => {
    uref.current.redo();
  };

  const handleSave = async () => {
    try {
      const user = getAuth().currentUser;
      const storage = getStorage();
      const db = getFirestore();

      // Save to Firebase Storage
      const storageRef = ref(
        storage,
        `userData/${user.uid}/${user.email}/signature/${user.displayName}.jpg`
      );
      await uploadBytes(storageRef, signature, "data_url");

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Save URL to Firestore
      const userRef = doc(db, "UsersData", user.uid);
      const signaturesCollectionRef = collection(userRef, "Signatures");

      // Create the user document if it doesn't exist
      await setDoc(userRef, {});

      // Add the signature to the "signatures" subcollection
      await addDoc(signaturesCollectionRef, {
        signatureURL: downloadURL,
      });

      console.log("Signature uploaded to Firebase Storage and Firestore.");
      Alert.alert("Success", "All Factors Registered! Now Login To Continue");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error saving signature:", error.message);
      Alert.alert("Error", "Failed to save signature. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textSign}>Sign Below</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.setButton,
            { marginRight: 30, backgroundColor: "red" },
          ]}
          onPress={handleUndo}
        >
          <Text style={styles.text}>Undo</Text>
        </TouchableOpacity>
        {/* <TextInput
          placeholder="Specify Pen Color"
          style={styles.textInput}
          autoCapitalize="none"
          value={colorText}
          onChangeText={setPenColor}
        />
        <TouchableOpacity style={styles.setButton} onPress={handleColorChange}>
          <Text style={styles.text}>Set</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.setButton, { marginLeft: 30, backgroundColor: "red" }]}
          onPress={handleRedo}
        >
          <Text style={styles.text}>Redo</Text>
        </TouchableOpacity>
      </View>

      <SignatureScreen
        ref={uref}
        onOK={handleOK}
        onEmpty={handleEmpty}
        // penColor={colorText}
        onClear={handleClear}
        confirmText="Preview"
        // onGetData={handleData}
      />
      <Text style={styles.textSign}>Preview Signature</Text>
      <Image
        resizeMode={"cover"}
        style={{ width: 300, height: 180, paddingBottom: 20 }}
        source={{ uri: signature }}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.text}>Save Signature</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: 400,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    padding: 40,
  },
  preview: {
    width: 335,
    height: 100,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textSign: {
    color: "deepskyblue",
    fontWeight: "bold",
    paddingVertical: 5,
  },
  text: {
    color: "#fff",
    fontWeight: "900",
  },
  textInput: {
    paddingVertical: 10,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "deepskyblue",
    textAlign: "center",
    fontWeight: "900",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  setButton: {
    backgroundColor: "deepskyblue",
    textAlign: "center",
    fontWeight: "900",
    color: "#fff",
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SignatureRegister;
