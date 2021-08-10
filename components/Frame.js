import styles from '../styles/Frame.module.css';

export default function Frame(props) {
  const { mapPixels, codes } = props;

  // returns function definition for given code
  function getCodeFunction(code, i) {
    return (
`(function() {
  ${code}
  return {
    start: typeof start === 'function' ? start : () => {},
    update: typeof update === 'function' ? update : () => {}
  };
})()`);
  }

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
    // sprites
    const _sprites = [
      ${codes.map((code, i) => getCodeFunction(code, i)).join(',\n')}
    ];
    // canvas functions
    let _canvas, _ctx;
    // game loop
    const _gameLoop = time => {
      // run update functions
      _sprites.forEach(sprite => sprite.update());
      // continue loop
      requestAnimationFrame(_gameLoop);
    }
    // runs after body has loaded
    const _start = () => {
      // get canvas and context
      _canvas = document.getElementById('canvas-game');
      _ctx = _canvas.getContext('2d');
      // run start functions
      _sprites.forEach(sprite => sprite.start());
      // start game loop
      requestAnimationFrame(_gameLoop);
    }
  </script>
</html>
`;

  return (
    <iframe
      title="game"
      sandbox="allow-scripts"
      srcDoc={gameSrc}
      width={mapPixels}
      height={mapPixels}
      frameBorder="0"
    />
  );
}
