'use strict'

const chai = require('chai')
const nock = require('nock')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')

before(() => {
  chai.use(sinonChai)
  chai.use(chaiAsPromised)
})

beforeEach(function beforeEach () {
  this.sandbox = sinon.sandbox.create()
  nock.cleanAll()
})

afterEach(function afterEach () {
  this.sandbox.restore()
})
