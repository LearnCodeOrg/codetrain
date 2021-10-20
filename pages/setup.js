import Loading from '../components/Loading';
import Router from 'next/router';

import { useEffect, useState } from 'react';

import styles from '../styles/pages/Setup.module.css';

export default function Setup(props) {
  const { username } = props;

  // listen for auth
  useEffect(() => {
    if (username === undefined) Router.push('/');
  }, [username]);

  // return if loading
  if (username !== null) return <Loading />;

  return (
    <div>
    </div>
  );
}
