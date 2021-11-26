import DeleteIcon from '@mui/icons-material/Delete';

import firebase from 'firebase/app';

import styles from '../../styles/components/cards/Palette.module.css';

export default function Palette(props) {
  const { name, colors, created, uid, id } = props;

  // deletes palette from firebase
  async function deletePalette() {
    if (!window.confirm(`Delete palette "${name}"?`)) return;
    await firebase.firestore().collection('palettes').doc(id).delete();
  }

  return (
    <div className={styles.container}>
      <p>{name}</p>
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
      {
        firebase.auth().currentUser?.uid === uid &&
        <button onClick={deletePalette}>
          <DeleteIcon />
        </button>
      }
    </div>
  );
}
