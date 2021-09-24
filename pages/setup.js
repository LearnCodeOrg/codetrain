import Router from 'next/router';

import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export default function SignUp(props) {
  const { authed } = props;

  const [username, setUsername] = useState('');

  // attempts to create user
  async function createUser() {
    // create user documents
    const { uid, photoURL } = firebase.auth().currentUser;
    const userRef = firebase.firestore().collection('users').doc(uid);
    await userRef.set({ photo: photoURL, username, friends: [] });
    await usernameRef.set({ uid, username, usernameLower, photo: photoURL });
  }

  // listen for user auth
  useEffect(() => {
    if (authed) Router.push('/');
  }, [authed]);

  return (
    <div>
      <h1>New User</h1>
      <form onSubmit={e => {
        e.preventDefault();
        createUser();
      }}>
        <label>
          Username
          <input
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <button>Create</button>
      </form>
    </div>
  );
}
