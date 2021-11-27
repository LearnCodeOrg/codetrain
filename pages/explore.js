import Header from '../components/Header';
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
  const queryTab = router.query.tab;

  // set tab when query changed
  useEffect(() => {
    setTab(queryTab);
  }, [queryTab]);

  return (
    <div className={styles.container}>
      <Header {...props} />
      <h1><ExploreIcon fontSize="large" />Explore</h1>
      <div className={styles.options}>
        <select
          value={tab}
          onChange={e => {
            const newTab = e.target.value;
            setTab(newTab);
            router.push(`/explore?tab=${newTab}`);
          }}
        >
          <option value="projects">Projects</option>
          <option value="users">Users</option>
          <option value="palettes">Palettes</option>
        </select>
      </div>
      <div className={styles.content}>
        {(!tab || tab === 'projects') && <Projects />}
        {tab === 'users' && <Users />}
        {tab === 'palettes' && <Palettes userPalettes={userData?.palettes} />}
      </div>
    </div>
  );
}
