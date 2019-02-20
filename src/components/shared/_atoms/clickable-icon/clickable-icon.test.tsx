import * as React from 'react';
import { shallow } from 'enzyme';
import { ClickableIcon, Icons } from '@components';

describe('Clickable icon', () => {
  it('renders correctly', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <ClickableIcon onClick={onClick}>
        <Icons.DoubleChevronIcon />
      </ClickableIcon>
    );

    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.prop('onClick')).toEqual(onClick);
  });

  it('Clicked event', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <ClickableIcon onClick={onClick}>
        <Icons.DoubleChevronIcon />
      </ClickableIcon>
    );

    wrapper.simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
