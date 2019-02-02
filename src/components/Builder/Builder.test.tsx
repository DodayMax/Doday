import * as React from 'react';
import { mount } from 'enzyme';
import { Builder } from '@components';
import { builderUIStore } from '@stores';

describe('Builder', () => {
  afterEach(() => {
    builderUIStore.clear();
  });

  it('initially renders menu with doday types', () => {
    const builder = mount(
      <Builder
        builderUIStore={builderUIStore}
      />
    );

    expect(builder.find('button').length).toBe(3);
    expect(builder.find('button').first().contains(builderUIStore.dodayTypes[0].sysname)).toBe(true);
  });

  it('render builder when doday type is selected', () => {
    builderUIStore.selectDodayType('todo');
    const builder = mount(
      <Builder
        builderUIStore={builderUIStore}
      />
    );

    expect(builder.find('.builder__container').length).toBe(1);
  });

});