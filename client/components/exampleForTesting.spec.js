import {expect} from 'chai'
import {doubler} from './exampleForTesting'

describe('doubler function', () => {
  const arbitraryNum = 5
  const arbitraryStr = 'boop'
  let arbitraryVar

  it('returns double of the input', () => {
    expect(doubler(2)).equal(4)
    expect(doubler(2)).to.equal(4)
    expect(doubler(2)).be.equal(4)
    expect(doubler(2)).to.be.equal(4)
    expect(doubler(arbitraryNum)).to.be.equal(10)
  })

  it('returns 0 for any input besides a number', () => {
    expect(doubler(undefined)).to.equal(0)
    expect(doubler()).to.equal(0)
    expect(doubler(arbitraryVar)).to.equal(0)
    expect(doubler(arbitraryStr)).to.equal(0)
  })
})
