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

const TabThreeScreen = ({ navigation }) => {
  const [signature, setSign] = useState(null);
  const uref = useRef();

  const handleOK = (signature) => {
    console.log(signature);
    setSign(signature);
  };

  const handleEmpty = () => {
    alert("Kindly Affix your Signature!");
  };

  const handleClear = () => {
    console.log("clear success!");
  };

  const handleUndo = () => {
    uref.current.undo();
  };
  const handleRedo = () => {
    uref.current.redo();
  };

  const handleSave = async () => {
    // try {
    //   const user = getAuth().currentUser;
    //   const storage = getStorage();
    //   const db = getFirestore();
    //   // Save to Firebase Storage
    //   const storageRef = ref(
    //     storage,
    //     `userData/${user.uid}/${user.displayName}/signature/${user.displayName}.jpg`
    //   );
    //   await uploadBytes(storageRef, signature, "data_url");
    //   // Get the download URL
    //   const downloadURL = await getDownloadURL(storageRef);
    //   // Save URL to Firestore
    //   const userRef = doc(db, "users", user.uid);
    //   const signaturesCollectionRef = collection(userRef, "signatures");
    //   // Create the user document if it doesn't exist
    //   await setDoc(userRef, {});
    //   // Add the signature to the "signatures" subcollection
    //   await addDoc(signaturesCollectionRef, {
    //     signatureURL: downloadURL,
    //   });
    //   console.log("Signature uploaded to Firebase Storage and Firestore.");
    //   Alert.alert("Success", "All Factors Registered! Now Login To Continue");
      navigation.navigate("Protected");
    // } catch (error) {
    //   console.error("Error saving signature:", error.message);
    //   Alert.alert("Error", "Failed to save signature. Please try again.");
    // }
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
        onClear={handleClear}
        confirmText="Preview"
      />
      <Text style={styles.textSign}>Preview Signature</Text>
      <Image
        resizeMode={"cover"}
        style={{ width: 300, height: 180, paddingBottom: 20 }}
        source={{ uri: signature }}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.text}>Recognize Signature</Text>
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
    color:"#F8F8F8",
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
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default TabThreeScreen;
