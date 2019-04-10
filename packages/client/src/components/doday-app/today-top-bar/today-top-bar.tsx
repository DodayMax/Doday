import * as React from 'react';
import * as moment from 'moment';
import { ChangeDodayAppDateAction } from '@root/ducks/doday-app/actions';
import { ClickableIcon } from '@root/components/shared/_atoms/clickable-icon/clickable-icon';
import { Icons } from '@root/components';

const vars = require('@styles/_config.scss');
const styles = require('./_today-top-bar.module.scss');

interface TodayTopBarProps {
  date: Date;
  changeDate: (date: Date) => ChangeDodayAppDateAction;
}

export class TodayTopBar extends React.Component<TodayTopBarProps> {
  previousDate = () => {
    const date = moment(this.props.date);
    date.subtract(1, 'd');

    this.props.changeDate(date.toDate());
  };

  nextDate = () => {
    const date = moment(this.props.date);
    date.add(1, 'd');

    this.props.changeDate(date.toDate());
  };

  todayDate = today => {
    this.props.changeDate(today);
  };

  renderContent = () => {
    const date = moment(this.props.date).format('ll');
    const today = new Date();
    const isToday = date === moment(today).format('ll');

    return (
      <>
        <ClickableIcon
          border
          background={vars.gray1}
          onClick={this.previousDate}
        >
          <Icons.Chevron />
        </ClickableIcon>
        <div className={styles.dateContainer}>
          <span className={styles.date}>{date}</span>
          {!isToday && (
            <ClickableIcon
              border
              background={vars.gray1}
              onClick={() => this.todayDate(today)}
            >
              <Icons.TodayCalendar />
            </ClickableIcon>
          )}
        </div>
        <ClickableIcon border background={vars.gray1} onClick={this.nextDate}>
          <Icons.Chevron right />
        </ClickableIcon>
      </>
    );
  };

  render() {
    return <div className={styles.topbarContainer}>{this.renderContent()}</div>;
  }
}
