import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDp7D3O2vwuoE-lEdfFUaJYlwX5o_x2Xoo",
    authDomain: "app-bookstore-ef7ff.firebaseapp.com",
    projectId: "app-bookstore-ef7ff",
    storageBucket: "app-bookstore-ef7ff.firebasestorage.app",
    messagingSenderId: "234414805013",
    appId: "1:234414805013:web:d817656fffe23bc560be1c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);