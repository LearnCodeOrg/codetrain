import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import firebase from 'firebase/app';

import styles from '../../styles/components/cards/Palette.module.css';

export default function Palette(props) {
  const { name, colors, created, uid, id, userPalettes } = props;

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
        currentUser?.uid === uid &&
        <button onClick={deletePalette}>
          <DeleteIcon />
        </button>
      }
      {
        userPalettes &&
        (
          userPalettes.some(palette => palette.id === id) ?
          <button onClick={() => setStar(false)}>
            <StarIcon />
          </button> :
          <button onClick={() => setStar(true)}>
            <StarBorderIcon />
          </button>
        )
      }
    </div>
  );
}
