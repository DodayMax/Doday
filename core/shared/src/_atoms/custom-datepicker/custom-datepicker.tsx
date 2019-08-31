import * as React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import * as moment from 'moment';
import {
  Button,
  Tooltip,
  Typography,
  IconButton,
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { LayoutBlock } from '../layout-block';
import { Space } from '@doday/lib';

const css = (theme: Theme) =>
  createStyles({
    dateButtonPadding: {
      padding: '8px 16px',
    },
  });

interface DatePickerProps {
  lightBorder?: boolean;
  borderless?: boolean;
  icon?: React.ReactElement<any>;
  onClick?: () => void;
  withLocker?: boolean;
  tooltip?: string;
  isLocked?: boolean;
  onLocked?: () => void;
}

export const CustomDatePicker = withStyles(css)(
  ({
    lightBorder,
    icon,
    onClick,
    borderless,
    withLocker,
    tooltip,
    isLocked,
    onLocked,
    disabled,
    classes,
    ...props
  }: DatePickerProps & ReactDatePickerProps & WithStyles) => {
    const renderLockIcon = () => (
      <IconButton disabled={disabled} onClick={onLocked}>
        {isLocked ? <LockIcon color="primary" /> : <LockOpenIcon />}
      </IconButton>
    );

    return (
      <LayoutBlock valign="vflexCenter" insideElementsMargin>
        <DatePicker
          customInput={
            <Button
              variant="outlined"
              size="large"
              onClick={onClick}
              disabled={disabled}
              className={classes.dateButtonPadding}
            >
              <LayoutBlock spaceRight={Space.Small}>{icon}</LayoutBlock>
              {props.selected != null && moment(props.selected).format('ll')}
            </Button>
          }
          selected={props.selected}
          onChange={props.onChange}
          disabled={disabled}
          {...props}
        />
        {withLocker ? (
          tooltip ? (
            <Tooltip
              title={<Typography variant="caption">{tooltip}</Typography>}
              placement="top"
            >
              {renderLockIcon()}
            </Tooltip>
          ) : (
            renderLockIcon()
          )
        ) : null}
      </LayoutBlock>
    );
  }
);
