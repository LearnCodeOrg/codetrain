import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Project from '../../components/cards/Project';
import Loading from '../../components/Loading';
import UserPage from '../../components/UserPage';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/pages/User.module.css';

export default function User(props) {
  const [user, setUser] = useState(undefined);

  const usersRef = firebase.firestore().collection('users');

  const uid = firebase.auth().currentUser?.uid;

  const feat = featured ?? userData?.featured;
  const ownPage = uid === userData?.uid;

  // get username
  const router = useRouter();
  const { username } = router.query;

  // retrieves user data from firebase
  async function getUserData() {
    // return if no username
    if (!username) return;
    // get and set user data
    const userQuery = usersRef
    .where('usernameLower', '==', username.toLowerCase());
    const userDocs = (await userQuery.get()).docs;
    // set user
    setUser(userDocs.length ? userDocs[0].id : null);
  }

  // get user data on start
  useEffect(() => {
    getUserData();
  }, [username]);

  // updates user description in firebase
  async function updateDescription() {
    await usersRef.doc(uid).update({ description });
  }

  // updates user featured project in firebase
  async function updateFeatured(val) {
    await usersRef.doc(uid).update({ featured: val });
  }

  // updates photo in firebase
  async function updatePhoto(photo) {
    const photoRef = firebase.storage().ref(`/photos/${uid}`);
    await photoRef.put(photo);
    const url = await photoRef.getDownloadURL();
    await usersRef.doc(uid).update({ photo: url });
  }

  return (
    <div className={styles.container}>
      <Header {...props} />
      {
        userData === undefined ?
        <Loading /> :
        !userData ?
        <div className="notfound">
          <h1>User not found</h1>
          <Link href="/">
            <a className="bluelink">Return home</a>
          </Link>
        </div> :
        <UserPage user={userData.uid} />
      }
    </div>
  );
}
