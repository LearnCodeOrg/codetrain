import Router from 'next/router';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

function MainAuthed(props) {
  const { Component, pageProps } = props;

  // get current user
  const uid = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection('users').doc(uid);
  const [userDoc] = useDocument(userRef);

  // get username from user doc
  const username = userDoc === undefined ? undefined :
  userDoc.exists ? userDoc.data().username : null;

  // push to setup if no doc exists
  useEffect(() => {
    if (username === null) Router.replace('/setup');
  }, [username]);

  return <Component username={username} {...pageProps} />;
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
    <Component
      username={authed === undefined ? undefined : false}
      {...pageProps}
    />
  );
}
