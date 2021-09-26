import Header from '../components/Header';
import Head from 'next/head';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '../util/firebaseConfig.js';
import { useEffect, useState } from 'react';

import '../styles/globals.css';

// initialize firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App(props) {
  const { Component, pageProps } = props;

  const [username, setUsername] = useState(undefined);

  // retrieves current username
  async function getUsername() {
    // retrieve user doc
    const uid = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(uid);
    const userDoc = await userRef.get();
    // set username
    setUsername(userDoc.exists ? userDoc.data().username : null);
  }

  // listen for user auth
  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged(() => {
      // if authed, get username
      if (firebase.auth().currentUser) getUsername();
    });
    return () => authListener;
  }, []);

  return (
    <>
      <Head>
        <title>Codetrain</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap" rel="stylesheet" />
      </Head>
      <Header username={username} />
      <Component username={username} {...pageProps} />
    </>
  );
}
