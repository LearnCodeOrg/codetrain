import Link from 'next/link';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import InfoIcon from '@mui/icons-material/Info';

import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle.js';
import createUser from '../util/createUser.js';

import styles from '../styles/components/Header.module.css';

export default function Header(props) {
  const { authed } = props;

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
