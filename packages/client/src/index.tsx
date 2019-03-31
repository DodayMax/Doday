import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '@components';
import * as serviceWorker from './serviceWorker';

import '@root/styles/styles.scss';

ReactDOM.render(React.createElement(App), document.getElementById('root'));

serviceWorker.register();
