// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyApIvV8B-VjgbDUKX1ZQoaLBVxcfMqvCE0",
//   authDomain: "bimmers-8c64f.firebaseapp.com",
//   projectId: "bimmers-8c64f",
//   storageBucket: "bimmers-8c64f.appspot.com",
//   messagingSenderId: "379064016834",
//   appId: "1:379064016834:web:9c79d6404c12a7122d805b"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCki6d5wR9byJTWNDu0lTMbWWcrHGSU5jI",
  authDomain: "freelance-730b5.firebaseapp.com",
  projectId: "freelance-730b5",
  storageBucket: "freelance-730b5.appspot.com",
  messagingSenderId: "512174513553",
  appId: "1:512174513553:web:a9632f1bb25662053e4e30",
  measurementId: "G-3VXBTDHEE4"
};


// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

export default firebaseapp;