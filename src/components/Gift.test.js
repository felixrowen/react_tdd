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