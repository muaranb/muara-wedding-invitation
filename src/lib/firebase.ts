import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDP_VLL727DgQ6o3NL1BuyqgzF7YpdUP-o",
    authDomain: "muara-wedding-invitation-3173d.firebaseapp.com",
    projectId: "muara-wedding-invitation-3173d",
    storageBucket: "muara-wedding-invitation-3173d.firebasestorage.app",
    messagingSenderId: "395801669164",
    appId: "1:395801669164:web:b4c9f7321500b764c0eb89",
    measurementId: "G-7Q5ZVHLPPE"
};

// Cegah inisialisasi ulang
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
