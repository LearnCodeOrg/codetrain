import Link from 'next/link';

import styles from '../../styles/components/cards/User.module.css';

export default function User(props) {
  const { username } = props;

  return (
    <div>
      <Link href={`/users/${username}`}>
        <a>{username}</a>
      </Link>
    </div>
  );
}
