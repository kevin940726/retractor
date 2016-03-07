const expect = require('unexpected');
const React = require('react');
const webdriver = require('selenium-webdriver');

const { one, all } = require('..');

const TodoItem = require('./fixture/TodoItem');

describe('retractor', () => {
  const driver = new webdriver.Builder().forBrowser('chrome').build();

  driver.get(`file://${__dirname}/fixture/index.html`);

  it('should find a single element', () => {
    const item = driver.findElement(one(<TodoItem />));
    return expect(item, 'when fulfilled', 'to be a', webdriver.WebElement);
  });

  it('should find all elements', () => {
    const items = driver.findElements(all(<TodoItem />));
    return expect(items, 'when fulfilled', 'to have length', 2);
  });
});
