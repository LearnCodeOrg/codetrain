import Link from 'next/link';

import styles from '../../styles/components/cards/Challenge.module.css';

export default function Challenge(props) {
  const { id, title, description } = props;

  return (
    <div className={styles.container}>
      <Link href={`/challenge/${id}`}>
        <a>
          <h1>{title}</h1>
          <p>{description}</p>
        </a>
      </Link>
    </div>
  );
}
