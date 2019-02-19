import * as React from 'react';
import { mount } from 'enzyme';
import { Builder } from '@components';

describe('Builder', () => {
  afterEach(() => {
  });

  it('initially renders menu with doday types', () => {
    const builder = mount(
      <Builder
      />
    );

    expect(builder.find('button').length).toBe(3);
  });

  it('render builder when doday type is selected', () => {
    const builder = mount(
      <Builder
      />
    );

    expect(builder.find('.builder__container').length).toBe(1);
  });

});