import { StrictMode } from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom/client';
import App from './App';
import './index.css';
import { assertIsDefined } from './typeguards';

const root = document.getElementById('root');
assertIsDefined<HTMLElement | null>(root);
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
