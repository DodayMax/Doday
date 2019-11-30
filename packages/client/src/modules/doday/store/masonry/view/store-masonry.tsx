import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { StoreSpot, getPrimaryLabel } from '@doday/lib';
import { Spot } from '@root/components';
import { Masonry } from '@doday/ui';
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
        renderItem={props => {
          console.log(getPrimaryLabel(props.item.doday.labels));
          return (
            <Spot
              sysname={StoreSpot.MasonryItem}
              node={getPrimaryLabel(props.item.doday.labels)}
              {...props}
            />
          );
        }}
        columnWidth={300}
        columnGutter={10}
        onInfiniteLoad={() => {}}
        hasMore={storeState.items.length < storeState.count}
        getState={() => storeState.items}
      />
    </Box>
  );
};
