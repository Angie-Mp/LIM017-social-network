import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from '../firebase/importFB.js';
import { db } from '../firebase/initFB.js';

export const saveTask = (description) => addDoc(collection(db, 'newPost'), { description });
export const onGetTasks = (callback) => onSnapshot(collection(db, 'newPost'), callback);

export const userCollectionRef = (id) => doc(db, 'newPost', id);
export const deleteTask = (id) => deleteDoc(doc(db, 'newPost', id));
export const getTask = (id) => getDoc(doc(db, 'newPost', id));
export const updateTask = (id, newFields) => updateDoc(doc(db, 'newPost', id), newFields);
export const getTasks = () => getDocs(collection(db, 'newPost'));
