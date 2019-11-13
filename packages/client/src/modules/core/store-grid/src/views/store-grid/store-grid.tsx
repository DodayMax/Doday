import React from 'react';
import { Box } from '@material-ui/core';
import {
  Module,
  NodeLabel,
  ModuleSysname,
  ModuleType,
  StoreSpot,
} from '@doday/lib';
import { Spot } from '@root/modules/module-wrapper';
import { Masonry } from '@doday/ui';

export const StoreGrid = () => {
  const mockedDodays: Module[] = [
    {
      did: 'some did',
      labels: [NodeLabel.Module],
      sysname: ModuleSysname.MS,
      public: true,
      createdAt: new Date(),
    },
  ];

  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      flexDirection="column"
    >
      <Masonry
        items={mockedDodays}
        renderItem={props => (
          <Spot
            moduleTypes={[ModuleType.Core, ModuleType.Tool]}
            spot={StoreSpot.Card}
            node={props.item.labels[props.item.labels.length - 1]}
            {...props}
          />
        )}
        columnWidth={300}
        columnGutter={10}
        onInfiniteLoad={() => {}}
        hasMore={false}
        getState={() => mockedDodays}
      />
    </Box>
  );
};
