import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import type { FirebaseOptions } from "firebase/app";

export const databaseLocation =
    "https://playground-b084a-default-rtdb.firebaseio.com/";

const appSettings: FirebaseOptions = {
    databaseURL: databaseLocation,
};

export const app = initializeApp(appSettings);
export const database = getDatabase(app);
