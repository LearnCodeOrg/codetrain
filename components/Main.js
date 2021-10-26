import Router from 'next/router';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

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

  // get current user
  const uid = firebase.auth().currentUser?.uid;
  const userRef = firebase.firestore().collection('users').doc(uid ?? '~');
  const [userDoc] = useDocument(userRef);

  return (
    <Component
      username={
        !authed ? authed :
        userDoc === undefined ? undefined :
        userDoc.exists ? userDoc.data().username :
        null
      }
      {...pageProps}
    />
  );
}
