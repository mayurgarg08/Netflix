
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDeT2IRH34SXmLiCU-WjSGbCfoKdG0Q7Cs",
  authDomain: "netflix-clone-8b15c.firebaseapp.com",
  projectId: "netflix-clone-8b15c",
  storageBucket: "netflix-clone-8b15c.firebasestorage.app",
  messagingSenderId: "531662548414",
  appId: "1:531662548414:web:b6c00883866208f7ce9def"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
} 
const logout = () => {
  signOut(auth);

}

export {auth, db, login, signup, logout};