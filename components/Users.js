import User from './cards/User';
import Loading from './Loading';

import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

import styles from '../styles/components/Grid.module.css';

export default function Users() {
  const [users, setUsers] = useState(undefined);

  // retrieves users from firebase
  async function getUsers() {
    const usersRef = firebase.firestore().collection('users');
    const usersQuery = usersRef.orderBy('joined', 'desc');
    const usersDocs = (await usersQuery.get()).docs;
    setUsers(usersDocs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  // get users on start
  useEffect(() => {
    getUsers();
  }, []);

  // return if loading
  if (!users) return <Loading />;

  return (
    <div className={styles.container}>
      {
        users.map(user =>
          <User {...user} key={user.id} />
        )
      }
    </div>
  );
}
