import styles from '../styles/pages/About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <h1>About</h1>
      <p>Learn. Create. Explore.</p>
      <h2>What is Codetrain?</h2>
      <p>Codetrain is an educational browser game engine. Our goal is to lower
      the barrier of entry into scripted programming languages.</p>
      <h2>What makes Codetrain special?</h2>
      <p>We aim to teach JavaScript, a real-world programming language, in an
      engaging, game-ified environment. Whether you are a programming expert or
      a complete beginner, the Codetrain engine aims to provide just the right
      amount of complexity abstraction to make creating fun.</p>
      <h2>How can I get started?</h2>
      <p>If you are a complete beginner, you can take a look at our Codetrain
      engine tutorials, which will take you through the basics of the JavaScript
      programming language on your way to creating your first games. If you are
      more advanced and looking to jump straight into the engine, you can check
      out our documentation.</p>
      <h2>Can I contribute?</h2>
      <p>
        Codetrain is open source. Want to contribute? Find our GitHub repository
        {' '}
        <a
          href="https://github.com/codeconvoy/codetrain"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </p>
    </div>
  );
}
