'use strict'
const { expect } = require('chai')

describe('MongoDb Component Test', () => {
  const componentPath = './mongo'

  it('should throw error if mongodb url is invalid', () => {
    delete process.env.DB_URL
    process.env.DB_URL = 'localhost:3000'
    expect(() => require(componentPath)).to.throws('Config validation error:')
  })

  it('should return mongodb url as env', () => {
    process.env = {
      DB_URL: 'mongodb://localhost:3307/paraffin'
    }
    expect(require(componentPath)).have.keys([
      'DB_URL'
    ])
  })
})
