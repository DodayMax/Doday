import * as React from 'react';
import * as Loadable from 'react-loadable';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const LoadableComponent = Loadable({
  loader: () => import('./mobile-shell'),
  loading: () => <div>Loading...</div>,
});

export class Shell extends React.Component {
  render() {
    return (
      <Router>
        <div className="shell_container">
          <Route path="/" component={LoadableComponent} />
        </div>
      </Router>
    );
  }
}

export default Shell;
