import * as React from 'react';
import { FilterItem } from './filter-item';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { Space } from '@root/lib/common-interfaces';

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
      paddingLeft={Space.XSmall}
      paddingRight={Space.XSmall}
    >
      {items.map((item, index) => (
        <FilterItem key={index} item={item} />
      ))}
    </LayoutBlock>
  );
};
