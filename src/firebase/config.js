import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAoJdfbd22a1Ogr-nRyEKHaqQGG21uk4ow',
  authDomain: 'got-your-money.firebaseapp.com',
  projectId: 'got-your-money',
  storageBucket: 'got-your-money.appspot.com',
  messagingSenderId: '394871622590',
  appId: '1:394871622590:web:39d1c75d58d3acf7c3c7ef'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Initialize Service

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//initialize timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
