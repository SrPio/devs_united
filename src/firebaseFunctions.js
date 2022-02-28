import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  setDoc, getDoc
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
    signInWithPopup(auth, provider).then(
      (userData) => {
        getOneUser(navigate, userData.user.uid);

      })
  } catch (e) {
    console.log(e);
  }
}
export const logout = () => signOut(auth);


export async function addPost(post) {
  try {
    const reference = doc(collection(db, "posts"));
    const postData = { ...post, id: reference.id }
    await setDoc(reference, postData);
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
  try {
    await updateDoc(id, newData);
  } catch (e) {
    console.log("Error al actualizar el post", e);
  }
}


//Para document user
export async function addUser(user) {
  try {
    const reference = doc(db, "users", user.uid);
    await setDoc(reference, user);
  } catch (e) {
    console.error("Error al agregar el user: ", e);

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

async function getOneUser(navigate, id) {
  const userRef = doc(db, "users", id);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    navigate("/feed")
  } else {
    navigate("/register")
  }
}

export async function getUserUsername(id) {
  const userRef = doc(db, "users", id);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data().username;
  } else {
    return null;
  }
}