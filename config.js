
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyA1EW1Myb2ehgXCItwiMVsR9jVC6WGN7ZE",
  authDomain: "protecta-ca1ba.firebaseapp.com",
  projectId: "protecta-ca1ba",
  storageBucket: "protecta-ca1ba.appspot.com",
  messagingSenderId: "306672016487",
  appId: "1:306672016487:web:8093e15dc140f4b4c008c2"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
