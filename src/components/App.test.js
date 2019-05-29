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
  app.find('.btn-add').simulate('click');
  expect(app.state().gifts).toEqual([{ id: 1 }]);
})