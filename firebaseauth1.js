// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZaQ457d_6VcMsn-ea7-nYvOBEwFyJ36E",
    authDomain: "blockchain-496f3.firebaseapp.com",
    projectId: "blockchain-496f3",
    storageBucket: "blockchain-496f3.firebasestorage.app",
    messagingSenderId: "532961221280",
    appId: "1:532961221280:web:14b6d99f9b89975d4ac7c5",
    measurementId: "G-1NBF9X7218"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Function to show messages to the user
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// SignUp functionality (without creating a user in Firebase Auth)
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
    const password = document.getElementById('rPassword').value;
    
    // Get the Firestore instance
    const db = getFirestore();

    // Storing user information in Firestore
    const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
    };

    // Create a Firestore document with the user's information
    const docRef = doc(db, "users", email); // Using email as document ID (unique identifier)
    setDoc(docRef, userData)
        .then(() => {
            showMessage('Account information stored successfully', 'signUpMessage');
            window.location.href = 'index.html'; // Redirect after storing data
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            showMessage('Error storing user data', 'signUpMessage');
        });
});

// SignIn functionality
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login is successful', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        });
});
