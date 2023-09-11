// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics , isSupported } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";  // <-- この行を追加
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_SENDERID,
    appId: import.meta.env.VITE_FIREBASE_API_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// let analytics;

// // isSupported関数でAnalyticsがサポートされているかどうかを確認
// if (isSupported()) {
//     analytics = getAnalytics(app); // サポートされている場合のみ初期化
// }
const auth = getAuth(app); // <-- Added this line
const googleAuthProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth,googleAuthProvider,db,storage }; // <-- Added this line