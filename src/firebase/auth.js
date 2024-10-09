import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import Notiflix from "notiflix";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  console.log(user, "google user signin");

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};
export const doUpdateProfile = (data) => {
  return updateProfile(auth.currentUser, data);
};
export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};
export const doUpdateEmail = (email) => {
  return updateEmail(auth.currentUser, email);
};
export const doGetUserList = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    const userList = [];
    querySnapshot.forEach((doc) => {
      userList.push({ id: doc.id, ...doc.data() });
    });

    // Stringify the userList before saving to localStorage
    localStorage.setItem("userList", JSON.stringify(userList));
    return userList; // Return the userList for use in the calling function
  } catch (error) {
    Notiflix.Notify.failure(error.message || "Failed to fetch users list");
    return []; // Return an empty array in case of an error
  }
};
export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
