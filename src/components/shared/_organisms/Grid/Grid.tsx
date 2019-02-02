import * as React from 'react';
import { observer } from 'mobx-react';
import { Doday, dodayStore } from '@stores';
import './grid.scss';

@observer
export class Grid extends React.Component {
  componentDidMount() {
    dodayStore.fetchActiveDodays();
  }

  render() {
    return (
      <ul className="grid__container">
        {
          dodayStore.dodays.map((doday: Doday) => (
            <li
              className="grid__cell"
              key={doday.id}
            ><input type="checkbox" onChange={e => dodayStore.completeDoday(doday.id)} />{doday.name}<button onClick={() => dodayStore.removeDoday(doday.id)}>x</button></li>))}
      </ul>
    );
  }
}