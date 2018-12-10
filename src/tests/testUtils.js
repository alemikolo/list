import { shallow } from 'enzyme';
import React from 'react';
import checkPropTypes from 'check-prop-types';

export const getWrapper = (Component, props = {}, state = null) => {
  const wrapper = shallow(<Component {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

export const findByTestIdAttr = (wrapper, value) => (
  wrapper.find(`[data-test-id="${value}"]`)
);

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.prpTypes,
    conformingProps,
    'props',
    component.name,
  );
  expect(propError).toBeUndefined();
};
