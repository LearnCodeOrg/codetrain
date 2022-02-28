import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import DescriptionIcon from '@mui/icons-material/Description';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import firebase from 'firebase/app';
import signInWithGoogle from '../util/signInWithGoogle.js';
import { useState } from 'react';

import styles from '../styles/components/Header.module.css';

export default function Header(props) {
  const { userData, reload, setupUser } = props;

  const [anchor, setAnchor] = useState(undefined);

  const username = userData?.username;

  const authReady = userData === null || userData;

  // called when menu closes
  function closeMenu() {
    setAnchor(undefined);
  }

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
        <HeaderLink href="/create" className={styles.link}>Create</HeaderLink>
        <HeaderLink href="/explore" className={styles.link}>Explore</HeaderLink>
        <HeaderLink href="/docs" className={styles.link}>Docs</HeaderLink>
      </div>
      <div className={styles.smallscreen}>
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
      <IconButton onClick={e => setAnchor(e.currentTarget)}>
        {
          (userData === null || userData) ?
          <PersonIcon /> :
          <PersonOutlineIcon />
        }
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={closeMenu}
      >
        {
          username &&
          <MenuItem onClick={() => {
            closeMenu();
            Router.push(`/users/${username}`);
          }}>Profile </MenuItem>
        }
        {
          authReady &&
          <MenuItem onClick={() => {
            closeMenu();
            firebase.auth().signOut();
          }}>Sign Out</MenuItem>
        }
        {
          !authReady &&
          <MenuItem onClick={() => {
            closeMenu();
            signInWithGoogle(setupUser);
          }}>Sign In</MenuItem>}
      </Menu>
    </div>
  );
}
