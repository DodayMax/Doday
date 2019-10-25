import * as React from 'react';
import { FilterItem, FilterItemComponent } from './filter-item';
import { WithTranslation } from 'react-i18next';
import { Divider, Box } from '@material-ui/core';

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
      <Box display="flex" justifyContent="center" p={2}>
        {items.map((item, index) => (
          <FilterItemComponent key={index} item={item} t={t} />
        ))}
      </Box>
      <Divider />
    </>
  );
};
