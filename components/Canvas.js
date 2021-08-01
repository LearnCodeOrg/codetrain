import styles from '../styles/Canvas.module.css';

// canvas width and height
const width = 256;
const height = 256;

export default function Canvas() {
  return (
    <div className={styles.container}>
      <canvas
        className={styles.canvas}
        width={width}
        height={height}
      />
    </div>
  );
}
