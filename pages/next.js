import styles from '../styles/pages/Next.module.css';

export default function next() {
  return (
    <div className={styles.container}>
      <h1>What&apos;s next?</h1>
      <p>
        Check out{' '}
        <a
          href="https://developer.mozilla.org/docs/Web/JavaScript"
          target="_blank"
          rel="noopener noreferrer"
        >
          JavaScript documentation
        </a>
         {' '}to learn more.
      </p>
      <p>
        Check out{' '}
        <a
          href="https://codeconvoy.org/projects"
          target="_blank"
          rel="noopener noreferrer"
        >
          our other projects
        </a>
        .
      </p>
    </div>
  );
}
