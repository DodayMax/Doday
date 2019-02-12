import * as React from 'react';
import { observer } from 'mobx-react';
import * as Loadable from 'react-loadable';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';

const LoadableComponent = Loadable({
  loader: () => import('./MobileShell'),
  loading: () => <div>Loading...</div>,
})

@observer
export class Shell extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={LoadableComponent} />
        </div>
      </Router>
    );
  }
}

export default Shell;
