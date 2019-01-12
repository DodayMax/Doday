import * as React from 'react';
import { observer } from 'mobx-react';
import { Doday, dodayStore } from '../../stores';

@observer
class Grid extends React.Component {
  componentDidMount() {
    dodayStore.fetchActiveDodays();
  }

  render() {
    return (
      <div>
        Dodays
        <div>
          {
            dodayStore.dodays.map((doday: Doday) => (
            <li
              key={doday.id}
              onClick={() => dodayStore.toggleDoday(doday.id)}
            >{doday.name}</li>))}
        </div>
      </div>
    );
  }
}

export default Grid;