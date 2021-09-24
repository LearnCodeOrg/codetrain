import Header from './Header.js';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

function MainAuthed(props) {
  const { Component, pageProps } = props;

  // get current user
  const uid = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection('users').doc(uid);
  const [userDoc] = useDocument(userRef);

  // get auth state from user doc
  const authed = userDoc === undefined ? false : userDoc.exists ? true : null;

  return (
    <>
      <Header authed={authed} />
      <div style={{ height: 60 }} />
      <Component authed={authed} {...pageProps} />
    </>
  );
}

export default function Main(props) {
  const { Component, pageProps } = props;

  const [authed, setAuthed] = useState(undefined);

  // listen for user auth
  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged(() => {
      setAuthed(!!firebase.auth().currentUser);
    });
    return () => authListener;
  }, []);

  return (
    authed ?
    <MainAuthed {...props} /> :
    <>
      <Header />
      <div style={{ height: 60 }} />
      <Component {...pageProps} />
    </>
  );
}
