import * as React from 'react';
import { FilterItem } from './filter-item';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { Space } from '@root/lib/common-interfaces';

const css = require('./filter.module.scss');

interface FilterProps {
  items: FilterItem[];
  hidden?: boolean;
}

export const Filter: React.FunctionComponent<FilterProps> = ({
  items,
  hidden,
}) => {
  if (hidden) return null;
  return (
    <LayoutBlock
      align="flex-center"
      insideElementsMargin
      childFlex
      paddingAbove={Space.XSmall}
      paddingBelow={Space.XSmall}
      paddingLeft={Space.XSmall}
      paddingRight={Space.XSmall}
      className={css.filter}
    >
      {items.map((item, index) => (
        <FilterItem key={index} item={item} />
      ))}
    </LayoutBlock>
  );
};
