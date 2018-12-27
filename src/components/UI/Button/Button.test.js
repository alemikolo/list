import Button from './Button';
import classes from './Button.module.scss';
import * as testUtils from '../../../tests/testUtils';

const defaultProps = {
  btnType: 'Confirm',
  disabled: false,
  clicked: () => { },
  label: 'accept',
};

describe('ButtonComponent', () => {
  let wrapper;
  let buttonNode;
  beforeEach(() => {
    wrapper = testUtils.getWrapper(Button, defaultProps);
    buttonNode = testUtils.findByTestIdAttr(wrapper, 'button-component');
  });
  it('ButtonComponent renders without error', () => {
    expect(buttonNode.length).toBe(1);
  });

  it('does not throwing warning with expected props', () => {
    testUtils.checkProps(Button, defaultProps);
  });

  it('display button label', () => {
    expect(buttonNode.text().length).not.toBe(0);
  });

  it('display a proper button type', () => {
    expect(buttonNode.hasClass(classes[defaultProps.btnType])).to.equal(true);
  });
});
