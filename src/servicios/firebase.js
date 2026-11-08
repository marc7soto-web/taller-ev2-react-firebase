import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const configuracionFirebase = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Se inicializa Firebase utilizando las variables de entorno del proyecto.
const aplicacionFirebase = initializeApp(configuracionFirebase);

// Se obtiene la instancia que permitirá trabajar con Firestore.
const baseDatos = getFirestore(aplicacionFirebase);

// Se obtiene la instancia que permitirá invocar Firebase Functions.
const funciones = getFunctions(aplicacionFirebase);

export { aplicacionFirebase, baseDatos, funciones };