import Header from '../components/Header';
import Projects from '../components/Projects';
import Users from '../components/Users';
import Palettes from '../components/Palettes';
import ExploreIcon from '@mui/icons-material/Explore';

import { useState } from 'react';

import styles from '../styles/pages/Explore.module.css';

export default function Explore(props) {
  const { userData } = props;

  const [tab, setTab] = useState(undefined);

  // get current tab
  const router = useRouter();
  const queryTab = router.query.tab;

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
        {mode === 'projects' && <Projects />}
        {mode === 'users' && <Users />}
        {mode === 'palettes' && <Palettes userPalettes={userData?.palettes} />}
      </div>
    </div>
  );
}
