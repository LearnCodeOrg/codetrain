import Header from '../components/Header.js';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';

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

export default function App({ Component, pageProps }) {
  const [authed, setAuthed] = useState(undefined);

  const router = useRouter();

  // checks whether user doc is existing
  async function checkUserDoc() {
    const uid = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(uid);
    const userDoc = await userRef.get();
    if (userDoc.exists) setAuthed(true);
    else {
      setAuthed(null);
      router.push('/setup');
    }
  }

  // listen for user auth
  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged(() => {
      const isAuthed = !!firebase.auth().currentUser;
      if (isAuthed) checkUserDoc();
      else setAuthed(false);
    });
    return () => authListener;
  }, []);

  useEffect(() => {
    if (authed === null && router.pathname !== 'setup') router.push('/setup')
  }, [router]);

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
      <Header />
      <div style={{ height: 60 }} />
      <Component authed={authed} {...pageProps} />
    </>
  );
}
