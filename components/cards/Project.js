import Link from 'next/link';

import styles from '../../styles/components/cards/Project.module.css';

export default function Project(props) {
  const { id, title, username } = props;

  return (
    <div className={styles.container}>
      <Link href={`/projects/${id}`}>
        <a>
          <h1>{title}</h1>
        </a>
      </Link>
      <Link href={`/users/${username}`}>
        <a>
          <p>{username}</p>
        </a>
      </Link>
    </div>
  );
}
