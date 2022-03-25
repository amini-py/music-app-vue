import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClzIMgH8qWZCfO1_d3y8QptINApw1ri1w",
    authDomain: "music-app-863d5.firebaseapp.com",
    projectId: "music-app-863d5",
    storageBucket: "music-app-863d5.appspot.com",
    messagingSenderId: "745001232955",
    appId: "1:745001232955:web:8e08afd11a493e84cdca1e",
    measurementId: "G-DKH5W6XWBR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const userCollection = db.collection('Users');

export {
    auth,
    userCollection
}