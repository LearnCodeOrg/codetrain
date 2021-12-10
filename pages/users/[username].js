import Link from 'next/link';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/pages/User.module.css';

export default function User(props) {
  const [user, setUser] = useState(undefined);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState('');

  // get user references
  const usersRef = firebase.firestore().collection('users');
  const userRef = user ? usersRef.doc(user.id) : undefined;
  const uid = firebase.auth().currentUser?.uid;
  const ownPage = uid === user?.id;

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

  // get user data on start
  useEffect(() => {
    getUser();
  }, [username]);

  // refreshes user data
  async function refreshData() {
    // return if no current user
    if (!user) return;
    // retrieve user data
    const userDoc = await userRef.get();
    setUser({ id: userDoc.id, ...userDoc.data() });
  }

  // updates description in firebase
  async function updateDescription() {
    await userRef.update({ description });
    refreshData();
  }

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
        <div className={styles.content}>
          <div className={styles.head}>
            <div className={styles.title}>
              {
                ownPage ?
                <label>
                  <img src={user.photo} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => updatePhoto(e.target.files[0])}
                    hidden={true}
                  />
                </label> :
                <img src={user.photo} />
              }
              <div>
                <h1>{user.username}</h1>
                <p>
                  Joined
                  {' '}
                  {
                    new Date(user.joined)
                    .toLocaleDateString(undefined, { month: 'long' })
                  }
                  {' '}
                  {new Date(user.joined).getFullYear()}
                </p>
              </div>
            </div>
            <div className={styles.description}>
              {
                editing ?
                <input
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  maxLength="2048"
                /> :
                <p>{user.description}</p>
              }
              {
                ownPage &&
                (
                  editing ?
                  <button onClick={() => {
                    updateDescription();
                    setEditing(false);
                  }}>
                    <SaveIcon />
                  </button> :
                  <button onClick={() => {
                    setDescription(user.description);
                    setEditing(true);
                  }}>
                    <EditIcon />
                  </button>
                )
              }
            </div>
          </div>
        </div>
      }
    </div>
  );
}
