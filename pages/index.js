import Game from '../components/Game.js';
import Guide from '../components/Guide.js';
import Sprites from '../components/Sprites.js';

import dynamic from 'next/dynamic';

import styles from '../styles/Index.module.css';

const Code = dynamic(import('../components/Code.js'), { ssr: false });

export default function Index() {
  return (
    <div className={styles.container}>
      <Guide />
      <Code />
      <Sprites />
      <Game />
    </div>
  );
}
