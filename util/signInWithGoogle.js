import firebase from 'firebase/app';

// opens google sign in popup
export default async function signInWithGoogle(setupUser) {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider);
  // get user doc
  const uid = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection('users').doc(uid);
  const userDoc = await userRef.get();
  // if no user doc, trigger setup
  if (!userDoc.exists) setupUser();
}
