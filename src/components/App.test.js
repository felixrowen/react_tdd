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