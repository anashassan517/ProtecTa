import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert, Dimensions
} from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { FormData } from "react-native";
import * as FileSystem from 'expo-file-system';
import base64js from 'base64-js';


const TabOneScreen = ({ navigation }) => {
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

  // const handleAuthentication = async () => {
  //   try {
  //     console.log("handle authentication called");


  //     setUploading(true);



  //     const auth = getAuth();
  //     const user = auth.currentUser;
  //     console.log("photo.uri :",lastPhotoURI);

  //     if (user) {
  //       const storage = getStorage();
  //       const image2Ref = ref(
  //         storage,
  //         `userData/${user.uid}/${user.email}/Facial/${user.displayName}.jpg`

  //       );

  //       try {
  //         const image2URL = await getDownloadURL(image2Ref);
  //         console.log("Before Blob and image2url:",image2URL);

  //         const formData = new FormData();
  //         const image1 = new Blob([lastPhotoURI], { type: "image/jpeg" });
  //         const image2 = new Blob([image2URL], { type: "image/jpeg" });
  //         console.log("After Blob");

  //         formData.set("image1", image1);
  //         formData.set("image2", image2);

  //         const options = {
  //           method: "POST",
  //           headers: {
  //             "X-BLOBR-KEY": "mubAKvdrupZP93nWkw79aUHkNMSFiaPK",
  //           },
  //           body: formData,
  //         };

  //         const response = await fetch(
  //           "https://api.faceonlive.com/sntzbspfsdupgid1/api/face_compare",
  //           options
  //         );
  //         const result = await response.json();

  //         console.log(result);

  //         console.log("End Function");

  //         if (result.data.result === "Same") {
  //           setUploadSuccess(true);
  //         } else {
  //           Alert.alert("Authentication Failed", "Face does not match.");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching image2URL from Firebase Storage:", error);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Authentication error:", error);
  //   } finally {
  //     setUploading(false);
  //   }
  // };
  //new

  const handleAuthentication = async () => {
    try {
      console.log("handle authentication called");
      // Step 2: Fetch the second photo URL from Firestore
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        const db = getFirestore();
        const userRef = doc(db, "UsersData", user.uid);
        const userDataRef = collection(userRef, "FacialImages");
  
        try {
          const querySnapshot = await getDocs(userDataRef);
          if (!querySnapshot.empty) {
            const document = querySnapshot.docs[0].data();
            const image2URL = document.facialImages[0].images;
  
            console.log("Image2URL fetched successfully:", image2URL);
            console.log("lastPhotoURI:", lastPhotoURI);
  
            // Download the image from URL
            const down = await fetch(image2URL);
            const image2Data = await down.blob();
  
            console.log("Image2Data: ", image2Data);
  
            // Convert blob data to base64
            const buffer = await new Response(image2Data).arrayBuffer();
            const uint8Array = new Uint8Array(buffer);
            const image2Base64 = base64js.fromByteArray(uint8Array);
            // console.log("image2Base64: ", image2Base64);

  
            // Assuming lastPhotoURI is already a file URI
            const requestBody = new FormData();
            requestBody.append('image1', {
              uri: lastPhotoURI,
              type: 'image/jpeg',
              name: 'image1.jpg',
            });
            requestBody.append('image2', {
              uri: `data:image/jpeg;base64,${image2Base64}`,
              type: 'image/jpeg',
              name: 'image2.jpg',
            });
  
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
                'X-BLOBR-KEY': 'mubAKvdrupZP93nWkw79aUHkNMSFiaPK',
              },
              body: requestBody,
            };
  
            const response1 = await fetch('http://192.168.0.103:3000/compare_faces', options);
            console.log("response blob invoked");
            const result = await response1.text();
          } else {
            console.error("No facial images found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching facial images from Firestore:", error);
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setUploading(false);
    }
  };
  
  

  //   const handleAuthentication = async () => {
  //   try {
  //     const image1 =lastPhotoURI;
  //     const image2 = lastPhotoURI;
  //     const image1Base64 = await convertImageToBase64(lastPhotoURI);
  // const image2Base64 = await convertImageToBase64(lastPhotoURI);

  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-BLOBR-KEY': 'mubAKvdrupZP93nWkw79aUHkNMSFiaPK',
  //       },
  //       body: JSON.stringify({ image1Base64, image2Base64 }),
  //     };

  //     const response = await fetch('http://192.168.0.102:3000/compare_faces', options);
  //     const result = await response.json();

  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
        <Text>Image Authenticated successfully!</Text>
      </View>
    );
  }

  if (uploading) {
    return (
      <View style={styles.container}>
      <Image source={require('../assets/images/Uploading.gif')} />

      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Please Wait...</Text>
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
