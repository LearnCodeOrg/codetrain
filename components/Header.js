import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
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

import styles from '../styles/components/Header.module.css';

export default function Header(props) {
  const { username, reload, setupUser } = props;

  function HeaderLink(props) {
    const { href, className } = props;

    return (
      reload ?
      <a href={href} className={className}>
        {props.children}
      </a> :
      <Link href={href}>
        <a className={className}>{props.children}</a>
      </Link>
    );
  }

  return (
    <div className={styles.container}>
      <HeaderLink href="/" className={styles.icon}>
        <Image
          src="/img/logo.png"
          height="48"
          width="48"
          alt="logo"
          quality={100}
        />
      </HeaderLink>
      <h1>Codetrain</h1>
      <span className="flexfill" />
      <HeaderLink href="/" className={styles.link}>Home</HeaderLink>
      <HeaderLink href="/create" className={styles.link}>Create</HeaderLink>
      <HeaderLink href="/explore" className={styles.link}>Explore</HeaderLink>
      <HeaderLink href="/docs" className={styles.link}>Docs</HeaderLink>
      {
        (username === null || username) ?
        <Tooltip title="Sign Out" arrow>
          <IconButton onClick={() => firebase.auth().signOut()}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip> :
        <Tooltip title="Sign In" arrow>
          <IconButton onClick={() => signInWithGoogle(setupUser)}>
            <PersonOutlineIcon />
          </IconButton>
        </Tooltip>
      }
    </div>
  );
}
