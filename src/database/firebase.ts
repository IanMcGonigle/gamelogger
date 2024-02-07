// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDtcCcfv8jI6BZXhLE_XSdsyMgCquENMpA',
  authDomain: 'epllogger.firebaseapp.com',
  projectId: 'epllogger',
  storageBucket: 'epllogger.appspot.com',
  messagingSenderId: '314299714516',
  appId: '1:314299714516:web:227f785bfc67924c8ee441',
};

// Initialize Firebase
const app:FirebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db:Firestore = getFirestore(app);

export const colletionTeams = collection(db, 'teams');
export const colletionPlayers = collection(db, 'players');
export const colletionGames = collection(db, 'games');

export default db;
