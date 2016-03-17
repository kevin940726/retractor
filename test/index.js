const expect = require('unexpected');
const React = require('react');
const selene = require('selene');

const retractor = require('../selene');

const TodoList = require('./fixture/TodoList');
const TodoItem = require('./fixture/TodoItem');

describe('retractor', () => {
  const se = selene().use(retractor);

  beforeEach(() => {
    se.goto(`file://${__dirname}/fixture/index.html`);
  });

  it('should find a single element', () => {
    const item = se.find(<TodoItem text={/React/} />);
    return expect(item, 'when fulfilled', 'to be a', selene.webdriver.WebElement);
  });

  it('should find all elements', () => {
    const items = se.findAll(<TodoItem />);
    return expect(items, 'when fulfilled', 'to have length', 3);
  });

  it('should provide a descriptive error message', () => {
    const item = se.find(<TodoItem text={/Not found/} />);
    return expect(item, 'when rejected', 'to have message',
      /Waiting for <TodoItem props=\{\(\{ 'text': \/Not found\/ \}\)\} \/>/
    );
  });

  it('should limit results to the given scope', () => {
    const el = se.find(<TodoList id="2" />).find(<TodoItem text={/Retractor/} />);
    return expect(el.getText(), 'to be fulfilled with', 'Use Retractor Scoping');
  });
});
