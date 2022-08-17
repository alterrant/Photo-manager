// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: 'AIzaSyCabll9MrWiJ49ycRHOa43D9l8lHHlo-6s',
    authDomain: 'photo-manager.firebaseapp.com',
    projectId: 'photo-manager',
    storageBucket: 'photo-manager.appspot.com',
    messagingSenderId: '187018482745',
    appId: '1:187018482745:web:74ea2a0c06a33fb66929e8',
    measurementId: 'G-2MRR3CB7KB',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage();
// Create a storage and firestore reference from our storage and firebase service
export const projectFirestore = getFirestore();
