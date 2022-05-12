import { initializeApp, getFirestore, getAuth } from './importFB.js';
import { firebaseConfig } from './configuracionFB.js';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
