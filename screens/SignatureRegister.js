import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  View,
  Alert,ActivityIndicator
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
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
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
      setUploading(true);

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
      setUploadSuccess(true);

      Alert.alert("Success", "All Factors Registered! Now Login To Continue");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error saving signature:", error.message);
      Alert.alert("Error", "Failed to save signature. Please try again.");
    }
    finally {
      setUploading(false);
    }
  };

  if (uploadSuccess) {
    return (
      <View style={styles.container}>
        <Text>Signature Register Successfully!</Text>
      </View>
    );
  }

  if (uploading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Registering Please Wait...</Text>
      </View>
    );
  }

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
    margin:0,
    padding:0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    width: 400,
    paddingTop: 50,

    padding: 10,
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
