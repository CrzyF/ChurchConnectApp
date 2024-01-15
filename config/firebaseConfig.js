import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBnUsTIFututdRQb7KRwSw_n3-xEycWN1g",
    authDomain: "fir-app-d864b.firebaseapp.com",
    projectId: "fir-app-d864b",
    storageBucket: "fir-app-d864b.appspot.com",
    messagingSenderId: "451907520244",
    appId: "1:451907520244:web:051c2f363bfa48051dc0a1"
};

const app = initializeApp(firebaseConfig);
export default app;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBnUsTIFututdRQb7KRwSw_n3-xEycWN1g",
//   authDomain: "fir-app-d864b.firebaseapp.com",
//   projectId: "fir-app-d864b",
//   storageBucket: "fir-app-d864b.appspot.com",
//   messagingSenderId: "451907520244",
//   appId: "1:451907520244:web:051c2f363bfa48051dc0a1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);