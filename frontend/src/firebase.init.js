import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDO_V-qWlf0ZeDNMV_VV3MKWivX6vm7l5c",
  authDomain: "twitter-424bb.firebaseapp.com",
  projectId: "twitter-424bb",
  storageBucket: "twitter-424bb.appspot.com",
  messagingSenderId: "21179138539",
  appId: "1:21179138539:web:b3b26c4dd71877fe77d9ae",
  measurementId: "G-GX559LF9PY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
