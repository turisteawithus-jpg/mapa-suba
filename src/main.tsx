import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ClerkProviderWrapper } from '@/components/ClerkProvider';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ClerkProviderWrapper>
        <App />
      </ClerkProviderWrapper>
    </HashRouter>
  </StrictMode>
);
