import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AboutUsPage } from './about/AboutUsPage';
import { LanguageProvider } from './i18n';
import { GetQuotePage } from './quote/GetQuotePage';
import { ServicesPage } from './services/ServicesPage';
import { HelpSupportPage } from './support/HelpSupportPage';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element "#root" was not found in the document.');
}

const basePath = import.meta.env.BASE_URL;
let route = window.location.pathname;
if (route.startsWith(basePath)) {
  route = route.slice(basePath.length);
}
route = route.replace(/^\/+|\/+$/g, '');

let page = (
  <LanguageProvider>
    <App />
  </LanguageProvider>
);

if (route === 'about-us') {
  page = <AboutUsPage />;
} else if (route === 'services') {
  page = <ServicesPage />;
} else if (route === 'get-quote') {
  page = <GetQuotePage />;
} else if (route === 'help-support') {
  page = <HelpSupportPage />;
}

createRoot(rootElement).render(
  <StrictMode>
    {page}
  </StrictMode>,
);
