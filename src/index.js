import { createRoot } from 'react-dom/client';
import netlifyIdentity from 'netlify-identity-widget';

import App from './app';

import './index.css';

window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
