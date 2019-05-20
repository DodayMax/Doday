import * as React from 'react';
import * as classnames from 'classnames';
import { AnyAction } from 'redux';
import { Text } from '@root/components/shared/_atoms/typography';
import {
  TypographySize,
  TypographyAlignment,
} from '@root/lib/common-interfaces';
import { Location } from 'history';
import { withRouter, RouteComponentProps, match } from 'react-router';
import { WithTranslation } from 'react-i18next';

const css = require('./filter-item.module.scss');

interface FilterItemProps {
  item: FilterItem;
}

@(withRouter as any)
export class FilterItemComponentClass extends React.Component<
  FilterItemProps & Partial<RouteComponentProps> & Partial<WithTranslation>
> {
  render() {
    const { item, location, match, t } = this.props;
    const active = item.active(location, match);
    const cx = classnames({
      [css.filterItem]: true,
      [css.active]: active,
    });
    return (
      <span className={cx} onClick={() => !active && item.action(item.payload)}>
        <Text size={TypographySize.s} align={TypographyAlignment.Center}>
          {(t && t(`dodayapp.filter.${item.name}`)) || item.name}
        </Text>
      </span>
    );
  }
}

export interface FilterItem {
  name: string;
  action: (...args: any) => void;
  payload?: any;
  active: (location: Location, match: match) => boolean;
}
