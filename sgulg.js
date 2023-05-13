import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt_9hs-dmkCDOsunUZJAcGqZsb4Pf20Ss",
  authDomain: "math-project-e085a.firebaseapp.com",
  projectId: "math-project-e085a",
  storageBucket: "math-project-e085a.appspot.com",
  messagingSenderId: "1022424034823",
  appId: "1:1022424034823:web:aafb04f6a5270568a844a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

document.getElementById("btn-sgu").addEventListener("click", () => {
    const email = document.getElementById("su-email").value;
    const password = document.getElementById("su-pass").value;
    console.log({
      email,
      password,
      passwordConfirm,
    });
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        alert("Sign up success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("ERROR");
        // ..
      });
  });
