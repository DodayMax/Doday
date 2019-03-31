import * as React from 'react';

const styles = require('./_badge.module.scss');

interface BadgeProps {
  value: number | string;
}

export const Badge = ({ value }: BadgeProps) => {
  return (
    <span className={styles.badgeContainer}>
      {value}
    </span>
  );
}