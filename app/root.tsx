import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n'; // This import is necessary to initialize i18n, even if not used directly
import { AppProvider } from "@shopify/polaris"; // Import AppProvider

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const changeLanguage = async () => {
      try {
        await i18n.changeLanguage('de');
        console.log('Language changed to German');
      } catch (error) {
        console.error('Failed to change language:', error);
      }
    };

    changeLanguage();
  }, [i18n]);

  return (
    <AppProvider i18n={i18n.services.resourceStore.data}> {/* Pass the translation dictionary */}
      <html lang={i18n.language}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel="preconnect" href="https://cdn.shopify.com/" />
          <link
            rel="stylesheet"
            href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
          />
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </AppProvider>
  );
}