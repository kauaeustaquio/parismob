import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBazzXvoNOzwMx9DXCvOWxXQBqyHbbki1w",
  authDomain: "produtosdparismobilesecurity.firebaseapp.com",
  projectId: "produtosdparismobilesecurity",
  storageBucket: "produtosdparismobilesecurity.firebasestorage.app",
  messagingSenderId: "123781476978",
  appId: "1:123781476978:web:c2e4f86783adff9770c8eb",
  measurementId: "G-HPT2P80Q05"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância do Auth, para que possamos autenticar os usuários do sistema
export const auth = getAuth(app);