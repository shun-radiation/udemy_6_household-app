// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// アナリティクス
// import { getAnalytics } from 'firebase/analytics';

import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCAvW1pMOBAs1nQEPRrj-9OMXLjspcYPdc',
  authDomain: 'udemy-6-household-app.firebaseapp.com',
  projectId: 'udemy-6-household-app',
  storageBucket: 'udemy-6-household-app.firebasestorage.app',
  messagingSenderId: '621445703616',
  appId: '1:621445703616:web:3ee4c28f30361cfe2e0a25',
  measurementId: 'G-MJQSPHW87K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// アナリティクス
// const analytics = getAnalytics(app);

// firestoreの初期化
const db = getFirestore(app);

export { db };
