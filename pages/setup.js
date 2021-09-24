import Router from 'next/router';

import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export default function SignUp(props) {
  const { authed } = props;

  const [username, setUsername] = useState('');

  // attempts to create user
  async function createUser() {
    // verify username chars
    if (!/^[A-Za-z0-9_]+$/.test(username)) {
      alert("Username can only contain alphanumeric characters and underscore.");
      return;
    }
    // verify username length
    if (username.length < 2 || username.length > 16) {
      alert("Username must be between 2 and 16 characters.");
      return;
    }
    // verify username availability
    const usernameLower = username.toLowerCase();
    const usernamesRef = firebase.firestore().collection('usernames');
    const usernameRef = usernamesRef.doc(usernameLower);
    const usernameDoc = await usernameRef.get();
    if (usernameDoc.exists) {
      alert("Username is taken. Please try another.");
      return;
    }
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
