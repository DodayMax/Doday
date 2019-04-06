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
        <Button text={text} onClick={onClick} />
      </Router>
    );

    expect(wrapper.find('button').contains(text)).toBe(true);
  });

  it('Clicked event', () => {
    const onClick = jest.fn();
    const text = 'text';
    const wrapper = shallow(
      <Router>
        <Button text={text} onClick={onClick} />
      </Router>
    ).dive() as any;

    expect(wrapper.find('withRouter()').props().text).toEqual(text);
    wrapper.find('withRouter()').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('Render loading state', () => {
    const onClick = jest.fn();
    const text = 'text';
    const button = mount(
      <Router>
        <Button text={text} onClick={onClick} isLoading={true} />
      </Router>
    );

    expect(button.find('svg')).toHaveLength(1);
  });
});
