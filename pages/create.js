import Header from '../components/Header';
import Engine from '../components/engine/Engine';

import { useState } from 'react';
import { palettes } from '../data/palettes';
import { tileCount, objectCount, spriteSize, mapSize } from '../data/engine';

import styles from '../styles/pages/Engine.module.css';

// default engine code
const defaultCode =
`// called once when the game starts
function start() {

}

// called every frame
function update() {

}
`;

export default function Create(props) {
  const { username } = props;

  // engine defaults
  const codes = Array(objectCount).fill(defaultCode);
  const objectNames = Array(objectCount).fill(0).map((val, i) => `Object ${i}`);
  const sprite = Array(spriteSize * spriteSize).fill(0);
  const colors = palettes[0].colors;
  const tiles = Array(tileCount).fill(sprite);
  const objects = Array(objectCount).fill(sprite);
  const background = Array(mapSize * mapSize).fill(0);

  // construct engine data
  const data = {
    codes, colors, background, gameObjects: [], title: '', description: '',
    objectNames, tiles: JSON.stringify(tiles), objects: JSON.stringify(objects)
  };

  return (
    <div className={styles.container}>
      <Header username={username} reload />
      <Engine data={data} {...props} />
    </div>
  );
}
