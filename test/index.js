const expect = require('unexpected');
const React = require('react');
const selene = require('selene');

const retractor = require('../selene');

const TodoItem = require('./fixture/TodoItem');

describe('retractor', () => {
  const se = selene().use(retractor);

  beforeEach(() => {
    se.goto(`file://${__dirname}/fixture/index.html`);
    se.wait(retractor.isInstalled);
  });

  it('should find a single element', () => {
    const item = se.find(<TodoItem />);
    return expect(item, 'when fulfilled', 'to be a', selene.webdriver.WebElement);
  });

  it('should find all elements', () => {
    const items = se.findAll(<TodoItem />);
    return expect(items, 'when fulfilled', 'to have length', 2);
  });
});
