import Header from '../components/Header';
import Loading from '../components/Loading';
import Projects from '../components/Projects';
import Users from '../components/Users';
import Palettes from '../components/Palettes';
import ExploreIcon from '@mui/icons-material/Explore';

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
            {
              ['projects', 'users', 'palettes'].map((name, i) =>
                <button
                  className={tab === name ? styles.selected : null}
                  onClick={() => selectTab(name)}
                  key={i}
                >
                  {name[0].toUpperCase() + name.slice(1)}
                </button>
              )
            }
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
