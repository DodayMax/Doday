import * as React from 'react';
import { observer } from 'mobx-react';
import { PullToRefresh, PullDownContent, ReleaseContent } from "react-js-pull-to-refresh";
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
      <div style={{ marginTop: '1rem' }}>
        <PullToRefresh
          pullDownContent={<PullDownContent />}
          releaseContent={<ReleaseContent />}
          refreshContent={<Loader />}
          pullDownThreshold={80}
          onRefresh={this.handleRefresh}
          triggerHeight={200}
          backgroundColor='white'
        >
          <div className="grid__container">
            <ul>
              {dodayStore.dodays.map((doday: Doday) => (
                <li
                  className="grid__cell"
                  key={doday.id}
                >
                  <input type="checkbox" className="grid__cell--checkbox" onChange={(e) => dodayStore.completeDoday(doday.id)} checked={doday.completed} />
                  <span className="grid__cell--title">{doday.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </PullToRefresh>
      </div>
    );
  }
}