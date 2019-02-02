import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from '@components';

describe('Button', () => {
  it('renders correctly without props', () => {
    const onClick = jest.fn();
    const button = shallow(<Button text={'qwe'} onClick={onClick} />);

    expect(button.find('button').contains('qwe')).toBe(true);
  });

  it('Clicked event', () => {
    const onClick = jest.fn();
    const button = mount(<Button text={'qwe'} onClick={onClick} />);

    expect(button.props().text).toEqual('qwe');
    button.simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
