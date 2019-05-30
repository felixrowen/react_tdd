## How to Write Test Case Using TDD and BDD Approach

Things that you need to install:
1. NPM / Yarn
2. create-react-app
3. Jest 
4. Enzyme
5. Code Editor
---
### 1. What is Test Driven Development? (TDD)
- Coding of features and tests go hand in hand.
- Step :
  1.  Write a unit test
  2.  Run the test. See it fail
  3.  Write the feature code to pass the test
  4.  Refactor the code
  5.  Repeat when you want to develop any feature

### 2. Why Test Driven Development?
- It reducers errors and defects in the long run.
- It leads to higher quality code.

### 3. Jest
- A test runner made by Facebook
- Write test in the __tests__ folder or with test.js
- Snapshot testing, coverage, and mocking

### 4. Enzyme
- A test utility library made by Airbnb
- Manipulate React components and DOM Behavior
- Jest + Enzyme = TDD with React

### 5. Example of TDD
#### Goals: We want to create an app that can save a gift "Gift Giver App"
- First we need to create test for a app component
```js
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import App from './App'

configure({adapter: new Adapter()})

const app = shallow(<App />)

it('renders correctly', () => {
  expect(toJson(app)).toMatchSnapshot()
})

it('initialized the `state` with an empty list of gifts', () => {
  expect(app.state().gifts).toEqual([])
})

it('adds a new gift to `state` when clicking the `add gift` button', () => {
  app.find('.btn-add').simulate('click')
  expect(app.state().gifts).toEqual([{ id: 1 }])
})

it('add a new gift to the rendered list when clicking the `add gift` button', () => {
  app.find('.btn-add').simulate('click')
  expect(app.find('.gift-list').children().length).toEqual(2)
})

```
- Second we want to create the app component so that the test will passed
```js
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class App extends Component{
  constructor() {
    super()
    this.state = { gifts: [] }
  }

  addGift = () => {
    const { gifts } = this.state
    const ids = this.state.gifts.map(gift => gift.id)
    const max_id = ids.length > 0 ? Math.max(...ids) : 0
    gifts.push({ id: max_id+1 })
    this.setState({ gifts })
  }

  render() {
    return(
      <div>
        <h2>Gift Giver</h2>
        <div className="gift-list">
          {
            this.state.gifts.map(gift => {
              return(
                <div key={gift.id}></div>
              )
            })
          }
        </div>
        <Button 
          className="btn-add"
          onClick={this.addGift}
        >
          Add Gift
        </Button>
      </div>
    )
  }
}

export default App

```
### 6. What is Behavior Driven Development? (BDD)
- A variation of TDD that tests for user scenarios
- __Given__, __When__, __Then__...
- For Ex: *__Given__* notes, *__When__* deleting, *__Then__* remove a note
- BDD consists of __scenarios/specifications__

### 7. BDD Implementation 
##### Let's add describe to the test

```js

import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import App from './App'

configure({adapter: new Adapter()})

describe('<App />', () => {
  const app = shallow(<App />)

  it('renders correctly', () => {
    expect(toJson(app)).toMatchSnapshot()
  })

  it('initialized the `state` with an empty list of gifts', () => {
    expect(app.state().gifts).toEqual([])
  })

  describe('when clicking the `add gift` button', () => {
    
    beforeEach(() => {
      app.find('.btn-add').simulate('click')
    })

    afterEach(() => {
      app.setState({ gifts: [] })
    })

    it('adds a new gift to `state`', () => {
      expect(app.state().gifts).toEqual([{ id: 1 }])
    })
  
    it('add a new gift to the rendered list', () => {
      expect(app.find('.gift-list').children().length).toEqual(1)
    })
  })

})

```
##### With BDD, all the involved parties have a strong understanding of the project and they can all have a role in communication and actually have constructive discussions. BDD increases and improves collaboration. It enables everyone involved in the project to easily engage with the product development cycle. And by using plain language, all are able to write behavior scenarios.
###### note: By using a language understood by all, everyone gets a strong visibility into the project’s progression.

### 8. Example of Fully Tested Component

#### 1. App.test.js
```js
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import App from './App'

configure({adapter: new Adapter()})

describe('<App />', () => {
  const app = shallow(<App />)

  it('renders correctly', () => {
    expect(toJson(app)).toMatchSnapshot()
  })

  it('initialized the `state` with an empty list of gifts', () => {
    expect(app.state().gifts).toEqual([])
  })

  describe('when clicking the `add gift` button', () => {
    const id = 1

    beforeEach(() => {
      app.find('.btn-add').simulate('click')
    })

    afterEach(() => {
      app.setState({ gifts: [] })
    })

    it('adds a new gift to `state`', () => {
      expect(app.state().gifts).toEqual([{ id }])
    })
  
    it('add a new gift to the rendered list', () => {
      expect(app.find('.gift-list').children().length).toEqual(1)
    })

    it('creates a Gift component', () => {
      expect(app.find('Gift').exists()).toBe(true)
    })
  })

  describe('and the user wants to remove the added gift', () => {
    const id = 1

    beforeEach(() => {
      app.instance().removeGift(id)
    })

    it('removes the gift from `state`', () => {
      expect(app.state().gifts).toEqual([])
    })
  })

})

```
#### 2. Gift.test.js
```js
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Gift from './Gift'

configure({adapter: new Adapter()})

describe('Gift', () => {
  const mockRemove = jest.fn()
  const id = 1
  const props = { gift: { id }, removeGift: mockRemove }
  const gift = shallow(<Gift {...props} />)

  it('renders properly', () => {
    expect(toJson(gift)).toMatchSnapshot()
  })

  it('it initializes a person and present in `state`', () => {
    expect(gift.state()).toEqual({ person: '', present: '' })
  })

  describe('when typing into the person input', () => {
    const person = 'Uncle'

    beforeEach(() => {
      gift.find('.input-person').simulate('change', { target: { value: person } }) 
    })

    it('updates the person in `state`', () => {
      expect(gift.state().person).toEqual('Uncle')
    })
  })

  describe('when typing into the present input', () => {
    const present = 'Golf Clubs'

    beforeEach(() => {
      gift.find('.input-present').simulate('change', { target: { value: present } })
    })

    it('updates the present in `state`', () => {
      expect(gift.state().present).toEqual(present)
    })
  })

  describe('when clicking the `remove gift` button', () => {
    beforeEach(() => {
      gift.find('.btn-remove').simulate('click')
    })

    it('calls the removeGift callback', () => {
      expect(mockRemove).toHaveBeenCalledWith(id)
    })
  })

})

```
#### 3. App.jsx
```js
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Gift from '../components/Gift'

class App extends Component{
  constructor() {
    super()
    this.state = { gifts: [] }
  }

  addGift = () => {
    const { gifts } = this.state
    const ids = this.state.gifts.map(gift => gift.id)
    const max_id = ids.length > 0 ? Math.max(...ids) : 0
    gifts.push({ id: max_id+1 })
    this.setState({ gifts })
  }

  removeGift = (id) => {
    const gifts = this.state.gifts.filter(gift => gift.id !== id)
    this.setState({ gifts })
  }

  render() {
    return(
      <div>
        <h2>Gift Giver</h2>
        <div className="gift-list">
          {
            this.state.gifts.map(gift => {
              return(
                <Gift 
                  key={gift.id}
                  gift={gift}
                  removeGift={this.removeGift}
                />
              )
            })
          }
        </div>
        <Button 
          className="btn-add"
          onClick={this.addGift}
        >
          Add Gift
        </Button>
      </div>
    )
  }
}

export default App

```
#### 4. Gift.jsx
```js
import React, { Component } from 'react'
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button
} from 'react-bootstrap'

class Gift extends Component{
  constructor() {
    super()
    this.state = {
      person: '',
      present: ''
    }
  }

  render() {
    return(
      <div>
        <Form>
          <FormGroup>
            <FormLabel>Person</FormLabel>
            <FormControl 
              className="input-person"
              onChange={(event) => this.setState({person: event.target.value})}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Present</FormLabel>
            <FormControl 
              className="input-present"
              onChange={(event) => this.setState({present: event.target.value})}
            />
          </FormGroup>
        </Form>
        <Button
          className="btn-remove"
          onClick={() => this.props.removeGift(this.props.gift.id)}
        >
          Remove Gift
        </Button>
      </div>
    )
  }
}

export default Gift

```


###### source: https://www.udemy.com/react-tdd/
