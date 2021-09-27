import Loading from '../../components/Loading.js';
import LearnEngine from '../../components/engine/LearnEngine.js';

import dynamic from 'next/dynamic';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { palettes } from '../../data/palettes.js';

// units
const mapPixels = 512;
const mapSize = 8;
const spriteSize = 8;
const spritePixels = Math.floor(mapPixels / mapSize);
const pixelPixels = Math.floor(spritePixels / spriteSize);

export default function Challenge() {
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
  }

  // get challenge data on start
  useEffect(() => {
    getChallengeData();
  }, [id]);

  // return if invalid data
  if (data === undefined) return <Loading />;
  if (!data) return <div>Challenge not found</div>;

  return (
    <LearnEngine
      mapPixels={mapPixels}
      spritePixels={spritePixels}
      pixelPixels={pixelPixels}
      spriteSize={spriteSize}
      mapSize={mapSize}
      data={data}
    />
  );
}
