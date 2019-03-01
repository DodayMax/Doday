import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('TodayCalendar', () => {
  it('renders correctly without props', () => {
    const todayCalendar = shallow(<Icons.TodayCalendar />);

    expect(todayCalendar).toMatchSnapshot();
  });
});