import styles from '../../styles/components/cards/Project.module.css';

export default function Project(props) {
  const { id, title, username } = props;

  return (
    <div className={styles.container}>
      <a href={`/projects/${id}`}>
        <h1>{title}</h1>
      </a>
      <a href={`/users/${username}`}>
        <p>{username}</p>
      </a>
    </div>
  );
}
