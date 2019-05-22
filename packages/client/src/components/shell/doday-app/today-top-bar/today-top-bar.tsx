import * as React from 'react';
import * as moment from 'moment';
import { Icons, ClickableIcon } from '@shared';

const vars = require('@styles/_config.scss');
const styles = require('./_today-top-bar.module.scss');

interface TodayTopBarProps {
  date: Date;
}

export class TodayTopBar extends React.Component<TodayTopBarProps> {
  previousDate = () => {
    const date = moment(this.props.date);
    date.subtract(1, 'd');

    // this.props.changeDate(date.toDate());
  };

  nextDate = () => {
    const date = moment(this.props.date);
    date.add(1, 'd');

    // this.props.changeDate(date.toDate());
  };

  todayDate = today => {
    // this.props.changeDate(today);
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
          <Icons.ChevronLeft />
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
          <Icons.ChevronLeft />
        </ClickableIcon>
      </>
    );
  };

  render() {
    return <div className={styles.topbarContainer}>{this.renderContent()}</div>;
  }
}
