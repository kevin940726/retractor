/* eslint-disable react/prefer-es6-class  */
import React from 'react';

/* Simple higher order component for testing purposes.
   The idea is to simulate the injection of custom props
   into the wrapped component. Something like redux connect.
   Retract should still be able to resolve the wrapped
   (decorated) component with property filters. */
export const wrapper = (WrappedComponent) => {
  const Wrapper = React.createClass({

    render() {
      const placeholder = 'What needs to be done?';
      return (<WrappedComponent placeholder={placeholder} {...this.props} />);
    },
  });

  Wrapper.displayName = `Wrapper(${WrappedComponent.displayName})`;
  Wrapper.WrappedComponent = WrappedComponent;

  return Wrapper;
};
