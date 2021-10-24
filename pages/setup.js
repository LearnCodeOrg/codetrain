import Loading from '../components/Loading';
import Router from 'next/router';

import { useEffect, useState } from 'react';
import createUser from '../util/createUser';

import styles from '../styles/pages/Setup.module.css';

export default function Setup(props) {
  const { username } = props;

  const [newUsername, setNewUsername] = useState('');

  // listen for auth
  useEffect(() => {
    if (username) Router.push('/');
  }, [username]);

  // return if loading
  if (username !== null) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <h1>New User</h1>
        <form onSubmit={e => {
          e.preventDefault();
          createUser(newUsername);
        }}>
          <input
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            placeholder="username"
            required
          />
          <button>Create User</button>
        </form>
      </div>
    </div>
  );
}
