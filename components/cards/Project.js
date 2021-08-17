import Link from 'next/link';

import styles from '../../styles/Project.module.css';

export default function Project(props) {
  const { id, title, username } = props;

  return (
    <div className={styles.container}>
      <Link href={`/challenge/${id}`}>
        <a>
          <h1>{title}</h1>
        </a>
      </Link>
      <Link href={`/user/${username}`}>
        <a>
          <p>{username}</p>
        </a>
      </Link>
    </div>
  );
}
