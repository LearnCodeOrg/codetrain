import firebase from 'firebase/app';

// opens google sign in popup
export default async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider);
}
