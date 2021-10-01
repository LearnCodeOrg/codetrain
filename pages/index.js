import Image from 'next/image';

import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle.js';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <div className={styles.title}>
          <Image src="/logo.png" height="48" width="48" alt="logo" />
          <h1>Codetrain</h1>
        </div>
        </div>
      </div>
    </div>
  );
}
