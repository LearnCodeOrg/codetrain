import Link from 'next/link';
import Image from 'next/image';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExploreIcon from '@material-ui/icons/Explore';
import InfoIcon from '@material-ui/icons/Info';

import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle.js';

import styles from '../styles/components/Header.module.css';

export default function Header(props) {
  const { authed } = props;

  // attempts to create user
  async function createUser() {
    const username = window.prompt('Enter a username:');
    // verify username
    if (!username) {
      alert("Please enter a username.");
      return;
    }
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
    // create user documents
    const { uid, photoURL } = firebase.auth().currentUser;
    const userRef = firebase.firestore().collection('users').doc(uid);
    await userRef.set({ photo: photoURL, username, friends: [] });
    await usernameRef.set({ uid });
  }

  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.icon}>
          <Image src="/logo.png" height="48" width="48" alt="logo" />
        </a>
      </Link>
      <h1>Codetrain</h1>
      <span className="flexfill" />
      <Link href="/">
        <a className={styles.link}>Home</a>
      </Link>
      <Link href="/learn">
        <a className={styles.link}>Learn</a>
      </Link>
      <Link href="/create">
        <a className={styles.link}>Create</a>
      </Link>
      <Link href="/explore">
        <a className={styles.link}>Explore</a>
      </Link>
      {
        authed === null ?
        <Tooltip title="Choose Username" arrow>
          <IconButton onClick={createUser}>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip> :
        authed ?
        <Tooltip title="Sign Out" arrow>
          <IconButton onClick={() => firebase.auth().signOut()}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip> :
        <Tooltip title="Sign In" arrow>
          <IconButton onClick={signInWithGoogle}>
            <PersonOutlineIcon />
          </IconButton>
        </Tooltip>
      }
    </div>
  );
}
