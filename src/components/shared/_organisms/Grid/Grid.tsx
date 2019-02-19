import * as React from 'react';
import { observer } from 'mobx-react';
import { DodayCell } from './doday-cell/doday-cell';

const styles = require('./_grid.module.scss');

interface GridProps {
  items: any[];
}

@observer
export class Grid extends React.Component<GridProps> {
  handleRefresh = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
    return promise;
  }

  render() {
    const { items } = this.props;

    return (
      <div id="grid" className={styles.gridContainer}>
        {items.map((item: any) => (
          <DodayCell doday={item} />
        ))}
      </div>
    );
  }
}