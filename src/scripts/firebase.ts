import { getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import type { FirebaseOptions } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyD97-OHm0zdOhaO4pIHBarVEwB_NyocOt4",
    authDomain: "playground-b084a.firebaseapp.com",
    databaseURL: "https://playground-b084a-default-rtdb.firebaseio.com",
    projectId: "playground-b084a",
    storageBucket: "playground-b084a.appspot.com",
    messagingSenderId: "778482161773",
    appId: "1:778482161773:web:dbc8d569ef0ec2aade0764",
};

export const app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const database = getDatabase(app);
