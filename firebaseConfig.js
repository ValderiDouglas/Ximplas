import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBYqjcohJbKzV9S3sr0xmjl5VCjEbc38mg",
    authDomain: "ximplas-val.firebaseapp.com",
    projectId: "ximplas-val",
    storageBucket: "ximplas-val.appspot.com",
    messagingSenderId: "149165358581",
    appId: "1:149165358581:web:2a9cbe5c3410bbe7b434bc",
    measurementId: "G-PG5RQ181N6"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getFirestore(FIREBASE_APP);