import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ReactLenis } from 'lenis/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactLenis root options={{ autoRaf: true, anchors: true }}>
      <App />
      <SpeedInsights />
    </ReactLenis>
  </StrictMode>,
);
