import Link from 'next/link';
import Image from 'next/image';
import WaveDivider from '../components/WaveDivider';
import Header from '../components/Header';
import Accordion from '../components/Accordion';
import GitHubIcon from '@mui/icons-material/GitHub';

import firebase from 'firebase/app';

import styles from '../styles/pages/Index.module.css';

export default function Index(props) {
  return (
    <div className={styles.container}>
      <Header {...props} />
      <div className={styles.top}>
        <div className={styles.overview}>
          <div className={styles.icons}>
            <Image
              src="/img/logo.png"
              width="96"
              height="96"
              alt="logo"
              quality={100}
            />
            <Image
              src="/img/logo2.png"
              width="96"
              height="96"
              alt="logo"
              quality={100}
            />
            <Image
              src="/img/logo3.png"
              width="96"
              height="96"
              alt="logo"
              quality={100}
            />
          </div>
          <h2>Codetrain makes gamedev easier than ever.</h2>
          <p>No downloads, no dependencies: <b>create retro games right from your browser.</b><br />
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
        </div>
        <div className={styles.engine}>
        <Link href="/create">
          <a>
            <Image
              src="/img/engine.png"
              width="530"
              height="270"
              placeholder="blur"
              blurDataURL="/img/engine.png"
              alt="engine"
            />
          </a>
        </Link>
        </div>
      </div>
      <div className={styles.middle}>
        <WaveDivider color="var(--secondary)" />
        <Link href="/explore">
          <a>
            <div className={styles.banner} />
          </a>
        </Link>
      </div>
      <div className={styles.bottom}>
        <div className={styles.accordion}>
          <Accordion title="What is Codetrain?">
            Codetrain is a retro game engine in the browser.
          </Accordion>
          <Accordion title="Who is Codetrain for?">
            Everyone. Whether you&apos;re a beginner looking to learn more about
            game development or an expert looking to challenge themselves in a
            minimalist environment, Codetrain provides a platform for you.
          </Accordion>
          <Accordion title="How can I get started?">
            Check out our{' '}
            <Link href="/docs">
              <a className="bluelink">docs</a>
            </Link>
            {' '}or jump straight into the{' '}
            <Link href="/create">
              <a className="bluelink">engine</a>
            </Link>.
          </Accordion>
          <Accordion title="Can I contribute?">
            Codetrain is 100% open source. Want to contribute? Find our GitHub
            {' '}repository <a
              className="bluelink"
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
      <a
        className={styles.badge}
        href="https://github.com/codeconvoy/codetrain"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon fontSize="large" />
      </a>
    </div>
  );
}
