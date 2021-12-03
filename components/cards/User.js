import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/components/cards/User.module.css';

export default function User(props) {
  const { photo, username, joined } = props;

  return (
    <div className={styles.container}>
      <Link href={`/users/${username}`}>
        <a>
          <div className={styles.content}>
            <div className={styles.top}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} />
              <span>{username}</span>
            </div>
            <p>{`Joined ${new Date(joined).toLocaleDateString()}`}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
