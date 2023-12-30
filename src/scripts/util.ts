import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import type { FirebaseOptions } from "firebase/app";

const databaseLocation = import.meta.env.DATABASEURL;

const appSettings: FirebaseOptions = {
    databaseURL: databaseLocation,
};

export const app = initializeApp(appSettings);
export const database = getDatabase(app);
