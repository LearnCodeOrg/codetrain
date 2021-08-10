import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';

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
  <body onload="start()">
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
    const sprites = [
      ${codes.map((code, i) => getCodeFunction(code, i)).join(',\n')}
    ];
    // canvas functions
    let canvas, ctx;
    // game loop
    function gameLoop(time) {
      // run update functions
      sprites.forEach(sprite => sprite.update());
      // continue loop
      requestAnimationFrame(gameLoop);
    }
    // runs after body has loaded
    function start() {
      // get canvas and context
      canvas = document.getElementById('canvas-game');
      ctx = canvas.getContext('2d');
      // run start functions
      sprites.forEach(sprite => sprite.start());
      // start game loop
      requestAnimationFrame(gameLoop);
    }
  </script>
</html>
`;

  // downloads game as an html file
  function downloadGame() {
    const link = document.createElement('a');
    link.download = 'game.html';
    link.href = `data:text/html;charset=utf-8,${encodeURIComponent(gameSrc)}`;
    link.click();
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={downloadGame}
      >
        <GetAppIcon />
      </Button>
      <iframe
        title="game"
        sandbox="allow-scripts"
        srcDoc={gameSrc}
        width={mapPixels}
        height={mapPixels}
        frameBorder="0"
      />
    </>
  );
}
