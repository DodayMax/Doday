import * as React from 'react';
import * as classnames from 'classnames';
import { AnyAction } from 'redux';
import { Text } from '@root/components/shared/_atoms/typography';
import {
  TypographySize,
  TypographyAlignment,
} from '@root/lib/common-interfaces';
import { Location, LocationDescriptor } from 'history';
import { withRouter, RouteComponentProps, match } from 'react-router';

const css = require('./filter-item.module.scss');

interface FilterItemProps {
  item: FilterItem;
}

@(withRouter as any)
export class FilterItem extends React.Component<
  FilterItemProps & Partial<RouteComponentProps>
> {
  render() {
    const { item, location, match } = this.props;
    const active = item.active(location, match);
    const cx = classnames({
      [css.filterItem]: true,
      [css.active]: active,
    });
    return (
      <span className={cx} onClick={() => !active && item.action(item.payload)}>
        <Text size={TypographySize.s} align={TypographyAlignment.Center}>
          {item.name}
        </Text>
      </span>
    );
  }
}

export interface FilterItem {
  name: string;
  action: (...args: any) => AnyAction;
  payload: any;
  active: (location: Location, match: match) => boolean;
}
