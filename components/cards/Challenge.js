import Link from 'next/link';

import styles from '../../styles/components/cards/Challenge.module.css';

export default function Challenge(props) {
  const { id, title, description } = props;

  return (
    <Link href={`/challenges/${id}`}>
      <a className={styles.container}>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </a>
    </Link>
  );
}
