// firebase.js
 
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // оставить
 
const firebaseConfig = {              
  apiKey: "AIzaSyAj75ig-SRJ9hVDBug3mp_KG2YulyYmPm4",
  authDomain: "pawpal-72f36.firebaseapp.com",
  projectId: "pawpal-72f36",
  storageBucket: "pawpal-72f36.firebasestorage.app",
  messagingSenderId: "258494045146",
  appId: "1:258494045146:web:33a169d104a831ae2f7ee3",
  measurementId: "G-WLSC5L76D9"
};

const app = initializeApp(firebaseConfig);

// Экспорт нужных сервисов
const auth = getAuth(app);

export { auth };

 