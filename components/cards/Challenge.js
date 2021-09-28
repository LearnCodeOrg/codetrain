import styles from '../../styles/components/cards/Challenge.module.css';

export default function Challenge(props) {
  const { id, title, description } = props;

  return (
    <a href={`/challenges/${id}`} className={styles.container}> {/* eslint-disable-line @next/next/no-html-link-for-pages */}
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </a>
  );
}
