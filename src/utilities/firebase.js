import {getDatabase} from "firebase/database"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBFrD15GL3N-dMCZiYRx6wjfjeBLaqDWYM",
  authDomain: "ecomm-4039e.firebaseapp.com",
  databaseURL: "https://ecomm-4039e-default-rtdb.firebaseio.com",
  projectId: "ecomm-4039e",
  storageBucket: "ecomm-4039e.appspot.com",
  messagingSenderId: "921928094668",
  appId: "1:921928094668:web:505b7cb37ecb3041ec4369"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase();