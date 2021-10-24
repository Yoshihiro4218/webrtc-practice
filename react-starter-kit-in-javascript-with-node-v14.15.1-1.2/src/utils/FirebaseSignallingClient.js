import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export default class FirebaseSignallingClient {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBsSgIL2Vgc7vpu6bjsyD3q0DNM8w-A170",
      authDomain: "webrtc-practice-udemy.firebaseapp.com",
      databaseURL: "https://webrtc-practice-udemy-default-rtdb.firebaseio.com",
      projectId: "webrtc-practice-udemy",
      storageBucket: "webrtc-practice-udemy.appspot.com",
      messagingSenderId: "774056116257",
      appId: "1:774056116257:web:8cd0eb2509642668c1e360"
    };
    if (firebase.app.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    this.database = firebase.database();
    this.localPeerName = '';
    this.remotePeerName = '';
  };
};