import Frame from '../../components/Frame.js';

import dynamic from 'next/dynamic';
import firebase from 'firebase/app';
import { useState } from 'react';
import { palettes } from '../../data/palettes.js';

const Editor = dynamic(import('../../components/Editor.js'), { ssr: false });

// units
const mapPixels = 512;
const mapSize = 8;
const spriteSize = 8;
const spritePixels = Math.floor(mapPixels / mapSize);
const pixelPixels = Math.floor(spritePixels / spriteSize);

// data
const colors = palettes[0].colors;
const tiles = [Array(8 ** 2).fill(0)];
const objects = [Array(8 ** 2).fill(3)];
const background = Array(mapSize ** 2).fill(0);

export default function Challenge(props) {
  const { data } = props;

  const [code, setCode] = useState(data?.code ?? '');

  // return if invalid data
  if (!data) return <div>Challenge not found</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <Editor
        value={code}
        onChange={val => setCode(val)}
      />
      <Frame
        mapPixels={mapPixels}
        spritePixels={spritePixels}
        pixelPixels={pixelPixels}
        codes={[code]}
        colors={colors}
        tiles={tiles}
        objects={objects}
        background={background}
        gameObjects={[{ sprite: 0, ...data.object }]}
        spriteSize={spriteSize}
        mapSize={mapSize}
        isChallenge
      />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps(props) {
  // get challenge data
  const challengeId = props.params.id;
  const challengesRef = firebase.firestore().collection('challenges');
  const challengeRef = challengesRef.doc(challengeId);
  const challengeDoc = await challengeRef.get();
  const challengeData = challengeDoc.exists ?
  { ...challengeDoc.data(), id: challengeId } : undefined;
  // return challenge data
  return {
    props: { data: challengeData },
    revalidate: 60
  };
}
