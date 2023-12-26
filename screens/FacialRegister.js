import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { getFirestore, collection, addDoc ,doc,setDoc} from "firebase/firestore";

// export default function FacialRegister({ navigation }) {
const FacialRegister = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [lastPhotoURI, setLastPhotoURI] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    const askForPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    askForPermission();
  }, [isFocused]);

  const handleUpload = async () => {
    // navigation.navigate("Fingerprint Register");

    const auth = getAuth();
    const user = auth.currentUser;

    if (user && lastPhotoURI) {
      try {
        setUploading(true);

        const storage = getStorage();
        const imageRef = ref(
          storage,
          `userData/${user.uid}/${user.email}/Facial/${user.displayName}.jpg`
        );

        const response = await fetch(lastPhotoURI);
        const blob = await response.blob();

        await uploadBytes(imageRef, blob);

        const downloadURL = await getDownloadURL(imageRef);

        // Create a new document in the "userdata" collection with form data and image URL
        const db = getFirestore();
      const userRef = doc(db, "UsersData", user.uid);

        const userDataRef =  collection(userRef, "FacialImages");
        await setDoc(userRef, {});
        const userDocRef = await addDoc(userDataRef, {
          email: user.email,
          userId: user.uid,
          userName: user.displayName,
          facialImages: [
            {
              images: downloadURL,
             
            },
          ],
        });

        console.log("Image uploaded successfully. Download URL:", downloadURL);
        console.log("Firestore document added with ID:", userDocRef.id);

        setUploadSuccess(true);
        navigation.navigate("Fingerprint Register");
        Alert.alert("Success", "Facial Record Added!");
      } catch (error) {
        Alert.alert("Error", "Error on Adding Facial Record!");

        console.error("Image upload error:", error);
      } finally {
        setUploading(false);
      }
    } else {
      console.error("User not authenticated or no image to upload");
    }
  };
  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>We need access to your camera</Text>
        <TouchableOpacity
          onPress={() => askForPermission()}
          title="Grant permission"
        >
          <Text>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (uploadSuccess) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/Uploading.gif')} />

        <Text>Image uploaded successfully!</Text>
      </View>
    );
  }

  if (uploading) {
    return (
      <View style={styles.container}>
      <Image source={require('../assets/images/Uploading.gif')} />

      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Registering Please Wait...</Text>
      {/* <Text>Image uploaded successfully!</Text> */}
    </View>

    );
  }

  if (lastPhotoURI !== null) {
    return (
      <ImageBackground
        source={{ uri: lastPhotoURI }}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
          transform: [
            { scaleX: type === Camera.Constants.Type.front ? -1 : 1 },
          ],
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#666",
            marginBottom: 40,
            marginLeft: 20,
          }}
          onPress={() => {
            setLastPhotoURI(null);
          }}
        >
          <Text style={styles.closeButtonText}>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>📤</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  return (
    <Camera
      style={{ height: "10%", flex: 1 }}
      type={type}
      ref={cameraRef}
      ratio="9:16"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#666",
            marginBottom: 40,
            marginLeft: 20,
          }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text style={{ fontSize: 30, padding: 10, color: "white" }}>♻</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#666",
            marginBottom: 40,
            marginLeft: 20,
          }}
          onPress={async () => {
            if (cameraRef.current) {
              let photo = await cameraRef.current.takePictureAsync({
                quality: 1,
              });
              setLastPhotoURI(photo.uri);
            }
          }}
        >
          <Text style={{ fontSize: 30, padding: 10, color: "white" }}>📸</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    height: "100%",
    flex: 1,
  },
  flipButton: {
    flex: 0.2,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#666",
    marginBottom: 40,
    marginLeft: 20,
  },
  flipButtonText: {
    fontSize: 30,
    padding: 10,
    color: "white",
  },
  captureButton: {
    flex: 0.2,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#666",
    marginBottom: 40,
    marginLeft: 20,
  },
  captureButtonText: {
    fontSize: 30,
    padding: 10,

    color: "white",
  },
  imageBackground: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
  },
  closeButton: {
    flex: 0.2,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#666",
    marginBottom: 40,
    marginLeft: 20,
  },
  closeButtonText: {
    fontSize: 30,
    padding: 10,
    color: "white",
  },
  uploadButton: {
    flex: 0.2,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    marginBottom: 40,
    marginLeft: 20,
  },
  uploadButtonText: {
    fontSize: 30,
    padding: 10,
    color: "white",
  },
});

export default FacialRegister;





