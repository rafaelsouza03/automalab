import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgAxVZrC-aS9gLE_TdfF7tSW3Sqbi4Fqc",
  authDomain: "automalab-127e3.firebaseapp.com",
  projectId: "automalab-127e3",
  storageBucket: "automalab-127e3.firebasestorage.app",
  messagingSenderId: "839156630519",
  appId: "1:839156630519:web:d87f16a9f7b042f593e4f2",
  measurementId: "G-PDQD4RX5PG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };