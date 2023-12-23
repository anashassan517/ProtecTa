// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   ImageBackground,
//   TouchableOpacity,
//   ActivityIndicator,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { Camera } from "expo-camera";
// import { useIsFocused } from "@react-navigation/native";
// import { getAuth } from "firebase/auth";
// import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
// import { getFirestore, collection, addDoc } from "firebase/firestore";

// // export default function FacialRegister({ navigation }) {
// const TabOneScreen = ({ navigation }) => {
//   const isFocused = useIsFocused();
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [lastPhotoURI, setLastPhotoURI] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     const askForPermission = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     };

//     askForPermission();
//   }, [isFocused]);

//   const handleUpload = async () => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (user && lastPhotoURI) {
//       try {
//         setUploading(true);

//         const storage = getStorage();
//         const imageRef = ref(
//           storage,
//           `userImages/${user.email}/facial/${user.displayName}/${user.displayName}.jpg`
//         );

//         const response = await fetch(lastPhotoURI);
//         const blob = await response.blob();

//         await uploadBytes(imageRef, blob);

//         const downloadURL = await getDownloadURL(imageRef);

//         // Create a new document in the "userdata" collection with form data and image URL
//         const db = getFirestore();
//         const userDataRef = collection(
//           db,
//           "userdata",
//           user.uid,
//           "facialImages"
//         );
//         const userDocRef = await addDoc(userDataRef, {
//           email: user.email,
//           facialImages: [
//             {
//               images: downloadURL,
//               userId: user.uid,
//               userName: user.displayName,
//             },
//           ],
//         });

//         console.log("Image uploaded successfully. Download URL:", downloadURL);
//         console.log("Firestore document added with ID:", userDocRef.id);

//         setUploadSuccess(true);
//         Alert.alert("Success", "Facial Record Added!");
//         navigation.navigate("Root");
//       } catch (error) {
//         console.error("Image upload error:", error);
//       } finally {
//         setUploading(false);
//       }
//     } else {
//       console.error("User not authenticated or no image to upload");
//     }
//   };
//   if (!hasPermission) {
//     return (
//       <View style={styles.container}>
//         <Text>We need access to your camera</Text>
//         <TouchableOpacity
//           onPress={() => askForPermission()}
//           title="Grant permission"
//         >
//           <Text>Grant permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (uploadSuccess) {
//     return (
//       <View style={styles.container}>
//         <Text>Image uploaded successfully!</Text>
//       </View>
//     );
//   }

//   if (uploading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Registering...</Text>
//       </View>
//     );
//   }

//   if (lastPhotoURI !== null) {
//     return (
//       <ImageBackground
//         //   source={{ uri: lastPhotoURI }}
//         //   style={styles.imageBackground}
//         // >
//         //   <TouchableOpacity
//         //     style={styles.closeButton}
//         //     onPress={() => {
//         //       setLastPhotoURI(null);
//         //     }}
//         //   >
//         source={{ uri: lastPhotoURI }}
//         style={{
//           flex: 1,
//           backgroundColor: "transparent",
//           flexDirection: "row",
//           justifyContent: "center",
//           transform: [
//             { scaleX: type === Camera.Constants.Type.front ? -1 : 1 },
//           ],
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             flex: 0.2,
//             alignSelf: "flex-end",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#666",
//             marginBottom: 40,
//             marginLeft: 20,
//           }}
//           onPress={() => {
//             setLastPhotoURI(null);
//           }}
//         >
//           <Text style={styles.closeButtonText}>❌</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
//           <Text style={styles.uploadButtonText}>📤</Text>
//         </TouchableOpacity>
//       </ImageBackground>
//     );
//   }

//   return (
//     // <Camera
//     //   style={{ height: "10%", flex: 1 }}
//     //   type={type}
//     //   ref={cameraRef}
//     //   ratio="9:16"
//     //   mirrorImage={false}
//     // >
//     //   <View
//     //     style={{
//     //       flex: 1,
//     //       backgroundColor: "transparent",
//     //       flexDirection: "row",
//     //       justifyContent: "center",
//     //     }}
//     //   >
//     //     <TouchableOpacity
//     //       style={{
//     //         flex: 0.2,
//     //         alignSelf: "flex-end",
//     //         alignItems: "center",
//     //         justifyContent: "center",
//     //         backgroundColor: "#666",
//     //         marginBottom: 40,
//     //         marginLeft: 20,
//     //       }}
//     //       onPress={() => {
//     //         setType(
//     //           type === Camera.Constants.Type.back
//     //             ? Camera.Constants.Type.front
//     //             : Camera.Constants.Type.back
//     //         );
//     //       }}
//     //     >
//     //       <Text style={{ fontSize: 30, padding: 10, color: "white" }}>♻</Text>
//     //     </TouchableOpacity>
//     //     <TouchableOpacity
//     //       style={{
//     //         flex: 0.2,
//     //         alignSelf: "flex-end",
//     //         alignItems: "center",
//     //         justifyContent: "center",
//     //         backgroundColor: "#666",
//     //         marginBottom: 40,
//     //         marginLeft: 20,
//     //       }}
//     //       onPress={async () => {
//     //         if (cameraRef.current) {
//     //           let photo = await cameraRef.current.takePictureAsync({
//     //             quality: 1,
//     //           });
//     //           setLastPhotoURI(photo.uri);
//     //         }
//     //       }}
//     //     >
//     //       <Text style={{ fontSize: 30, padding: 10, color: "white" }}>📸</Text>
//     //     </TouchableOpacity>
//     //   </View>
//     // </Camera>

//     <Camera
//       style={{ height: "10%", flex: 1 }}
//       type={type}
//       ref={cameraRef}
//       ratio="9:16"
//     >
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "transparent",
//           flexDirection: "row",
//           justifyContent: "center",
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             flex: 0.2,
//             alignSelf: "flex-end",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#666",
//             marginBottom: 40,
//             marginLeft: 20,
//           }}
//           onPress={() => {
//             setType(
//               type === Camera.Constants.Type.back
//                 ? Camera.Constants.Type.front
//                 : Camera.Constants.Type.back
//             );
//           }}
//         >
//           <Text style={{ fontSize: 30, padding: 10, color: "white" }}>♻</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             flex: 0.2,
//             alignSelf: "flex-end",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#666",
//             marginBottom: 40,
//             marginLeft: 20,
//           }}
//           onPress={async () => {
//             if (cameraRef.current) {
//               let photo = await cameraRef.current.takePictureAsync({
//                 quality: 1,
//               });
//               setLastPhotoURI(photo.uri);
//             }
//           }}
//         >
//           <Text style={{ fontSize: 30, padding: 10, color: "white" }}>📸</Text>
//         </TouchableOpacity>
//       </View>
//     </Camera>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   camera: {
//     height: "100%",
//     flex: 1,
//   },
//   flipButton: {
//     flex: 0.2,
//     alignSelf: "flex-end",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#666",
//     marginBottom: 40,
//     marginLeft: 20,
//   },
//   flipButtonText: {
//     fontSize: 30,
//     padding: 10,
//     color: "white",
//   },
//   captureButton: {
//     flex: 0.2,
//     alignSelf: "flex-end",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#666",
//     marginBottom: 40,
//     marginLeft: 20,
//   },
//   captureButtonText: {
//     fontSize: 30,
//     padding: 10,

//     color: "white",
//   },
//   imageBackground: {
//     flex: 1,
//     backgroundColor: "transparent",
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   closeButton: {
//     flex: 0.2,
//     alignSelf: "flex-end",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#666",
//     marginBottom: 40,
//     marginLeft: 20,
//   },
//   closeButtonText: {
//     fontSize: 30,
//     padding: 10,
//     color: "white",
//   },
//   uploadButton: {
//     flex: 0.2,
//     alignSelf: "flex-end",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#3498db",
//     marginBottom: 40,
//     marginLeft: 20,
//   },
//   uploadButtonText: {
//     fontSize: 30,
//     padding: 10,
//     color: "white",
//   },
// });

// export default TabOneScreen;













//With API

// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
//   Alert,
//   ActivityIndicator, StyleSheet
// } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { Camera } from "expo-camera";
// import { getAuth } from "firebase/auth";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { FormData } from "react-native";




// const TabOneScreen = ({ navigation }) => {
//   const isFocused = useIsFocused();
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [lastPhotoURI, setLastPhotoURI] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [userDataImage, setUserDataImage] = useState(null);

//   // Get the camera object from the useCamera hook
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     const askForPermission = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       console.log("Camera permission status:", status);
//       setHasPermission(status === "granted");
//     };

//     askForPermission();
//   }, [isFocused]);

//   // Fetch the user data image from firebase storage only once when the component mounts
//   useEffect(() => {
//     const fetchUserDataImage = async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;

//       if (user) {
//         const storage = getStorage();
//         const imageRef = ref(
//           storage,
//           `userData/${user.uid}/${user.email}/Facial/${user.displayName}.jpg`
//         );

//         try {
//           const downloadURL = await getDownloadURL(imageRef);
//           setUserDataImage(downloadURL);
//         } catch (error) {
//           console.error("User data image fetch error:", error);
//         }
//       }
//     };

//     fetchUserDataImage();
//   }, []);

//   // const handleUpload = async () => {
//   //   const auth = getAuth();
//   //   const user = auth.currentUser;

//   //   if (user && lastPhotoURI) {
//   //     try {
//   //       setUploading(true);

//   //       const storage = getStorage();
//   //       const imageRef = ref(
//   //         storage,
//   //         `userImages/${user.email}/facial/${user.displayName}/${user.displayName}.jpg`
//   //       );

//   //       const response = await fetch(lastPhotoURI);
//   //       const blob = await response.blob();

//   //       await uploadBytes(imageRef, blob);

//   //       const downloadURL = await getDownloadURL(imageRef);

//   //       // Store the download URL locally using AsyncStorage
//   //       await AsyncStorage.setItem("userImageURL", downloadURL);

//   //       // Create a new document in the "userdata" collection with form data and image URL
//   //       const db = getFirestore();
//   //       const userDataRef = collection(
//   //         db,
//   //         "userdata",
//   //         user.uid,
//   //         "facialImages"
//   //       );
//   //       const userDocRef = await addDoc(userDataRef, {
//   //         email: user.email,
//   //         facialImages: [
//   //           {
//   //             images: downloadURL,
//   //             userId: user.uid,
//   //             userName: user.displayName,
//   //           },
//   //         ],
//   //       });

//   //       console.log("Image uploaded successfully. Download URL:", downloadURL);
//   //       console.log("Firestore document added with ID:", userDocRef.id);


//   //     } catch (error) {
//   //       console.error("Image upload error:", error);
//   //     } finally {
//   //       setUploading(false);
//   //     }
//   //   } else {
//   //     console.error("User not authenticated or no image to upload");
//   //   }
//   // };

//   // Pass the lastPhotoURI and the userDataImage to the API to check
//   const handleCheck = async () => {
//     try {
//       console.log("handle authentication called");

//       // Step 1: Capture the first photo
//       if (cameraRef.current) {
//         console.log("insside camera ref");

//         let photo = await cameraRef.current.takePictureAsync({
//           quality: 1,
//         });
//         setLastPhotoURI(photo.uri);
//         console.log("Picture set as photo");

//         // Step 2: Fetch the second photo from Firebase Storage
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (user) {
//           const storage = getStorage();
//           const image2Ref = ref(storage, `userImages/${user.email}/facial/${user.displayName}.jpg`);
//           const image2URL = await getDownloadURL(image2Ref);
//           console.log("Before Blob");

//           // Step 3: Call the API with both images
//           const formData = new FormData();
//           const image1 = await fetch(photo.uri);
//           const image2 = await fetch(image2URL);

//           formData.append('image1', await image1.blob(), 'image1.jpg');
//           formData.append('image2', await image2.blob(), 'image2.jpg');

//           console.log("After Blob");

//           const options = {
//             method: 'POST',
//             headers: {
//               'X-BLOBR-KEY': 'mubAKvdrupZP93nWkw79aUHkNMSFiaPK',
//             },
//             body: formData,
//           };

//           const response = await fetch('https://api.faceonlive.com/sntzbspfsdupgid1/api/face_compare', options);
//           const result = await response.json();

//           console.log(result);

//           console.log("End Function");
//         }
//       }

//     } catch (error) {
//       console.error("Authentication error:", error);
//     } finally {
//       setUploading(false);
//     }
//   };
//   if (uploadSuccess) {
//     return (
//       <View style={styles.container}>
//         <Text>Image uploaded successfully!</Text>
//       </View>
//     );
//   }

//   if (uploading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Authenticating Please Wait...</Text>
//       </View>
//     );
//   }

//   if (lastPhotoURI !== null) {
//     return (
//       <ImageBackground
//         source={{ uri: lastPhotoURI }}
//         style={{
//           flex: 1,
//           backgroundColor: "transparent",
//           flexDirection: "row",
//           justifyContent: "center",
//           transform: [
//             { scaleX: type === Camera.Constants.Type.front ? -1 : 1 },
//           ],
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             flex: 0.2,
//             alignSelf: "flex-end",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#666",
//             marginBottom: 40,
//             marginLeft: 20,
//           }}
//           onPress={() => {
//             setLastPhotoURI(null);
//           }}
//         >
//           <Text style={styles.closeButtonText}>
//             ❌</Text>
//         </TouchableOpacity>
//         {/* <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
//           <Text style={styles.uploadButtonText}>📤</Text>
//         </TouchableOpacity> */}
//         <TouchableOpacity style={styles.uploadButton} onPress={handleCheck}>
//           <Text style={styles.uploadButtonText}>Check</Text>
//         </TouchableOpacity>
//       </ImageBackground>
//     );
//   }

//   return (
//     // <Camera
//     //   style={{ height: "10%", flex: 1 }}
//     //   type={type}
//     //   ref={cameraRef}
//     //   ratio="9:16"
//     //   mirrorImage={false}
//     // >
//     //   <View
//     //     style={{
//     //       flex: 1,
//     //       backgroundColor: "transparent",
//     //       flexDirection: "row",
//     //       justifyContent: "center",
//     //     }}
//     //   >
//     //     <TouchableOpacity
//     //       style={{
//     //         flex: 0.2,
//     //         alignSelf: "flex-end",
//     //         alignItems: "center",
//     //         justifyContent: "center",
//     //         backgroundColor: "#666",
//     //         marginBottom: 40,
//     //         marginLeft: 20,
//     //       }}
//     //       onPress={() => {
//     //         setType(
//     //           type === Camera.Constants.Type.back
//     //             ? Camera.Constants.Type.front
//     //             : Camera.Constants.Type.back
//     //         );
//     //       }}
//     //     >
//     //       <Text style={{ fontSize: 30, padding: 10, color: "white" }}>♻</Text>
//     //     </TouchableOpacity>
//     //     <TouchableOpacity
//     //       style={{
//     //         flex: 0.2,
//     //         alignSelf: "flex-end",
//     //         alignItems: "center",
//     //         justifyContent: "center",
//     //         backgroundColor: "#666",
//     //         marginBottom: 40,
//     //         marginLeft: 20,
//     //       }}
//     //       onPress={async () => {
//     //         if (cameraRef.current) {
//     //           let photo = await cameraRef.current.takePictureAsync({
//     //             quality: 1,
//     //           });
//     //           setLastPhotoURI(photo.uri);
//     //         }
//     //       }}
//     //     >
//     //       <Text style={{ fontSize: 30, padding: 10, color: "white" }}>📸</Text>
//     //     </TouchableOpacity>
//     //   </View>
//     // </Camera>

//     <Camera
//       style={{ height: "10%", flex: 1 }}
//       type={type}
//       ref={cameraRef}
//       ratio="9:16"
//     >
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "transparent",
//           flexDirection: "row",
//           justifyContent: "center",
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             flex: 0.2,
//             alignSelf: "flex-end",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#666",
//             marginBottom: 40,
//             marginLeft: 20,
//           }}
//           onPress={() => {
//             setType(
//               type === Camera.Constants.Type.back
//                 ? Camera.Constants.Type.front
//                 : Camera.Constants.Type.back
//             );
//           }}
//         >
//           <Text style={{ fontSize: 30, padding: 10, color: "white" }}>♻</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             flex: 0.2,
//             alignSelf: "flex-end",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#666",
//             marginBottom: 40,
//             marginLeft: 20,
//           }}
//           onPress={async () => {
//             if (cameraRef.current) {
//               let photo = await cameraRef.current.takePictureAsync({
//                 quality: 1,
//               });
//               setLastPhotoURI(photo.uri);
//             }
//           }}
//         >
//           <Text style={{ fontSize: 30, padding: 10, color: "white" }}>📸</Text>
//         </TouchableOpacity>
//       </View>
//     </Camera>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   camera: {
//     height: "100%",
//     flex: 1,
//   },
//   flipButton: {
//     flex: 0.2,
//     alignSelf: "flex-end",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#666",
//     marginBottom: 40,
//     marginLeft: 20,
//   },
//   flipButtonText: {
//     fontSize: 30,
//     padding: 10,
//     color: "white",
//   },
//   captureButton: {
//     flex: 0.2,
//     alignSelf: "flex-end",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#666",
//     marginBottom: 40,
//     marginLeft: 20,
//   },
//   captureButtonText: {
//     fontSize: 30,
//     padding: 10,

//     color: "white",
//   },
//   imageBackground: {
//     flex: 1,
//     backgroundColor: "transparent",
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   closeButton: {
//     flex: 0.2,
//     alignSelf: "flex-end",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#666",
//     marginBottom: 40,
//     marginLeft: 20,
//   },
//   closeButtonText: {
//     fontSize: 30,
//     padding: 10,
//     color: "white",
//   },
//   uploadButton: {
//     flex: 0.2,
//     alignSelf: "flex-end",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#3498db",
//     marginBottom: 40,
//     marginLeft: 20,
//   },
//   uploadButtonText: {
//     fontSize: 30,
//     padding: 10,
//     color: "white",
//   },
// });

// export default TabOneScreen;



//updarted API chat

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
// import { client } from "@gradio/client";
// import { client } from "@gradio/client";


const TabOneScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [lastPhotoURI, setLastPhotoURI] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const cameraRef = useRef(null);
  // let photo;

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
            console.log("uri:", lastPhotoURI);

            // Step 3: Call the API with both images
            
            const image1 = new Blob([lastPhotoURI], { type: "image/jpeg" });
            const image2 = new Blob([image2URL], { type: "image/jpeg" });
            
            
            
            
            console.log("before form data:");
            const formData = new FormData();
            console.log("after form data:");
            // formData.append('image1', { uri: lastPhotoURI, type: 'image/jpeg', name: 'photo.jpg' });
            // formData.append('image2', { uri: image2URL, type: 'image/jpeg', name: 'image2.jpg' });
            formData.set("image1", image1);
            formData.set("image2", image2);

            const options = {
              method: 'POST',
              headers: {
                'X-BLOBR-KEY': 'mubAKvdrupZP93nWkw79aUHkNMSFiaPK',
                'Content-Type': 'multipart/form-data',
              },
              body: formData,
            };

            const response = await fetch('https://api.faceonlive.com/sntzbspfsdupgid1/api/face_compare', options);
            const result = await response.json();

            console.log(result);

            // Step 4: Handle the result, setUploadSuccess(true) if authentication is successful
            if (result.data.result === "Same") {
              setUploadSuccess(true);
            } else {
              Alert.alert("Authentication Failed", "Face does not match.");
            }
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
      // Optionally, you may want to set uploading state or perform other cleanup actions
      setUploading(false);
    }
  };

  //Hugging face

  // const handleAuthentication = async () => {
  //   try {
  //     // Load the Hugging Face model
  //     const app = await client("https://faceonlive-face-recognition-sdk.hf.space/--replicas/r98wm/");

  //     // Prepare example images (you can replace these with your actual images)
  //     const exampleImage1 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
  //     const exampleImage2 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
  //     const blobImage1 = await exampleImage1.blob();
  //     const blobImage2 = await exampleImage2.blob();

  //     // Make the prediction using the compare_face endpoint
  //     const result = await app.predict("/compare_face", [blobImage1, blobImage2]);

  //     // Handle the API response
  //     console.log(result.data);
  //   } catch (error) {
  //     console.error('Error:', error);
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
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Authenticating...</Text>
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
