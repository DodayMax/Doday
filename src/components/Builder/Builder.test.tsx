import * as React from 'react';
import { mount } from 'enzyme';
import { Builder } from '@components';
import { builderStore } from '@stores';

describe('Builder', () => {
  afterEach(() => {
    builderStore.clearSelectedType();
  });

  it('initially renders menu with doday types', () => {
    const builder = mount(
      <Builder
        dodayTypes={builderStore.dodayTypes}
        selectDodayType={builderStore.selectDodayType}
        selectedDodayType={builderStore.selectedDodayType}
      />
    );

    expect(builder.find('button').length).toBe(3);
    expect(builder.find('button').first().contains(builderStore.dodayTypes[0].sysname)).toBe(true);
  });

  it('render builder when doday type is selected', () => {
    builderStore.selectDodayType('Todo');
    const builder = mount(
      <Builder
        dodayTypes={builderStore.dodayTypes}
        selectDodayType={builderStore.selectDodayType}
        selectedDodayType={builderStore.selectedDodayType}
      />
    );

    expect(builder.find('.builder__container').length).toBe(1);
  });

});