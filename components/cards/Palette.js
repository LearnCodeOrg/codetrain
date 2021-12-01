import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Tooltip from '@mui/material/Tooltip';

import firebase from 'firebase/app';

import styles from '../../styles/components/cards/Palette.module.css';

export default function Palette(props) {
  const { palette, userPalettes } = props;
  const { name, colors, created, uid, username, id } = palette;

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
      <div className={styles.palette}>
        {
          colors.map((color, i) =>
            <Tooltip title={color} arrow key={i}>
              <div
                style={{ background: color }}
              />
            </Tooltip>
          )
        }
      </div>
      <h1>{name}</h1>
      <Link href={`/users/${username}`}>
        <a>
          <p>{username}</p>
        </a>
      </Link>
      <div className={styles.buttons}>
        {
          userPalettes &&
          (
            userPalettes.some(palette => palette.id === id) ?
            <button
              className={styles.starbutton}
              onClick={() => setStar(false)}
            >
              <StarIcon />
            </button> :
            <button
              className={styles.starbutton}
              onClick={() => setStar(true)}
            >
              <StarBorderIcon />
            </button>
          )
        }
        {
          currentUser?.uid === uid &&
          <button
            className={styles.deletebutton}
            onClick={deletePalette}
          >
            <DeleteIcon />
          </button>
        }
      </div>
    </div>
  );
}
