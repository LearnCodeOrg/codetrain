import styles from '../styles/Canvas.module.css';

// canvas width and height
const width = 512;
const height = 512;

// iframe source
const srcDoc = `
<html>
  <body></body>
  <style></style>
  <script></script>
</html>
`;

export default function Canvas() {
  return (
    <div>
      <iframe
        title="canvas"
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        width={width}
        height={height}
      />
    </div>
  );
}
