// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBLgNng1-2IZWbmmw-ZCVY1B31YXl4Z5nU",
	authDomain: "noteer-ff37b.firebaseapp.com",
	projectId: "noteer-ff37b",
	storageBucket: "noteer-ff37b.appspot.com",
	messagingSenderId: "151075680545",
	appId: "1:151075680545:web:7617c71a0513d66e3a4e60",
	measurementId: "G-3HK96LWFPT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, googleProvider, db };
