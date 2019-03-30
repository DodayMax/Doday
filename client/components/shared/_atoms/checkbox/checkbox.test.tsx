import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders correctly without props', () => {
    const checkbox = shallow(<Checkbox onClick={() => {}} />);

    expect(checkbox).toMatchSnapshot();
  });

  it('renders correctly checked', () => {
    const checkbox = shallow(<Checkbox checked onClick={() => {}} />);

    expect(checkbox).toMatchSnapshot();
  });

  it('click trigger handler', () => {
    const onClick = jest.fn();
    const checkbox = shallow(<Checkbox onClick={onClick} />);

    checkbox.simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
