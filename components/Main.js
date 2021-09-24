import Header from './Header.js';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
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
    <>
      <Header />
      <div style={{ height: 60 }} />
      <Component {...pageProps} />
    </>
  );
}
