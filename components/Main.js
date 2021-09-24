import Header from './Header.js';

export default function Main(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Header />
      <div style={{ height: 60 }} />
      <Component {...pageProps} />
    </>
  );
}
