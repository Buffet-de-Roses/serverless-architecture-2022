/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  doc,
  collection,
  where,
  addDoc,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage, ref, uploadBytes
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messaginSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};

const streamUsers = (snapshot, error) => {
  const usersRef = collection(db, 'users');
  const usersQ = query(usersRef);
  return onSnapshot(usersQ, snapshot, error);
};

const streamMessages = (snapshot, error) => {
  const messagesRef = collection(db, 'messages');
  const messagesQ = query(messagesRef);
  return onSnapshot(messagesQ, snapshot, error);
};

const stream = (streaming, snapshot, error) => {
  const sRef = collection(db, streaming);
  const sQ = query(sRef);
  return onSnapshot(sQ, snapshot, error);
};

const createConvervastion = async (creatorId, name, users,) => {
  await addDoc(collection(db, 'conversations'), {
    creatorId,
    name,
    users,
    createdAt: Date.now(),
  });
};

const sendMessage = async (senderId, message) => {
  await addDoc(collection(db, 'messages'), {
    senderId,
    message,
    createdAt: Date.now(),
  });
};

const uploadFile = async (file, currentUser) => {
  try {
    const fileRef = ref(storage, currentUser.uid + '.png');
    const snapshot = await uploadBytes(fileRef, file);
    const photoUrl = await getDownloadURL(fileRef);

    const q = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
    const docs = await getDocs(q);
    console.log(docs);
    if (docs.docs.length === 0) {
      await setDoc(collection(db, 'users'), {
        photoUrl
      });
    }
  } catch (e) {
    alert(e.message);
  }
  
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  streamUsers,
  streamMessages,
  stream,
  sendMessage,
  createConvervastion,
  uploadFile,
};