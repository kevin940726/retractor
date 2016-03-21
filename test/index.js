import expect from 'unexpected';
import React from 'react';
import selene from 'selene';

import retractor from '../selene';

import TodoItem from './fixture/TodoItem';

describe('retractor', () => {
  const se = selene().use(retractor);

  beforeEach(() => {
    se.goto(`file://${__dirname}/fixture/index.html`);
  });

  it('should find a single element', () => {
    const item = se.find(<TodoItem />);
    return expect(item, 'when fulfilled', 'to be a', selene.webdriver.WebElement);
  });

  it('should find a single element by props', () => {
    const item = se.find(<TodoItem text={/React/} />);
    return expect(item, 'when fulfilled', 'to be a', selene.webdriver.WebElement);
  });

  it('should find all elements', () => {
    const items = se.findAll(<TodoItem />);
    return expect(items, 'when fulfilled', 'to have length', 2);
  });

  it('should provide a descriptive error message', () => {
    const item = se.find(<TodoItem text={/Not found/} />);
    return expect(item, 'when rejected', 'to have message',
      /No such element: <TodoItem props=\{\(\{ 'text': \/Not found\/ \}\)\} \/>/
    );
  });

  it('should support arbitrary filters', () => {
    const inivisible = se.findAll(<TodoItem />, { visible: false });
    return expect(inivisible, 'when fulfilled', 'to have length', 1);
  });
});
