// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBFI-m13THQoH323ZBSt_DQa8YywM28PaY",
    authDomain: "turnkey-skill-385908.firebaseapp.com",
    projectId: "turnkey-skill-385908",
    storageBucket: "turnkey-skill-385908.appspot.com",
    messagingSenderId: "497867329647",
    appId: "1:497867329647:web:0e5d74cbdec7783f4afd9a",
    measurementId: "G-T3GC9WT956"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);