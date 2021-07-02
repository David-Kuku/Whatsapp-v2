import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCGWBd4GgysJHlhctjZ_O5_YCRqMQ0NY8I",
    authDomain: "whatsap2-eb884.firebaseapp.com",
    projectId: "whatsap2-eb884",
    storageBucket: "whatsap2-eb884.appspot.com",
    messagingSenderId: "445082331432",
    appId: "1:445082331432:web:960d9121fb751bf36a881d"
  };

  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider}