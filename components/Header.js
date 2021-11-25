import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import DescriptionIcon from '@mui/icons-material/Description';

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
      <HeaderLink href="/" className={styles.logo}>
        <Image
          src="/img/logo.png"
          height="48"
          width="48"
          alt="logo"
          quality={100}
        />
        <h1>Codetrain</h1>
      </HeaderLink>
      <span className="flexfill" />
      <div className={styles.bigscreen}>
        <HeaderLink href="/" className={styles.link}>Home</HeaderLink>
        <HeaderLink href="/create" className={styles.link}>Create</HeaderLink>
        <HeaderLink href="/explore" className={styles.link}>Explore</HeaderLink>
        <HeaderLink href="/docs" className={styles.link}>Docs</HeaderLink>
      </div>
      <div className={styles.smallscreen}>
        <Tooltip title="Home" arrow>
          <IconButton onClick={() => Router.push('/')}>
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Create" arrow>
          <IconButton onClick={() => Router.push('/create')}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Explore" arrow>
          <IconButton onClick={() => Router.push('/explore')}>
            <ExploreIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Docs" arrow>
          <IconButton onClick={() => Router.push('/docs')}>
            <DescriptionIcon />
          </IconButton>
        </Tooltip>
      </div>
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
