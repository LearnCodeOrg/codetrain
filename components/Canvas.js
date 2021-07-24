import styles from '../styles/Canvas.module.css';

// canvas width and height
const width = 512;
const height = 512;

// iframe source
const srcDoc = `
<html>
  <body>
    <canvas
      id="canvas"
      width=${width}
      height=${height}
    />
  </body>
  <style>
    body {
      background: #fff;
      margin: 0;
      overflow: hidden;
    }
  </style>
  <script>
    // initialize canvas
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
  </script>
</html>
`;

export default function Canvas() {
  return (
    <div className={styles.container}>
      <iframe
        className={styles.frame}
        title="canvas"
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        width={width}
        height={height}
      />
    </div>
  );
}
