import WaveDivider from '../components/WaveDivider';
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
        <WaveDivider height="60px" color="var(--main2)" />
        <div className={styles.logo}>
          <Image src="/img/logo.png" width="96" height="96" />
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
        <div className={styles.bottom}>
          <WaveDivider height="0" color="var(--main0)" />
          <div className={styles.examples}>
            <Image src="/img/example0.png" width="128" height="128" />
            <Image src="/img/example1.png" width="128" height="128" />
            <Image src="/img/example2.png" width="128" height="128" />
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
