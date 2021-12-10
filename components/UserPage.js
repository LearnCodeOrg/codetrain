import Loading from './Loading';
import Project from './cards/Project';

import firebase from 'firebase/app';
import { useDocumentData, useCollectionData
} from 'react-firebase-hooks/firestore';
import { useState } from 'react';

import styles from '../styles/components/UserPage.module.css';

export default function UserPage(props) {
  const { user } = props;

  const [editing, setEditing] = useState(false);

  const uid = firebase.auth().currentUser?.uid;

  const ownPage = uid === user;

  // listen for user data
  const userRef = firebase.firestore().collection('users').doc(user);
  const [userData] = useDocumentData(userRef);

  // listen for user projects
  const projectsRef = firebase.firestore().collection('projects');
  const projectsQuery = projectsRef.where('uid', '==', user)
  .orderBy('modified', 'desc');
  const [projects] = useCollectionData(projectsQuery, { idField: 'id' });

  // updates photo in firebase
  async function updatePhoto(photo) {
    const photoRef = firebase.storage().ref(`/photos/${uid}`);
    await photoRef.put(photo);
    const url = await photoRef.getDownloadURL();
    await usersRef.doc(uid).update({ photo: url });
  }

  // return if loading
  if (!userData) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.title}>
          {
            ownPage ?
            <label>
              <img src={userData.photo} />
              <input
                type="file"
                accept="image/*"
                onChange={e => updatePhoto(e.target.files[0])}
                hidden={true}
              />
            </label> :
            <img src={userData.photo} />
          }
          <div>
            <h1>{userData.username}</h1>
            <p>
              Joined
              {' '}
              {
                new Date(userData.joined)
                .toLocaleDateString(undefined, { month: 'long' })
              }
              {' '}
              {new Date(userData.joined).getFullYear()}
            </p>
          </div>
        </div>
        <div className={styles.description}>
          {
            editing ?
            <input
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength="2048"
            /> :
            <p>{userData.description}</p>
          }
          {
            ownPage &&
            (
              editing ?
              <button onClick={() => {
                updateDescription();
                setEditing(false);
              }}>
                <SaveIcon />
              </button> :
              <button onClick={() => {
                if (description === undefined) {
                  setDescription(userData.description ?? '');
                }
                setEditing(true);
              }}>
                <EditIcon />
              </button>
            )
          }
        </div>
      </div>
      {
        !projects ?
        <Loading /> :
        !projects.length ?
        <p>No projects yet</p> :
        <div className={styles.main}>
          <p>Featured Project</p>
          {
            ownPage &&
            <select
              value={feat}
              onChange={e => {
                const project = e.target.value;
                setFeatured(project);
                updateFeatured(project);
              }}
            >
              <option value=""></option>
              {
                projects.map(project =>
                  <option
                    value={project.id}
                    key={project.id}
                  >
                    {project.title}
                  </option>
                )
              }
            </select>
          }
          {
            !userData.featured ?
            <p>No project featured</p> :
            projects
            .filter(project => project.id === userData.featured)
            .map(project =>
              <Project {...project} key={project.id} />
            )
          }
          <div className={styles.projects}>
            {
              projects ?
              !projects.length ?
              <p>No projects yet</p> :
              projects.map(project =>
                <Project {...project} key={project.id} />
              ) :
              <Loading />
            }
          </div>
        </div>
      }
    </div>
  );
}
