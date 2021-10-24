import firebase from 'firebase/app';
import 'firebase/database';

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
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    this.database = firebase.database();
    this.localPeerName = '';
    this.remotePeerName = '';
  };
};