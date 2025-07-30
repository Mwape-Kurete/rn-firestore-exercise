import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsFnGJW_x6xLfLwY9jqV2a1m23KVc9vmE",
  authDomain: "dv300-classproj-2025.firebaseapp.com",
  projectId: "dv300-classproj-2025",
  storageBucket: "dv300-classproj-2025.firebasestorage.app",
  messagingSenderId: "388114222897",
  appId: "1:388114222897:web:7ee00a0cbd1f15ad3cea10",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); //connection var to our firestore
