import * as React from 'react';
import { shallow } from 'enzyme';
import { Input } from '@components';

describe('Input', () => {

  it('renders correctly without props', () => {
    const input = shallow(<Input onChange={() => {}} />);

    expect(input).toMatchSnapshot();
  });

  it('when input changes', () => {
    const changed = 'qwe';
    const onChange = jest.fn((event) => event.target.value);
    const input = shallow(<Input onChange={onChange} />);

    input.simulate('change', { target: { value: changed } });
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.results[0].value).toBe(changed);
  });

});