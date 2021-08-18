import Loading from '../../components/Loading.js';
import Frame from '../../components/Frame.js';

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

export default function Project() {
  const [data, setData] = useState(undefined);

  // get project id
  const router = useRouter();
  const { id } = router.query;

  // retrieves project data from firebase
  async function getProjectData() {
    // return if no id
    if (!id) return;
    // get and set project data
    const projectRef = firebase.firestore().collection('projects').doc(id);
    const projectDoc = await projectRef.get();
    setData(projectDoc.exists ? projectDoc.data() : null);
  }

  // get project data on start
  useEffect(getProjectData, [id]);

  // return if invalid data
  if (data === undefined) return <Loading />;
  if (!data) return <div>Project not found</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <Frame
        mapPixels={mapPixels}
        spritePixels={spritePixels}
        pixelPixels={pixelPixels}
        spriteSize={spriteSize}
        mapSize={mapSize}
        codes={data.codes}
        colors={data.colors}
        tiles={data.tiles}
        objects={data.objects}
        background={data.background}
        gameObjects={data.gameObjects}
      />
    </div>
  );
}
