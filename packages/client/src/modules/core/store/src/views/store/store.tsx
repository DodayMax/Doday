import React from 'react';
import { Page } from '@components/page';
import { Spot } from '@root/modules/module-wrapper';
import { StoreSpot, ModuleType } from '@doday/lib';

export const DodayStore = props => {
  console.log(props);
  // Get current module for StoreSpot.Filter
  // Use selector to get state of the StoreSpot.Filter module
  // Create useEffect for props of selected state of the filter to refetch dodays with params
  // Provide infinite load function to pass it to the StoreSpot.Grid module
  return (
    <Page base>
      <Spot
        spot={StoreSpot.Filter}
        moduleTypes={[ModuleType.Core]}
        query={props.route.query}
      />
      <Spot spot={StoreSpot.Grid} moduleTypes={[ModuleType.Core]} />
    </Page>
  );
};
