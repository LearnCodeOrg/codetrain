import Link from 'next/link';

import styles from '../../styles/components/cards/Project.module.css';

export default function Project(props) {
  const { id, title, creator } = props;

  return (
    <div className={styles.container}>
      <Link href={`/projects/${id}`}>
        <a>
          <h1>{title}</h1>
        </a>
      </Link>
      <Link href={`/users/${creator}`}>
        <a>
          <p>{creator}</p>
        </a>
      </Link>
    </div>
  );
}
