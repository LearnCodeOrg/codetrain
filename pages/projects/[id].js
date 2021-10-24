import Link from 'next/link';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import GameFrame from '../../components/GameFrame';

import dynamic from 'next/dynamic';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { palettes } from '../../data/palettes';
import { spriteSize, mapSize } from '../../data/engine';
import { insertObjectUnits } from '../../util/objectUnits';

import styles from '../../styles/pages/Project.module.css';

// units
const mapPixels = 512;
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
  useEffect(() => {
    getProjectData();
  }, [id]);

  // return if invalid data
  if (data === undefined) return <Loading />;
  if (!data) return <div>Project not found</div>;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <div className={styles.center}>
          <h1>{data.title}</h1>
          <p className={styles.description}>{data.description}</p>
          <p className={styles.editlink}>
            <Link href={`/edit/${id}`}>
              <a className="link">Edit</a>
            </Link>
          </p>
          <GameFrame
            mapPixels={mapPixels}
            spritePixels={spritePixels}
            pixelPixels={pixelPixels}
            codes={data.codes}
            colors={data.colors}
            tiles={JSON.parse(data.tiles)}
            objects={JSON.parse(data.objects)}
            background={data.background}
            gameObjects={insertObjectUnits(data.gameObjects, pixelPixels)}
          />
        </div>
      </div>
    </div>
  );
}
