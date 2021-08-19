import Link from 'next/link';
import Image from 'next/image';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExploreIcon from '@material-ui/icons/Explore';
import InfoIcon from '@material-ui/icons/Info';

import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle.js';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.icon}>
          <Image src="/logo.png" height="48" width="48" alt="logo" />
        </a>
      </Link>
      <h1>Codetrain</h1>
      <span className={styles.flexfill} />
      <Link href="/learn">
        <a>
          <Tooltip title="Learn" arrow>
            <IconButton>
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
        </a>
      </Link>
      <Link href="/create">
        <a>
          <Tooltip title="Create" arrow>
            <IconButton>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </a>
      </Link>
      <Link href="/explore">
        <a>
          <Tooltip title="Explore" arrow>
            <IconButton>
              <ExploreIcon />
            </IconButton>
          </Tooltip>
        </a>
      </Link>
      <Link href="/about">
        <a>
          <Tooltip title="About" arrow>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </a>
      </Link>
      {
        firebase.auth().currentUser ?
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
