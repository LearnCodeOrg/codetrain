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
