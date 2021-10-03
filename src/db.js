// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDdECAmcaj5MpZ8N5FL5w4Y1AY54AEqhSQ',
  authDomain: 'fit-tracker-a6ff2.firebaseapp.com',
  databaseURL:
    'https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'fit-tracker-a6ff2',
  storageBucket: 'fit-tracker-a6ff2.appspot.com',
  messagingSenderId: '1095463022528',
  appId: '1:1095463022528:web:c76e3c741fe370dcc3a225'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get a reference to the database service
const db = getDatabase(app)

export default db
