import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { StoreSpot, getPrimaryLabel, Entity } from '@doday/lib';
import { Spot } from '@root/components';
import { Masonry, MasonryItemProps } from '@doday/ui';
import { useDispatch, useSelector } from 'react-redux';
import { storeStateSelector, fetchDodaysActionCreator } from '@redux/store';

export const StoreMasonry = () => {
  const dispatch = useDispatch();

  const storeState = useSelector(storeStateSelector);

  useEffect(() => {
    // fetch dodays
    dispatch(fetchDodaysActionCreator());
  }, []);

  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      flexDirection="column"
    >
      <Masonry
        items={storeState.items}
        itemComponent={StoreMasonryCard}
        columnMinWidth={250}
        columnGutter={0}
        onInfiniteLoad={() => {}}
        hasMore={storeState.items.length < storeState.count}
      />
    </Box>
  );
};

const StoreMasonryCard = (props: MasonryItemProps) => {
  return (
    <Spot
      sysname={StoreSpot.MasonryItem}
      node={getPrimaryLabel(props.item.doday.labels)}
      {...props}
    />
  );
};

StoreMasonryCard.calculateHeight = (item: Entity) => {
  return 150;
};
