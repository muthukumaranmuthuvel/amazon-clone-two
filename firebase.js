import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCFNMjx9XxMQ84fh8eBRf9z5facg0lZeTs",
  authDomain: "clone-two-10bdb.firebaseapp.com",
  projectId: "clone-two-10bdb",
  storageBucket: "clone-two-10bdb.appspot.com",
  messagingSenderId: "889191989328",
  appId: "1:889191989328:web:d9585bc0544618355a9155",
  measurementId: "G-434W2M2DF3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const db = getFirestore(app);
  