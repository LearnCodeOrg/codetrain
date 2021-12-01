import Header from '../components/Header';
import Loading from '../components/Loading';
import Projects from '../components/Projects';
import Users from '../components/Users';
import Palettes from '../components/Palettes';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import PaletteIcon from '@mui/icons-material/Palette';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/pages/Explore.module.css';

export default function Explore(props) {
  const { userData } = props;

  const [tab, setTab] = useState(undefined);

  // get current tab
  const router = useRouter();

  // set tab when query changed
  useEffect(() => {
    if (router.isReady) setTab(router.query.tab ?? 'projects');
  }, [router.isReady]);

  // selects given tab
  function selectTab(newTab) {
    setTab(newTab);
    router.push(`/explore?tab=${newTab}`);
  }

  return (
    <div className={styles.container}>
      <Header {...props} />
      <h1><ExploreIcon fontSize="large" />Explore</h1>
      {
        tab === undefined ?
        <Loading /> :
        <>
          <div className={styles.tabs}>
            <button
              className={tab === 'projects' ? styles.selected : null}
              onClick={() => selectTab('projects')}
            >
              <VideogameAssetIcon />
              <span>Projects</span>
            </button>
            <button
              className={tab === 'users' ? styles.selected : null}
              onClick={() => selectTab('users')}
            >
              <PersonIcon />
              <span>Users</span>
            </button>
            <button
              className={tab === 'palettes' ? styles.selected : null}
              onClick={() => selectTab('palettes')}
            >
              <PaletteIcon />
              <span>Palettes</span>
            </button>
          </div>
          <div className={styles.content}>
            {(!tab || tab === 'projects') && <Projects />}
            {tab === 'users' && <Users />}
            {tab === 'palettes' && <Palettes userPalettes={userData?.palettes} />}
          </div>
        </>
      }
    </div>
  );
}
