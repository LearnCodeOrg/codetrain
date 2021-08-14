import Image from 'next/image';

import firebase from 'firebase/app';

import styles from '../styles/Header.module.css';

export default function Header() {
  // opens google sign in popup
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  }

  return (
    <div className={styles.container}>
      <Image src="/logo.png" height="48" width="48" />
      <h1>Codetrain</h1>
      <span className={styles.flexfill} />
      {
        firebase.auth().currentUser &&
        <p>Signed in as {firebase.auth().currentUser.displayName}</p>
      }
      {
        firebase.auth().currentUser ?
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button> :
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    </div>
  );
}
