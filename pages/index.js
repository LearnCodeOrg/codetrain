import Image from 'next/image';
import Button from '@material-ui/core/Button';

import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle.js';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <div className={styles.title}>
          <h1>Codetrain</h1>
          <Image src="/logo.png" height="48" width="48" alt="logo" />
        </div>
        {
          firebase.auth().currentUser ?
          <Button
            onClick={() => firebase.auth().signOut()}
            variant="contained"
          >
            Sign Out
          </Button> :
          <Button
            onClick={signInWithGoogle}
            variant="contained"
          >
            Sign In
          </Button>
        }
      </div>
    </div>
  );
}
