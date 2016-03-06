# E2E Testing for React Apps

Retractor exposes the internals of a React application for end-to-end testing purposes. This allows you to select DOM nodes based on the name of the React Component that rendered the node as well as its state or properties.


> A retractor is a surgical instrument with which a surgeon can either actively separate the edges of a surgical incision or wound, or can hold back underlying organs and tissues, so that body parts under the incision may be accessed. – [Wikipedia][1]

![retractor](retractor.png)

## Installation

```javascript
npm install --save retractor
```

## Usage
Retractor consists out of two parts - a client and a query DSL. The client needs to be integrated in your React App (System Under Test (SUT)) to expose its internal component structure. The query DSL provides a JSX based query language to located the DOM Nodes of your React components with [selenium-webdriver][2] locators.

### Retractor Client
To setup the client module you must load Retractor before React gets loaded. Internally it uses the React Dev-Tools hooks to expose the rendered component tree of your application.

In a [webpack][3] based setup use the entry setting to inject Retractor before your application entry:

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

### Retractor Query DSL
Once the Retractor client module is integrated in your React Application you can easily use the query DSL in combination with selenium-webdriver locators to resolve the DOM Nodes of your components:

```javascript
/* eslint-env mocha */

import React from 'react'
import {one} from 'retractor'
import expect from 'unexpected'
import webdriver from 'selenium-webdriver'

import TodoItem from '../components/TodoItem'

describe('Retractor E2E testing', function() {

  let driver

  before(function() {
    driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build()
  })

  it('query components', function() {
    driver.get('http://localhost:3000/')

    const el = driver.findElement(one(
      <TodoItem todo={{ text: 'Use retractor' }} />
    ))

    return expect(el, 'when fulfilled', 'to be a', webdriver.WebElement)
  })
})
```

## API

### Client
Once the Retractor client gets loaded, it exposes a global `__retractor` instance with the following API.

- `findAllComponents(name? : String, filter? : Object) : Array<Component>`

- `findOneComponent(name? : String, filter? : Object) : Array<Component>`

- `findAllDOMNodes(name? : String, filter? : Object) : Array<Element>`

- `findOneDOMNode(name? : String, filter? : Object) : Array<Element>`

#### Arguments
###### `name : String`
Optional name of the component to resolve. If null, all available Component types will be resolved.

###### `filter : Object`
Optional filter criteria, to filter components with a specific state or props, i.e.:

```javascript
- {props : {todo : {id : 123}}}
- {props : {todo : {id : 456}}, state : {showItem : true}}
```

The filtering is based on the [deep-match][4] library which also supports regular expressions for filtering.

### Query DSL

//TODO

[1]: https://en.wikipedia.org/wiki/Retractor_(medical)
[2]: https://github.com/SeleniumHQ/selenium
[3]: https://github.com/webpack/webpack
[4]: https://github.com/fgnass/deep-match
