import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { wrapper } from '../store';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

// app.getInitialProps = async (context: AppContext) => {
//   const appInitialProps = await App.getInitialProps(context);
// };

export default wrapper.withRedux(app);

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <GlobalStyle />
//       <Header />
//       <Component {...pageProps} />
//       <div id="root-modal" />
//     </>
//   );
// }

// export default MyApp;
