import Loading from '../../components/Loading.js';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function User() {
  const [userData, setUserData] = useState(undefined);

  const usersRef = firebase.firestore().collection('users');

  // get username
  const router = useRouter();
  const { username } = router.query;

  // retrieves user data from firebase
  async function getUserData() {
    // return if no username
    if (!username) return;
    // get and set user data
    const userQuery = usersRef.where('username', '==', username);
    const userDocs = (await userQuery.get()).docs;
    // if no user doc, set data to null
    if (!userDocs.length) setUserData(null);
    // if user data, set data and retrieve projects
    else {
      const data = { id: userDocs[0].id, ...userDocs[0].data() };
      setUserData(data);
    }
  }

  // get user data on start
  useEffect(() => {
    getUserData();
  }, [username]);

  // return if invalid data
  if (userData === undefined) return <Loading />;
  if (!userData) return <div>User not found</div>;

  return (
    <div>
      <h1>{userData.username}</h1>
    </div>
  );
}
