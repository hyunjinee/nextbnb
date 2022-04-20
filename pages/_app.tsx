import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { wrapper } from '../store';
import { cookieStringToObject } from '../lib/utils';
import axios from '../lib/api';
import { meAPI } from '../lib/api/auth';

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

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  // console.log(context.ctx.req?.headers.cookie);
  const cookieObject = cookieStringToObject(
    context.ctx.req?.headers.cookie as string
  );
  // console.log(cookieObject);
  const { store } = context.ctx;
  const { isLogged } = store.getState().user;
  try {
    if (!isLogged && cookieObject.access_token) {
      axios.defaults.headers.cookie = cookieObject.access_token;
      const { data } = await meAPI();
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }

  return { ...appInitialProps };
};

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
