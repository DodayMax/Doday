import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('FolderPlus', () => {
  it('renders correctly without props', () => {
    const folderPlus = shallow(<Icons.FolderPlus />);

    expect(folderPlus).toMatchSnapshot();
  });
});