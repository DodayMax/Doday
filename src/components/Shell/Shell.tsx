import * as React from 'react';
import { observer } from 'mobx-react';
import * as Loadable from 'react-loadable';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { DodayTopBar } from '@components';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';

const LoadableComponent = Loadable({
  loader: () => import('./mobile-shell'),
  loading: () => <div>Loading...</div>,
})

@observer
export class Shell extends React.Component {
  render() {
    return (
      <Router>
        <div className="shell_container">
          <DodayTopBar coins={50} energy={8} />
          <Route path="/" component={LoadableComponent} />
        </div>
      </Router>
    );
  }
}

export default Shell;
