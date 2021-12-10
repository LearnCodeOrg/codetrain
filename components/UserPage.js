import Loading from './Loading';

import firebase from 'firebase/app';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/UserPage.module.css';

export default function UserPage(props) {
  const { user } = props;

  // listen for user data
  const userRef = firebase.firestore().collection('users').doc(user);
  const [userData] = useDocumentData(userRef);

  // return if loading
  if (!userData) return <Loading />;

  return (
    <div className={styles.content}>
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
            <p>{description ?? userData.description}</p>
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
            !feat ?
            <p>No project featured</p> :
            projects
            .filter(project => project.id === feat)
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
