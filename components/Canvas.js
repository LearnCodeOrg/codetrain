import styles from '../styles/Canvas.module.css';

export default function Canvas() {
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
