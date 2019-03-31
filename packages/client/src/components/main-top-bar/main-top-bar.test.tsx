import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { DodayTopBar } from '@components';

describe('DodayTopBar', () => {

  const coins = '50';
  const energy = '8';

  it('Correctly passed props', () => {
    const wrapper = mount(<DodayTopBar coins={coins} energy={energy} />);
    
    expect(wrapper.props().coins).toEqual(coins);
    expect(wrapper.props().energy).toEqual(energy);
  });

  it('Renders correctly with props', () => {
    const wrapper = shallow(<DodayTopBar coins={coins} energy={energy} />);

    expect(wrapper.contains('50')).toBe(true);
    expect(wrapper.contains('8')).toBe(true);
  });

});