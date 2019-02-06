import * as React from 'react';
import { observer } from 'mobx-react';
import { PullToRefresh, PullDownContent, ReleaseContent } from "react-js-pull-to-refresh";
import { Loader } from '@components';
import { Doday, dodayStore } from '@stores';
import './grid.scss';

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
      <div className="grid__container">
        <PullToRefresh
          pullDownContent={<PullDownContent />}
          releaseContent={<ReleaseContent />}
          refreshContent={<Loader />}
          pullDownThreshold={80}
          onRefresh={this.handleRefresh}
          triggerHeight={200}
          backgroundColor='white'
        >
          <ul>
            {dodayStore.dodays.map((doday: Doday) => (
              <li
                className="grid__cell"
                key={doday.id}
              ><input type="checkbox" onChange={(e) => dodayStore.completeDoday(doday.id)} checked={doday.completed} />{doday.name}</li>))}
          </ul>
        </PullToRefresh>
      </div>
    );
  }
}