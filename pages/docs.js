import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

import styles from '../styles/pages/Docs.module.css';

function Code(props) {
  return (
    <pre>
      <code className="language-javascript">
        {props.children}
      </code>
    </pre>
  );
}

export default function Docs() {
  // initialize hljs on start
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.highlightAll();
  }, []);

  return (
    <div className={styles.container}>
      <Drawer
        sx={{
          width: 256,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 256,
            boxSizing: 'border-box',
            top: 60,
            zIndex: 0
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
        </List>
      </Drawer>
      <div>
        <h1>Docs</h1>
        <h2 id="gameloop">Game Loop</h2>
        <Code>
{`// called once when the game starts
function start() {}

// called every frame
function update() {}
`}
        </Code>
        <h3>Examples</h3>
        <Code>
{`let frames = 0;

function start() {
  console.log(frames); // 0
}

function update() {
  frames += 1;
}`}
        </Code>
      </div>
    </div>
  )
}
