import Modal from './Modal';
import Router from 'next/router';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import createUser from '../util/createUser';

import styles from '../styles/components/Main.module.css';

export default function Main(props) {
  const { Component, pageProps } = props;

  const [authed, setAuthed] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('');

  // listen for user auth
  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged(() => {
      setAuthed(!!firebase.auth().currentUser);
    });
    return () => authListener;
  }, []);

  // get current user
  const uid = firebase.auth().currentUser?.uid;
  const userRef = firebase.firestore().collection('users').doc(uid ?? '~');
  const [userDoc] = useDocument(userRef);

  // opens user setup modal
  function setupUser() {
    setUsername('');
    setModalOpen(true);
  }

  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <h1>User Setup</h1>
        <form className={styles.createform} onSubmit={e => {
          e.preventDefault();
          createUser(username);
          setModalOpen(false);
        }}>
          <input
            className="grayinput"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
            required
          />
          <button className="graybutton">Create User</button>
        </form>
      </Modal>
      <Component
        username={
          !authed ? authed :
          userDoc === undefined ? undefined :
          userDoc.exists ? userDoc.data().username :
          null
        }
        setupUser={setupUser}
        {...pageProps}
      />
    </>
  );
}
