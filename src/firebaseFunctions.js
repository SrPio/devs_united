import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { app } from "./firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";

export const db = getFirestore(app);

//Autenticación
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const loginConGoogle = (navigate) => {
  try {
    signInWithPopup(auth, provider).then(() => {navigate("/register")})
  } catch (e) {
    console.log(e);
  }
}
export const logout = () => signOut(auth);


export async function addPost(post) {
  try {
    await addDoc(collection(db, "posts"), post);
  } catch (e) {
    console.error("Error al agregar el post: ", e);

  }
}

export async function delPost(id) {
  try {
    await deleteDoc(doc(db, "posts", id));
    return id;
  } catch (e) {
    console.log("Error al borrar el post", e);
  }
}

export async function updatePost(id, newData) {
  const userRef = doc(db, "posts", id);
  try {
    await updateDoc(userRef, newData);
  } catch (e) {
    console.log("Error al actualizar el post", e);
  }
}


//Para document user
export async function addUser(user) {
  try {
    await addDoc(collection(db, "users"), user);
  } catch (e) {
    console.error("Error al agregar el usuario: ", e);

  }
}

export async function updateUser(id, newData) {
  const userRef = doc(db, "users", id);
  try {
    await updateDoc(userRef, newData);
  } catch (e) {
    console.log("Error al actualizar el usuario", e);
  }
}
