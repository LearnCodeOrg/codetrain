import Loading from '../../components/Loading.js';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function User() {
  const [data, setData] = useState(undefined);

  // get user id
  const router = useRouter();
  const { id } = router.query;

  // retrieves user data from firebase
  async function getUserData() {
    // return if no id
    if (!id) return;
    // get and set user data
    const userRef = firebase.firestore().collection('users').doc(id);
    const userDoc = await userRef.get();
    setData(userDoc.exists ? userDoc.data() : null);
  }

  // get user data on start
  useEffect(getUserData, [id]);

  // return if invalid data
  if (data === undefined) return <Loading />;
  if (!data) return <div>User not found</div>;

  return (
    <div>
      <h1>{data.username}</h1>
    </div>
  );
}
