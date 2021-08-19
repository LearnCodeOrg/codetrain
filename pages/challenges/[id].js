import Loading from '../../components/Loading.js';
import Frame from '../../components/Frame.js';

import dynamic from 'next/dynamic';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

export default function Challenge() {
  const [code, setCode] = useState('');
  const [data, setData] = useState(undefined);

  // get challenge id
  const router = useRouter();
  const { id } = router.query;

  // retrieves challenge data from firebase
  async function getChallengeData() {
    // return if no id
    if (!id) return;
    // get challenge data
    const challengeRef = firebase.firestore().collection('challenges').doc(id);
    const challengeDoc = await challengeRef.get();
    const challengeData = challengeDoc.exists ? challengeDoc.data() : null;
    // set challenge data
    setData(challengeData);
    if (challengeData?.code) setCode(challengeData.code);
  }

  // get challenge data on start
  useEffect(() => {
    getChallengeData();
  }, [id]);

  // return if invalid data
  if (data === undefined) return <Loading />;
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
      />
    </div>
  );
}
