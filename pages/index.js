import Header from '../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import Accordion from '../components/Accordion';

import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.center}>
        <div className={styles.divider}>
          <div />
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
        <div className={styles.logo}>
          <Image src="/logo.png" height="96" width="96" alt="logo" />
        </div>
        <h2>Codetrain makes game development easier than ever.</h2>
        <p>No downloads, no dependencies: <b>create games right from your browser.</b><br />
        Easily export to HTML for portability. Explore and remix projects from
        the community.</p>
        <div className={styles.links}>
          <Link href="/create">
            <a>Create</a>
          </Link>
          <Link href="/explore">
            <a>Explore</a>
          </Link>
          <Link href="/docs">
            <a>Docs</a>
          </Link>
        </div>
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
            Check out our{' '}
            <Link href="/docs">
              <a>docs</a>
            </Link>
            {' '}or jump straight into the{' '}
            <Link href="/create">
              <a>engine</a>
            </Link>.
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
