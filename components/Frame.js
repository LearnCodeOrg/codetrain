import { useState } from 'react';

import styles from '../styles/Frame.module.css';

const emptySrc =
`<html>
  <body></body>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #fff;
    }
  </style>
</html>
`;

export default function Frame() {
  const gameSrc =
`<html>
  <body onload="_start()">
    <canvas
      id="canvas-game"
      width=${mapPixels}
      height=${mapPixels}
    />
  </body>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #fff;
    }
  </style>
  <script>
    // canvas functions
    let _canvas, _ctx;
    // runs after body has loaded
    const _start = () => {
      // get canvas and context
      _canvas = document.getElementById('canvas-game');
      _ctx = _canvas.getContext('2d');
    }
  </script>
</html>
`;

  const [frameSrc, setFrameSrc] = useState(emptySrc);

  return (
    <iframe
      title="game"
      sandbox="allow-scripts"
      srcDoc={frameSrc}
      width="256"
      height="256"
      frameBorder="0"
    />
  );
}
