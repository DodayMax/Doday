import * as React from 'react';
import { Shell } from '@components/Shell/Shell';
import { mount } from 'enzyme';

describe('Shell tests', () => {

  let wrapper;
  let authStoreMock;
  let globalUIStoreMock;

  beforeEach(() => {
    authStoreMock = {
      showLock: jest.fn(),
    };
    globalUIStoreMock = {
      isBuilderShown: false,
      toggleBuilder: jest.fn(),
    };

    wrapper = mount(<Shell t={key => key} authStore={authStoreMock} globalUIStore={globalUIStoreMock} />);
  })

  it('Mounting Shell triggers show lock function of authStore', () => {
    expect(authStoreMock.showLock.mock.calls.length).toBe(1);
  });

  it('Click add button open Builder modal', () => {
    expect(globalUIStoreMock.isBuilderShown).toBe(false);
    wrapper.find('.control_button').simulate('click');
    expect(globalUIStoreMock.toggleBuilder.mock.calls.length).toBe(1);
  });
})