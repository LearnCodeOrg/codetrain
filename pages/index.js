import Image from 'next/image';
import Accordion from '../components/Accordion';

import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <div className={styles.title}>
          <Image src="/logo.png" height="48" width="48" alt="logo" />
          <h1>Codetrain</h1>
        </div>
        {
          firebase.auth().currentUser ?
          <button onClick={() => firebase.auth().signOut()}>
            Sign Out
          </button> :
          <button onClick={signInWithGoogle}>
            Sign In
          </button>
        }
        <div className={styles.accordion}>
          <Accordion title="What is Codetrain?">
            Codetrain is a retro game engine in the browser.
          </Accordion>
          <Accordion title="Who is Codetrain for?">
            Everyone. Whether you&apos;re a beginner looking to learn more about
            game development or an expert looking to challenge themselves in a
            constrained environment, Codetrain provides a platform for you.
          </Accordion>
          <Accordion title="How can I get started?">
            Check out our <a href="/docs">docs</a> or jump straight into the {/* eslint-disable-line @next/next/no-html-link-for-pages */}
            {' '}<a href="/create">engine</a>. {/* eslint-disable-line @next/next/no-html-link-for-pages */}
          </Accordion>
          <Accordion title="Can I contribute?">
            Codetrain is open source. Want to contribute? Find our GitHub
            {' '}repository <a
              href="https://github.com/codeconvoy/codetrain"
              target="_blank"
              rel="noopener noreferrer"
            >here</a>.
          </Accordion>
        </div>
      </div>
      <div className="flexfill" />
      <div className={styles.footer}>
        &copy;{' '}
        <a href="https://codeconvoy.org">CodeConvoy</a>
        {' ' + new Date().getFullYear()}
      </div>
    </div>
  );
}
