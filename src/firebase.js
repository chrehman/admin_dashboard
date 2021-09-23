import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0xDpz8SbOhsUQd4vNBp_7VVV2QcQtJwg",
  authDomain: "safe-citizen-life.firebaseapp.com",
  databaseURL: "https://safe-citizen-life-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "safe-citizen-life",
  storageBucket: "safe-citizen-life.appspot.com",
  messagingSenderId: "892516878198",
  appId: "1:892516878198:web:614fc9219dcb5b09405c57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore =getFirestore();
const auth = getAuth();


export { auth };
export default firestore;