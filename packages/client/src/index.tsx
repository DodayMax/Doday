import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import * as serviceWorker from './serviceWorker';

import '@root/styles/styles.scss';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.render(React.createElement(App), document.getElementById('root'));

serviceWorker.register();
