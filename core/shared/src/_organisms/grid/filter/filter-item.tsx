import * as React from 'react';
import { Location } from 'history';
import { withRouter, RouteComponentProps, match } from 'react-router';
import { WithTranslation } from 'react-i18next';
import {
  Button,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';

const css = (theme: Theme) =>
  createStyles({
    label: {
      fontSize: '8px',
    },
    margin: {
      '&:not(first-item):not(last-item)': {
        margin: `0 ${theme.spacing.unit}px`,
      },
    },
  });

interface FilterItemProps {
  item: FilterItem;
}

@(withRouter as any)
export class FilterItemComponentClass extends React.Component<
  FilterItemProps &
    Partial<RouteComponentProps> &
    Partial<WithTranslation> &
    WithStyles
> {
  render() {
    const { item, location, match, classes, t } = this.props;
    const active = item.active(location!, match!);
    return (
      <Button
        variant="outlined"
        size="small"
        color={active ? 'primary' : undefined}
        onClick={() => !active && item.action(item.payload)}
        className={classes.margin}
        classes={{ label: classes.label }}
      >
        {(t && t(`dodayapp.filter.${item.name}`)) || item.name}
      </Button>
    );
  }
}

export const FilterItemComponent = withStyles(css)(FilterItemComponentClass);

export interface FilterItem {
  name: string;
  action: (...args: any) => void;
  payload?: any;
  active: (location: Location, match: match) => boolean;
}
