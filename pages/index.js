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
        <div className={styles.button}>
          {
            firebase.auth().currentUser ?
            <button onClick={() => firebase.auth().signOut()}>
              Sign Out
            </button> :
            <button onClick={signInWithGoogle}>
              Sign In
            </button>
          }
        </div>
        <h2>What is Codetrain?</h2>
        <p>Codetrain is a retro game engine in the browser.</p>
        <h2>Who is Codetrain for?</h2>
        <p>Everyone. Whether you&apos;re a beginner looking to learn more about
        game development or an expert looking to challenge themselves in a
        constrained environment, Codetrain provides a platform for you.</p>
        <h2>How can I get started?</h2>
        <p>Check out our <a href="/docs">docs</a> or jump straight into the
        {' '}<a href="/create">engine</a>.</p>
        <h2>Can I contribute?</h2>
        <p>
          Codetrain is open source. Want to contribute? Find our GitHub repository
          {' '}
          <a
            href="https://github.com/codeconvoy/codetrain"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
