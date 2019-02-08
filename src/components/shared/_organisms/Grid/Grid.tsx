import * as React from 'react';
import { observer } from 'mobx-react';
import Pullable from 'react-pullable';
import { Loader } from '@components';
import { Doday, dodayStore } from '@stores';

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
    return (
      <div id="grid" className="grid__container">
        <Pullable
          shouldPullToRefresh={() => document.getElementById('grid')!.scrollTop <= 0}
          onRefresh={() => this.handleRefresh()}
        >
          {dodayStore.dodays.map((doday: Doday) => (
            <li
              className="grid__cell"
              key={doday.id}
            >
              <input type="checkbox" className="grid__cell--checkbox" onChange={(e) => dodayStore.completeDoday(doday.id)} checked={doday.completed} />
              <span className="grid__cell--title">{doday.name}</span>
            </li>
          ))}
        </Pullable>
      </div>
    );
  }
}