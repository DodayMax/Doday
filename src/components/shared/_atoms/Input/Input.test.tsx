import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Input } from './input';

describe('Input', () => {

  it('renders correctly without props', () => {
    const input = shallow(<Input onChange={() => {}} />);

    expect(input).toMatchSnapshot();
  });

  it('when input changes', () => {
    const changed = 'qwe';
    const onChange = jest.fn((event) => event.target.value);
    const input = mount(<Input onChange={onChange} />);

    input.find('input').simulate('change', { target: { value: changed } });
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.results[0].value).toBe(changed);
  });

  it('render loader when loading', () => {
    const input = mount(<Input isLoading={true} />);

    expect(input.find('svg')).toHaveLength(1);
  });

});