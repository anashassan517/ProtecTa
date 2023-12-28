import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,Image
} from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";


const TabOneScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [lastPhotoURI, setLastPhotoURI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const cameraRef = useRef(null);


  useEffect(() => {
    const askForPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log("Camera permission status:", status);
      setHasPermission(status === "granted");
    };

    askForPermission();
  }, [isFocused]);



  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setLastPhotoURI(source);
        console.log("picture source", source);
      }
    }
  };

// API PYTHON CODE FLASk
const handleAuthentication = async () => {
  try {
    setLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;
    // Assuming last photo URI is stored in lastPhotoURI variable
    const photo = lastPhotoURI;  // Replace with your actual URI
    // Upload last photo to Firebase Storage
    const storagePath = `userData/${user.uid}/${user.email}/Login/${user.displayName}.jpg`;
    await uploadToFirebaseStorage(photo, storagePath);
    // Call the Python Flask API with user details and last photo URI
    const response = await fetch('http://172.16.57.235:5000/recognize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_uid: user.uid,
        user_email: user.email,
        user_display_name: user.displayName,
        last_photo_uri: storagePath,
      }),
    });

    const parsedResponse = await response.json();
    if (JSON.stringify(parsedResponse).includes("Same")) {

      Alert.alert('Success', 'Authentication successful!');
      navigation.navigate("Signature Login");
    } else {
      Alert.alert('Authentication Failed', 'Not authenticated!');
    }



  } catch (error) {
    console.error('Error:', error);
  }
  finally {
    setLoading(false);
  }
  
};

const uploadToFirebaseStorage = async (fileURI, storagePath) => {
  const storage = getStorage();
  const imageRef = ref(
    storage,
    storagePath
  );
  const response = await fetch(fileURI);
  const blob = await response.blob();
  await uploadBytes(imageRef, blob);
  const downloadURL = await getDownloadURL(imageRef);
console.log("Download url: ",downloadURL)
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


  if (lastPhotoURI !== null) {
    return (
      <ImageBackground
        source={{ uri: lastPhotoURI }}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
          transform: [{ scaleX: type === Camera.Constants.Type.front ? -1 : 1 }],
        }}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            setLastPhotoURI(null);
          }}
        >
          <Text style={styles.closeButtonText}>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={handleAuthentication}
        >
          <Text style={styles.closeButtonText}>✅</Text>
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
          style={styles.flipButton}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text style={styles.flipButtonText}>♻</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={takePicture}
        // {async () => {
        //   if (cameraRef.current) {
        //      photo = await cameraRef.current.takePictureAsync({
        //       quality: 1,
        //     });
        //     setLastPhotoURI(photo.uri);
        //   }
        // }}

        >
          <Text style={styles.captureButtonText}>📸</Text>
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
    marginHorizontal: 31,
    marginBottom: 40,
    marginLeft: 20,
  },
  captureButtonText: {
    fontSize: 30,
    padding: 10,
    color: "white",
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
  checkButton: {
    flex: 0.2,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    marginBottom: 40,
    marginLeft: 20,
  },
  checkButtonText: {
    fontSize: 30,
    padding: 10,
    color: "white",
  },
});

export default TabOneScreen;
