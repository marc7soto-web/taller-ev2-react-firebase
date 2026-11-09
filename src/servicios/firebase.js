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

// Se inicializa Firebase con las variables de entorno del proyecto.
const aplicacionFirebase = initializeApp(configuracionFirebase);

// Se obtiene la instancia que permite trabajar con Firestore.
const baseDatos = getFirestore(aplicacionFirebase);

// Se configura Functions con la misma región utilizada en el servidor.
const funciones = getFunctions(
    aplicacionFirebase,
    "southamerica-east1"
);

export { aplicacionFirebase, baseDatos, funciones };
