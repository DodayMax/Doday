import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { ModuleType, StoreSpot } from '@doday/lib';
import { Spot } from '@root/modules/module-wrapper';
import { Masonry } from '@doday/ui';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDodaysActionCreator } from '../../redux/store-grid.actions';
import { storeGridStateSelector } from '../../redux';

export const StoreGrid = () => {
  const dispatch = useDispatch();

  const storeGridState = useSelector(storeGridStateSelector);

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
        items={storeGridState.items}
        renderItem={props => (
          <Spot
            moduleTypes={[ModuleType.Core, ModuleType.Tool]}
            spot={StoreSpot.Card}
            node={props.item.doday.labels[props.item.doday.labels.length - 1]}
            {...props}
          />
        )}
        columnWidth={300}
        columnGutter={10}
        onInfiniteLoad={() => {}}
        hasMore={storeGridState.items.length < storeGridState.count}
        getState={() => storeGridState.items}
      />
    </Box>
  );
};
