import styles from '../styles/Game.module.css';

export default function Game() {
  return (
    <div className={styles.container}>
      <canvas
        className={styles.screen}
        width={256}
        height={256}
      />
    </div>
  );
}
