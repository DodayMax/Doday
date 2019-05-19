import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Button } from './button';

describe('Button', () => {
  it('renders correctly without props', () => {
    const onClick = jest.fn();
    const text = 'text';
    const wrapper = mount(
      <Router>
        <Button onClick={onClick}>{text}</Button>
      </Router>
    );

    expect(wrapper.find('button').contains(text)).toBe(true);
  });

  it('Clicked event', () => {
    const onClick = jest.fn();
    const text = 'text';
    const wrapper = shallow(
      <Router>
        <Button onClick={onClick}>{text}</Button>
      </Router>
    ).dive() as any;

    expect(wrapper.find('Button').props().children).toEqual(text);
    wrapper.find('Button').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('Render loading state', () => {
    const onClick = jest.fn();
    const text = 'text';
    const button = mount(
      <Router>
        <Button onClick={onClick} isLoading={true}>
          {text}
        </Button>
      </Router>
    );

    expect(button.find('svg')).toHaveLength(1);
  });
});
