import * as React from 'react';
import * as moment from 'moment';
import { ChangeDateAction } from '@root/ducks/hero-settings/actions';
import { ClickableIcon } from '@root/components/shared/_atoms/clickable-icon/clickable-icon';
import { Icons } from '@root/components';

const styles = require('./_today-top-bar.module.scss');

interface TodayTopBarProps {
  date: Date;
  changeDate: (date: Date) => ChangeDateAction;
}

export class TodayTopBar extends React.Component<TodayTopBarProps> {
  previousDate = () => {
    const date = moment(this.props.date);
    date.subtract(1, 'd');

    this.props.changeDate(date.toDate());
  }

  nextDate = () => {
    const date = moment(this.props.date);
    date.add(1, 'd');

    this.props.changeDate(date.toDate());
  }

  render() {
    const date = moment(this.props.date).format('ll');

    return (
      <div className={styles.topbarContainer}>
        <ClickableIcon onClick={this.previousDate}>
          <Icons.Chevron />
        </ClickableIcon>
        <div>{date}</div>
        <ClickableIcon onClick={this.nextDate}>
          <Icons.Chevron right />
        </ClickableIcon>
      </div>
    );
  }
}