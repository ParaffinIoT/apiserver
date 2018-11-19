'use strict'

const { expect } = require('chai')

describe('Server Component Test', () => {
  const componentPath = './server'

  before(() => {
    process.env = {
      PORT: '5000',
      BROKER_IP: '::ffff:127.0.0.1'
    }
  })

  it('should return server env', () => {
    expect(require(componentPath)).to.have.keys([
      'BROKER_IP',
      'PORT'
    ])
  })
})
