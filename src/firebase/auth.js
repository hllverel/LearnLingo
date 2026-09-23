import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase.js";

export const registerUser = async ({ name, email, password }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const logoutUser = () => signOut(auth);