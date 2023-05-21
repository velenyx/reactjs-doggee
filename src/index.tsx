import ReactDOM from 'react-dom/client';

import { App } from './App';

import './static/css/global.css';
import './index.css';
import './static/css/fonts.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
