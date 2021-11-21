import Header from '../components/Header';
import Engine from '../components/engine/Engine';

import { useState } from 'react';
import { palettes } from '../data/palettes';
import { defaultData } from '../data/engine';

import styles from '../styles/pages/Create.module.css';

export default function Create(props) {
  return (
    <div className={styles.container}>
      <Header {...props} reload />
      <Engine data={defaultData} {...props} />
    </div>
  );
}
