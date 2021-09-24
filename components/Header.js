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
