import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAjpBPRa7Qm2Psr22q5qdMe0IsOC10Ys5Y",
    authDomain: "nextfire-c2a5e.firebaseapp.com",
    projectId: "nextfire-c2a5e",
    storageBucket: "nextfire-c2a5e.appspot.com",
    messagingSenderId: "295632412758",
    appId: "1:295632412758:web:f00968992e1656c2e45bf7"
  };


export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;



/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
 export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}