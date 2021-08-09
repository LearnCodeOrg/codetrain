import { useState } from 'react';

import styles from '../styles/Frame.module.css';

export default function Frame(props) {
  const { mapPixels } = props;

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
    // game loop
    const _gameLoop = time => {
      // call update
      if (typeof update === 'function') update();
      // continue loop
      requestAnimationFrame(_gameLoop);
    }
    // runs after body has loaded
    const _start = () => {
      // get canvas and context
      _canvas = document.getElementById('canvas-game');
      _ctx = _canvas.getContext('2d');
      // run start function
      if (typeof start === 'function') start();
      // start game loop
      requestAnimationFrame(_gameLoop);
    }
  </script>
</html>
`;

  const [frameSrc, setFrameSrc] = useState(gameSrc);

  return (
    <iframe
      title="game"
      sandbox="allow-scripts"
      srcDoc={frameSrc}
      width={mapPixels}
      height={mapPixels}
      frameBorder="0"
    />
  );
}
