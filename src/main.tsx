import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
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
