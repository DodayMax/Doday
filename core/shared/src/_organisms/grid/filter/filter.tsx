import * as React from 'react';
import { FilterItem, FilterItemComponent } from './filter-item';
import { Space } from '@doday/lib';
import { WithTranslation } from 'react-i18next';
import { Divider } from '@material-ui/core';
import { LayoutBlock } from '../../../_atoms/layout-block';

interface FilterProps {
  items: FilterItem[];
  hidden?: boolean;
}

export const Filter: React.FunctionComponent<
  FilterProps & Partial<WithTranslation>
> = ({ items, hidden, t }) => {
  if (hidden) return null;
  return (
    <>
      <LayoutBlock
        align="flexCenter"
        insideElementsMargin
        childFlex
        paddingAbove={Space.XSmall}
        paddingBelow={Space.XSmall}
        paddingLeft={Space.XSmall}
        paddingRight={Space.XSmall}
      >
        {items.map((item, index) => (
          <FilterItemComponent key={index} item={item} t={t} />
        ))}
      </LayoutBlock>
      <Divider />
    </>
  );
};
