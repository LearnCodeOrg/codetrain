import Link from 'next/link';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/pages/User.module.css';

export default function User(props) {
  const [user, setUser] = useState(undefined);

  const usersRef = firebase.firestore().collection('users');

  // get username
  const router = useRouter();
  const { username } = router.query;

  // retrieves user uid data from firebase
  async function getUser() {
    // return if no username
    if (!username) return;
    // get and set user data
    const usernameLower = username.toLowerCase();
    const userQuery = usersRef.where('usernameLower', '==', usernameLower);
    const userDocs = (await userQuery.get()).docs;
    // set user
    const userDoc = userDocs[0];
    setUser(userDoc ? { id: userDoc.id, ...userDoc.data() } : null);
  }

  // refreshes user data
  async function refreshData() {
    // return if no current user
    if (!user) return;
    // retrieve user data
    const userDoc = await userRef.get();
    setUser({ id: userDoc.id, ...userDoc.data() });
  }

  // get user data on start
  useEffect(() => {
    getUser();
  }, [username]);

  return (
    <div className={styles.container}>
      <Header {...props} />
      {
        user === undefined ?
        <Loading /> :
        !user ?
        <div className="notfound">
          <h1>User not found</h1>
          <Link href="/">
            <a className="bluelink">Return home</a>
          </Link>
        </div> :
        <div>
        </div>
      }
    </div>
  );
}
