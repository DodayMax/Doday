import * as React from 'react';
import { observer } from 'mobx-react';
import Pullable from 'react-pullable';
import { Loader } from '@components';
import { Doday, dodayStore, globalUIStore } from '@stores';

@observer
export class Grid extends React.Component {
  handleRefresh = () => {
    console.log('refreshing');
    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
    return promise;
  }

  render() {
    const classes = `grid__container ${globalUIStore.isDrawerShown || globalUIStore.isBuilderShown ? 'locked' : ''}`;
    return (
      <div id="grid" className={classes}>
        <Pullable
          shouldPullToRefresh={() => document.getElementById('grid')!.scrollTop <= 0 && !globalUIStore.isDrawerShown && !globalUIStore.isBuilderShown}
          onRefresh={() => this.handleRefresh()}
        >
          {dodayStore.dodays.map((doday: Doday) => (
            <li
              className="grid__cell"
              key={doday.id}
            >
              {!dodayStore.loading && <input type="checkbox" className="grid__cell--checkbox" onChange={(e) => dodayStore.completeDoday(doday.id)} checked={doday.completed} />}
              {dodayStore.loading && <Loader />}
              <span className="grid__cell--title">{doday.name}</span>
            </li>
          ))}
        </Pullable>
      </div>
    );
  }
}