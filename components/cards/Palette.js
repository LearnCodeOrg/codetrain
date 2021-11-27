import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import firebase from 'firebase/app';

import styles from '../../styles/components/cards/Palette.module.css';

export default function Palette(props) {
  const { palette, userPalettes } = props;
  const { name, colors, created, uid, id } = palette;

  const currentUser = firebase.auth().currentUser;
  const usersRef = firebase.firestore().collection('users');

  const palettesRef = firebase.firestore().collection('palettes');
  const paletteRef = palettesRef.doc(id);

  // deletes palette from firebase
  async function deletePalette() {
    if (!window.confirm(`Delete palette "${name}"?`)) return;
    props.deletePalette(palette);
    await paletteRef.delete();
  }

  // sets user star status in firebase
  async function setStar(doStar) {
    const palette = { name, colors, id };
    const userRef = usersRef.doc(currentUser.uid);
    await userRef.update({
      palettes:
        doStar ?
        firebase.firestore.FieldValue.arrayUnion(palette) :
        firebase.firestore.FieldValue.arrayRemove(palette)
    });
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
        colors.map((color, i) =>
          <p className={styles.color} style={{ color }}>{color}</p>
        )
      }
      <div className={styles.buttons}>
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
        {
          currentUser?.uid === uid &&
          <button onClick={deletePalette}>
            <DeleteIcon />
          </button>
        }
      </div>
    </div>
  );
}
