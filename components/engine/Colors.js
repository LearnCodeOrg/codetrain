import Modal from '../Modal';
import ColorizeIcon from '@mui/icons-material/Colorize';
import SaveIcon from '@mui/icons-material/Save';

import { useState } from 'react';
import { defaultColors, defaultPalettes } from '../../data/palettes';
import firebase from 'firebase/app';

import styles from '../../styles/components/engine/Colors.module.css';

export default function Colors(props) {
  const { colors, setColors, currColor, setCurrColor } = props;

  const [palette, setPalette] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  const uid = firebase.auth().currentUser?.uid;
  const palettesRef = firebase.firestore().collection('palettes');

  // updates current color with given value
  function updateColor(val) {
    const newColors = colors.slice();
    newColors[currColor] = val;
    setColors(newColors);
  }

  // creates a new palette in firebase
  async function savePalette() {
    setModalOpen(false);
    await palettesRef.add({
      uid, colors, name,
      created: new Date().getTime()
    });
  }

  // resets modal data
  function resetModal() {
    setName('');
  }

  return (
    <div className={styles.container} onKeyDown={e => e.stopPropagation()}>
      <div className={styles.tilegrid}>
        {
          colors.map((color, i) =>
            <div
              onClick={() => setCurrColor(i)}
              className={
                currColor === i ?
                `${styles.tile} ${styles.selected}` :
                styles.tile
              }
              style={{ background: color }}
              key={i}
            />
          )
        }
      </div>
      <div className={styles.toolbar}>
        <label className={styles.colorinput}>
          <ColorizeIcon />
          <input
            type="color"
            value={colors[currColor]}
            onChange={e => updateColor(e.target.value)}
          />
        </label>
        <select
          className="grayinput"
          value={palette}
          onChange={e => {
            const newPalette = e.target.value;
            setPalette(newPalette);
            setColors(palettes[newPalette].colors);
          }}
        >
          <option value="">Default</option>
        </select>
        {
          firebase.auth().currentUser &&
          <button onClick={() => {
            resetModal();
            setModalOpen(true);
          }}>
            <SaveIcon />
          </button>
        }
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <h1>New Palette</h1>
        <div className={styles.palette}>
          {
            colors.map((color, i) =>
              <div
                style={{ background: color }}
                key={i}
              />
            )
          }
        </div>
        <form onSubmit={e => {
          e.preventDefault();
          savePalette();
        }}>
          <input
            placeholder="palette name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <button>Save Palette</button>
        </form>
      </Modal>
    </div>
  );
}
