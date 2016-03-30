# E2E Testing for React Apps

Retractor exposes the internals of a React application for end-to-end testing purposes. This allows you to select DOM nodes based on the name of the React Component that rendered the node as well as its state or properties.


> A retractor is a surgical instrument with which a surgeon can either actively separate the edges of a surgical incision or wound, or can hold back underlying organs and tissues, so that body parts under the incision may be accessed. – [Wikipedia][1]

![retractor](retractor.png)

## Installation

```javascript
npm install --save retractor
```

### Setup

Retractor uses the React Dev-Tools hooks to expose your app's internals. In order for this to work, Retractor must be loaded before React gets initialized.

In a [webpack][4] based setup this can be achieved by adding `retractor/client` to the beginning of the `entry` array:

```javascript
module.exports = {
  entry: [
    'retractor/client',
    './index' //your application entry
  ],
  output: {},
  plugins: [],
  module: {
    loaders: []
  }
}
```

You can verify that Retractor is installed by typing `__retractor` in your Browser's console.

### Interacting with Retractor via Selenium

Once your app exposes the Retractor API you can interact with it via Selenium:

```js
import React from 'react';
import byJSX from 'retractor';
import webdriver from 'selenium-webdriver';

import TodoItem from '../components/TodoItem';

const driver = new webdriver.Builder().forBrowser('phantomjs').build();

driver.get('http://localhost:3000/');

// Find all TodoItems
driver.findElements(byJSX(<TodoItem />));

// Find one TodoItem with a given text
driver.findElement(byJSX(
  <TodoItem todo={{ text: 'Use retractor' }} />
));
```

### Features

The Retractor JSX bindings allow to query the DOM nodes of your components in an intuitive way. You just have to write plain JSX expressions to search and filter the components you would like to interact with.

#### Query
To query components you have to use the `byJSX` locator.
By default it will return all the DOM nodes of the mounted components matching that expression.

```js
import byJSX from 'retractor';
import webdriver from 'selenium-webdriver';

const driver = new webdriver.Builder()

driver.findElements(byJSX(<TodoItem />));
```

#### Filter by props
It is also possible to filter components based on their internal data structure (props). Just define the filter criteria as props in the JSX expression. For example, given two TodoItems, calling `byJSX` with props {complete: false} will return the one but not the other.

```js
driver.findElements(byJSX(<TodoItem todo={{ title: 'retractor' }} />));
driver.findElements(byJSX(<TodoItem todo={{ title: 'retractor', completed: false }} />));
driver.findElements(byJSX(<TodoItem editing />));
```

Retractor uses [deep-match][5] internally to support sophisticated filtering. This also allows you to use RegEx patterns for your prop filters.

```js
driver.findElements(byJSX(<TodoItem todo={{ title: /retractor/ }} />))
```

#### Scoped lookups
//TODO verify and document
```js
driver.findElements(
  byJSX(<TodoApp model={{ key: 'todolist-2' }} />)).then(
  byJSX(<TodoItem todo={{ title: /Retractor/ }} />)
);
```

#### React warnings
Note: While executing your tests you might encounter React warnings about not fulfilled `propTypes` of components you try to lookup. It's safe to ignore those because retractor will never execute or mount a component. It's rather a syntactic sugar DSL which gets translated by retractor internally to perform the query.

A workaround to disable the warning is running your tests in a environment different to `development`

```
"scripts":
  "test-e2e": "NODE_ENV=production mocha ..."
}
```

### Retractor Client API
//TODO
`__retractor.findDOMNodes()`


### Integrating with Selene

Working with the plain webdriver API like in the example above is often quite verbose. Retractor provides a plugin for [Selene][3], a 100% backwards compatible wrapper around the official Selenium driver. With Selene the very same example can be written as:

```js
import React from 'react';
import selene from 'selene';
import retractor from 'retractor/selene';

import TodoItem from '../components/TodoItem';

const se = selene({browser: 'phantomjs'}).use(retractor);

se.get('http://localhost:3000/');

// Find all TodoItems
se.findAll(<TodoItem />);

// Find one TodoItem with a given text
se.find(<TodoItem todo={{ text: 'Use retractor' }} />);
```

[1]: https://en.wikipedia.org/wiki/Retractor_(medical)
[2]: https://github.com/SeleniumHQ/selenium
[3]: https://github.com/LiquidLabsGmbH/selene
[4]: https://github.com/webpack/webpack
[5]: https://github.com/fgnass/deep-match
