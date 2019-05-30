import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { maxId } from './utils'

configure({adapter: new Adapter()})

describe('Utils', () => {

  describe('the maxId function should tested', () => {
    it('should return 0 if id length is 0', () => {
      expect(maxId([])).toEqual(0)
    })
    it('should return the maxNum if the id is [1,2,3]', () => {
      expect(maxId([1,2,3])).toEqual(3)
    })
  })

})