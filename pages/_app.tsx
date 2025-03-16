import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../app/store';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import ThemeProviderWithToggle from "../theme";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { industrialGlobalStyles } from "../styles/globalStyles";
import createEmotionCache from '../utils/createEmotionCache';
import ScrollProvider from '../providers/ScrollProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: typeof clientSideEmotionCache;
}

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add service worker registration
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
          console.error('Service worker registration failed:', err);
        });
      });
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeProviderWithToggle>
          <ScrollProvider>
            <CssBaseline />
            {industrialGlobalStyles}
            {mounted && (
              <>
                <ScrollToTop />
                <Header />
                <Component {...pageProps} />
                <Footer />
              </>
            )}
          </ScrollProvider>
        </ThemeProviderWithToggle>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
