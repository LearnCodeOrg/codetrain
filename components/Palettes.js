import Palette from './cards/Palette';
import Loading from './Loading';

import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

import styles from '../styles/components/Palettes.module.css';

export default function Palettes() {
  const [palettes, setPalettes] = useState(undefined);

  // retrieves palettes from firebase
  async function getPalettes() {
    const palettesRef = firebase.firestore().collection('palettes');
    const palettesQuery = palettesRef.orderBy('created', 'desc');
    const palettesDocs = (await palettesQuery.get()).docs;
    setPalettes(palettesDocs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  // get palettes on start
  useEffect(() => {
    getPalettes();
  }, []);

  // return if loading
  if (!palettes) return <Loading />;

  return (
    <div className={styles.container}>
      {
        palettes.map(palette =>
          <Palette {...palette} key={palette.id} />
        )
      }
    </div>
  );
}
